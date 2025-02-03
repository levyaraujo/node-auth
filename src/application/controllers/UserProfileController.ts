import { UserNotFound } from '../errors/UserNotFound';
import { IController, IRequest, IResponse } from '../interfaces/IController';
import { UserProfileUseCase } from '../useCases/UserProfileUseCase';


export class UserProfileController implements IController {
  constructor(private readonly userProfileUseCase: UserProfileUseCase) { }

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { userId } = body;
      const user = await this.userProfileUseCase.execute({ userId });

      return {
        statusCode: 200,
        body: user,
      };
    }
    catch (error) {
      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: { error: 'User not found.' },
        }
      }

      throw error;
    }
  }
}
