import { hash } from "bcryptjs"
import { prismaClient } from "../lib/prismaClient";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ name, email, password }: IInput): Promise<IOutput> {

    const userAlreadyExists = await prismaClient.user.findUnique({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const hashedPassword = await hash(password, 12);

    await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

  }
}
