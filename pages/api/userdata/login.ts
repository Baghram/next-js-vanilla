import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
let Users: any;
let token: string;

async function DBcheckUser(username: string) {
  console.log(username);
  Users = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return Users;
}

const post = (req: NextApiRequest, res: NextApiResponse): any => {
  DBcheckUser(req.body.username)
    .then((userData) => {
      return bcrypt.compare(
        req.body.password,
        userData.passwords,
        (err, result) => {
          if (result) {
            const prKey = fs.readFileSync('configJWT/private.pem');
            const passPhrase: any = process.env.PASSPHRASE;
            token = sign(
              {
                username: userData.username,
                id: userData.id,
              },
              { key: prKey, passphrase: passPhrase },
              { algorithm: 'RS256' }
            );
            return res.status(200).json({
              message: 'login success',
              token,
            });
          }
          return res.status(400).json({
            message: 'login failed',
          });
        }
      );
    })
    .catch((e) => {
      return res.status(400).json({
        message: 'wrong email password',
      });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export default (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return res.status(400).json({ message: 'wrong method' });

    case 'POST':
      return post(req, res);

    case 'PUT':
      return res.status(400).json({ message: 'wrong method' });

    case 'DELETE':
      return res.status(400).json({ message: 'wrong method' });

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
};
