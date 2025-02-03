import { UserNotFound } from '../errors/UserNotFound';
import { prismaClient } from '../lib/prismaClient';

interface IInput {
  userId: string;
}

interface IOutput {
  name: string;
  email: string;
}


export class UserProfileUseCase {
  async execute({ userId }: IInput): Promise<IOutput> {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new UserNotFound();
    }

    return {
      name: user.name,
      email: user.email,
    }
  }
}
