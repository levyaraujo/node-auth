import { UserNotFound } from '../errors/UserNotFound';
import {getUserById} from '../lib/userRepo';

interface IInput {
  userId: string;
}

interface IOutput {
  name: string;
  email: string;
}


export class UserProfileUseCase {
  async execute({ userId }: IInput): Promise<IOutput> {
    const user = await getUserById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      name: user.name,
      email: user.email,
    }
  }
}
