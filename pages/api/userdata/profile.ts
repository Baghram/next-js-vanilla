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
    const prKey = fs.readFileSync('configJWT/public.pem');
    const algorithms: any = 'HS256';
    let userId;
    await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
      userId = decoded.id;
    });
    const existData = await prisma.profile.findFirst({
      where: {
        userid: userId,
      },
    });
    if (!existData) {
      fs.mkdirpSync(path);
      const imagePath = `${path}/avatar_${userId}.${imageType}`;
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
                id: userId,
              },
            },
          },
        })
        .finally(() => {
          prisma.$disconnect();
        });
    } else {
      return res.status(400).json({
        message: 'DATA ALREADY EXIST',
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  return res.status(200).json({
    message: 'add profile success!!',
  });
});
// PUT method
handler.put(async (req: any, res: any) => {
  const { token } = req.headers;
  const { files } = req;
  const { body } = req;
  const rawData = fs.readFileSync(files.avatar.path);
  const path = `uploads/avatar/${moment(new Date()).format('YYYY/MM')}`;
  const imageType = imgtype(files.avatar.type);
  const prKey = fs.readFileSync('configJWT/public.pem');
  const algorithms: any = 'HS256';
  let userId;
  let updatePath: string | undefined;
  await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
    userId = decoded.id;
  });
  fs.mkdirpSync(path);
  const existData = await prisma.profile.findFirst({
    where: {
      userid: userId,
    },
  });
  const imagePath = `${path}/avatar_${userId}.${imageType}`;
  if (existData) {
    await prisma.profile
      .findFirst({
        where: {
          userid: userId,
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
  }
  return res.status(400).json({
    message: 'Data is not Exist',
  });
});
// DELETE method
handler.delete(async (req: any, res: any) => {
  try {
    const { token } = req.headers;
    const algorithms: any = 'HS256';
    let userId: number;
    let data: any;
    const prKey = fs.readFileSync('configJWT/public.pem');
    await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
      data = decoded;
    });
    const userExist = await prisma.profile.findFirst({
      where: {
        userid: data.id,
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
