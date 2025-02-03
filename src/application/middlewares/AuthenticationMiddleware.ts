import { IData, IMiddleware, IResponse, IRequest } from '../interfaces/IMiddleware';
import { verify } from 'jsonwebtoken';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    if (!headers.authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized.'
        }
      };
    }

    const [type, token] = headers.authorization.split(' ');

    if (type !== 'Bearer') {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid token.'
        }
      };
    }

    try {
      const payload = verify(token, process.env.JWT_SECRET!);

      return {
        data: {
          userId: payload.sub
        }
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized.'
        }
      };
    }
  }
}
