import * as fs from 'fs-extra';
import { verify } from 'jsonwebtoken';

export default (token: any) => {
  const prKey = fs.readFileSync('configJWT/public.pem');
  const algorithms: any = 'RS256';
  const passPhrase: any = process.env.PASSPHRASE;
  const data = verify(token, prKey, { algorithms });
  return data;
};
