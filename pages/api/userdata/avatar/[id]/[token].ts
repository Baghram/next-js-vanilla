import { PrismaClient } from '@prisma/client';
import checktoken from '@utils/checktoken';
import fs from 'fs-extra';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.query;
    // console.log(token);
    const prisma = new PrismaClient();
    const decoder = await checktoken(token);
    console.log(decoder);
    if (decoder) {
      const user = await prisma.profile.findFirst({
        where: {
          userid: decoder.id,
        },
      });
      console.log(user);
      const streamImage = fs.createReadStream(
        `${process.cwd()}/${user?.avatar}`
      );
      const imageType: any = user?.avatartype;
      res.setHeader('Content-Type', imageType);
      streamImage.on('open', () => {
        streamImage.pipe(res);
      });
      streamImage.on('error', (err) => {
        res.end(err);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
