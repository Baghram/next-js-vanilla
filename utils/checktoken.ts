import * as fs from 'fs-extra';
import { verify } from 'jsonwebtoken';

export default (token: any) => {
  const prKey = fs.readFileSync('configJWT/public.pem');
  const algorithms: any = 'HS256';
  const data = verify(token, prKey, { algorithms });
  return data;
};
