import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { getUserByEmail } from '../lib/userRepo';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {

    const user = await getUserByEmail(email);


    if (!user) {
      throw new InvalidCredentials();
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    return { accessToken };

  }
}
