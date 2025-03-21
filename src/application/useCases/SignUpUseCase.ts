import { hash } from 'bcryptjs'
import { prismaClient } from '../lib/prismaClient';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import {getUserByEmail, saveUser} from '../lib/userRepo';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ name, email, password }: IInput): Promise<IOutput> {

    const userAlreadyExists = await getUserByEmail(email);

    if (userAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 12);

    await saveUser({ name, email, password: hashedPassword });

  }
}
