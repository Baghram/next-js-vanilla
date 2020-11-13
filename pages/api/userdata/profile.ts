/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any , @typescript-eslint/no-throw-literal */
import middlewares from '@middlewares/index';
import { PrismaClient } from '@prisma/client';
import checktoken from '@utils/checktoken';
import imgtype from '@utils/filetype';
import * as fs from 'fs-extra';
import { verify } from 'jsonwebtoken';
import moment from 'moment';
import nextConnect, { NextConnect } from 'next-connect';
import paths from 'path';
import process from 'process';

// const appDir = path.dirname(require.main.filename);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(middlewares);
const prisma = new PrismaClient();

// GET method (get data pribadi sesuai token yang dikirim)
handler.get(async (req: any, res: any) => {
  const { token } = req.headers;
  const decoded = checktoken(token);
  const userId = decoded.id;
  let data: any;
  await prisma.user
    .findOne({
      where: {
        id: userId,
      },
      include: {
        Profile: true,
      },
    })
    .then((result) => {
      if (result === null) {
        throw {
          message: 'data does not exist',
        };
      }
      data = result;
      console.log(data);
    })
    .catch((err) => {
      return res.status(400).json({
        message: 'get data failed',
        error: err,
      });
    })
    .finally(() => {
      prisma.$disconnect();
      delete data.passwords;
      return res.status(200).json({
        message: 'get Profile Success',
        data,
      });
    });
});
// POST method
handler.post(async (req: any, res: any) => {
  try {
    // do stuff with files and body
    const { token } = req.headers;
    const { files } = req;
    const { body } = req;
    const rawData = fs.readFileSync(files.avatar.path);
    const path = `uploads/avatar/${moment(new Date()).format('YYYY/MM')}`;
    const imageType = imgtype(files.avatar.type);
    const userId = checktoken(token);
    // console.log(body, rawData, path, imageType, userId);
    const existData = await prisma.profile.findFirst({
      where: {
        userid: userId.id,
      },
    });
    if (!existData) {
      console.log(path);
      fs.mkdirpSync(path);
      const imagePath = `${path}/avatar_${userId.id}.${imageType}`;
      await fs.writeFile(imagePath, rawData, (err) => {});
      prisma.profile
        .create({
          data: {
            alamat: body.alamat,
            handphone: body.handphone,
            avatar: imagePath,
            avatartype: files.avatar.type,
            User: {
              connect: {
                id: userId.id,
              },
            },
          },
        })
        .then((result) => {
          return res.status(201).json({
            message: 'add profile success!!',
            data: result,
          });
        })
        .finally(() => {
          prisma.$disconnect();
        });
    }
    return res.status(400).json({
      message: 'DATA ALREADY EXIST',
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
// PUT method
handler.put(async (req: any, res: any) => {
  const { token } = req.headers;
  const { files } = req;
  const { body } = req;
  const rawData = fs.readFileSync(files.avatar.path);
  const path = `uploads/avatar/${moment(new Date()).format('YYYY/MM')}`;
  const imageType = imgtype(files.avatar.type);
  let updatePath: string | undefined;
  const userId = await checktoken(token);
  if (userId) {
    fs.mkdirpSync(path);
    const existData = await prisma.profile.findFirst({
      where: {
        userid: userId.id,
      },
    });
    const imagePath = `${path}/avatar_${userId.id}.${imageType}`;
    if (existData) {
      // const verifyData = await prisma.profile.findFirst({
      //   where: { userid: userId.id },
      // });
      // console.log(verifyData?.id, req.body.id)
      // if (verifyData?.id === Number(req.body.id)) {
      await prisma.profile
        .findFirst({
          where: {
            userid: userId.id,
          },
        })
        .then(async (result) => {
          const delPath: any = paths.resolve(
            `${process.cwd()}/${result?.avatar}`
          );
          updatePath = result?.avatar;
          await fs.remove(delPath);
        })
        .finally(() => {
          prisma.$disconnect();
        });
      await prisma.profile
        .update({
          where: {
            id: Number(body.id),
          },
          data: {
            alamat: body.alamat,
            handphone: body.handphone,
            avatar: imagePath,
            avatartype: files.avatar.type,
          },
        })
        .then(() => {
          fs.writeFile(imagePath, rawData, (err) => {});
        })
        .catch((error) => {
          res.status(400).json({
            message: 'data does not exist',
          });
        })
        .finally(() => {
          prisma.$disconnect();
        });

      return res.status(200).json({
        message: 'update profile success',
      });
      // }
      // return res.status(400).json({
      //   message: 'Unauthorized',
      // });
    }
    return res.status(400).json({
      message: 'update profile failed',
    });
  }
  return res.status(400).json({
    message: 'Unauthorized',
  });
});
// DELETE method
handler.delete(async (req: any, res: any) => {
  try {
    const { token } = req.headers;
    const userId = await checktoken(token);
    if (userId) {
      const userExist = await prisma.profile.findFirst({
        where: {
          userid: userId.id,
        },
      });
      if (userExist) {
        prisma.profile
          .delete({
            where: {
              id: userExist.id,
            },
          })
          .then((result) => {
            const delPath: any = paths.resolve(
              `${process.cwd()}/${userExist?.avatar}`
            );
            fs.remove(delPath);
            // return res.status(200).json({
            //   message: 'delete success',
            // });
          })
          .catch((err) => {
            res.status(400).json({
              message: 'delete failed',
              errMessage: err,
            });
          })
          .finally(async () => {
            await prisma.$disconnect();
          });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: 'delete failed',
    });
  }
  return res.status(200).json({
    message: 'delete success',
  });
});

export default handler;
