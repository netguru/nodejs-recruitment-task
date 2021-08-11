import jwt from 'jsonwebtoken';
import { errorResponseMessages } from '../../../shared/src/utils/errors';
import { users } from '../../../shared/src/utils/utils';

export class AuthError extends Error {}

export const authFactory =
  (secret: string) =>
  (username: string, password: string): string => {
    const user = users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      throw new AuthError(errorResponseMessages.invalidUsernamePassword);
    }

    return jwt.sign(
      {
        userId: user.id,
        name: user.name,
        role: user.role,
      },
      secret,
      {
        issuer: 'https://www.netguru.com/',
        subject: `${user.id}`,
        expiresIn: 30 * 60,
      },
    );
  };
