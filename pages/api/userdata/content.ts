/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, consistent-return, @typescript-eslint/no-throw-literal */
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

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(middlewares);
const prisma = new PrismaClient();

// GET method(get all)
handler.get(async (req: any, res: any) => {
  try {
    let data;
    await prisma.content
      .findMany()
      .then((result) => {
        data = result;
      })
      .finally(() => {
        prisma.$disconnect();
      });
    return res.status(200).json({
      message: 'get data success!',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'get data failed!!',
      err: error,
    });
  }
});
// POST method(upload content)
handler.post(async (req: any, res: any) => {
  const { body, files } = req;
  body.publishdate = Date.now();
  const decoded = checktoken(req.headers.token);
  const path = `uploads/content/${moment(new Date()).format('YYYY/MM')}`;
  const imageType = imgtype(files.contentphoto.type);
  const imagePath = `${path}/content_${decoded.username}_${req.body.publishdate}.${imageType}`;
  const rawData = fs.readFileSync(files.contentphoto.path);
  let data;
  res.status(200).json({
    message: 'haahah',
  });
  try {
    await prisma.content
      .create({
        data: {
          title: body.title,
          descriptions: body.descriptions,
          eventdate: body.eventdate,
          publishdate: new Date(),
          contentphoto: imagePath,
          contentvideo: req.body.contentvideo,
          contentphototype: imageType,
          User: {
            connect: {
              id: decoded.id,
            },
          },
        },
      })
      .then((result) => {
        data = result;
        fs.mkdirpSync(path);
        fs.writeFile(imagePath, rawData, (err) => {});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    res.status(200).json({
      message: 'add content success!!',
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: 'post content failed!!',
      err: error,
    });
  }
});
// PUT method(update content)
handler.put(async (req: any, res: any) => {
  const { body, files } = req;
  body.publishdate = Date.now();
  const decoded = checktoken(req.headers.token);
  console.log(decoded);
  const path = `uploads/content/${moment(new Date()).format('YYYY/MM')}`;
  const imageType = imgtype(files.contentphoto.type);
  const imagePath = `${path}/content_${decoded.username}_${req.body.publishdate}.${imageType}`;
  const rawData = fs.readFileSync(files.contentphoto.path);
  let data;
  try {
    const contentData = await prisma.content
      .findOne({
        where: {
          id: Number(body.id),
        },
      })
      .finally(() => {
        prisma.$disconnect();
      });
    if (contentData) {
      const delPath: any = paths.resolve(
        `${process.cwd()}/${contentData?.contentphoto}`
      );
      await fs.remove(delPath);
      await prisma.content
        .update({
          where: {
            id: contentData.id,
          },
          data: {
            title: body.title || contentData.contentvideo,
            descriptions: body.descriptions || contentData.descriptions,
            eventdate: body.eventdate || contentData.eventdate,
            publishdate: contentData.publishdate,
            contentphoto: imagePath || contentData.contentphoto,
            contentvideo: req.body.contentvideo || contentData.contentvideo,
            contentphototype: imageType || contentData.contentphototype,
          },
        })
        .then(async (result) => {
          await fs.writeFile(imagePath, rawData, (err) => {});
          res.status(200).json({
            message: 'update Success!',
            data: result,
          });
        })
        .catch((err) => {
          console.log(err);
          const message = err;
          throw err;
        })
        .finally(() => {
          prisma.$disconnect();
        });
    } else {
      const message = {
        message: 'Content Does Not Exist!!',
      };
      throw message;
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'update failed!!',
      err: error,
    });
  }
});
// DELETE method(delete content)
handler.delete(async (req: any, res: any) => {
  const { body } = req;
  const decoded = checktoken(req.headers.token);
  const path = `uploads/content/${moment(new Date()).format('YYYY/MM')}`;
  try {
    const contentExist = await prisma.content.findOne({
      where: {
        id: Number(body.id),
      },
    });
    if (contentExist) {
      await prisma.content
        .delete({
          where: {
            id: Number(body.id),
          },
        })
        .then(async (result) => {
          const delPath: any = paths.resolve(
            `${process.cwd()}/${contentExist?.contentphoto}`
          );
          await fs.remove(delPath);
        })
        .catch((err) => {
          const message = {
            error: err,
          };
          throw message;
        })
        .finally(() => {
          prisma.$disconnect();
        });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'delete failed!!',
      err: error,
    });
  }
  return res.status(200).json({
    message: 'delete Success!!',
  });
});

export default handler;
