import middlewares from '@middlewares/index';
import { PrismaClient } from '@prisma/client';
import checktoken from '@utils/checktoken';
import { verify } from 'jsonwebtoken';
import nextConnect from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(middlewares);
const prisma = new PrismaClient();

// Get Method for Self
handler.get(async (req: any, res: any) => {
  const { token } = req.headers;
  const verifyData = await checktoken(token);
  await prisma.user
    .findOne({
      where: {
        id: verifyData.id,
      },
      include: {
        Profile: true,
      },
    })
    .then((result) => {
      res.status(200).json({
        message: 'get data success',
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'get data failed',
        err,
      });
    })
    .finally(() => {
      prisma.$disconnect();
    });
});

// Post Method for Specific Id
handler.post(async (req: any, res: any) => {
  const { token } = req.headers;
  const verifyData = await checktoken(token);
  if (verifyData) {
    await prisma.user
      .findOne({
        where: {
          id: req.body.id,
        },
        include: {
          Profile: true,
        },
      })
      .then((result) => {
        res.status(200).json({
          message: 'get data success',
          data: result,
        });
      })
      .catch((err) => {
        res.status(200).json({
          message: 'get data failed',
          err,
        });
      })
      .finally(() => {
        prisma.$disconnect();
      });
  }
});
export default handler;
