import { z } from "zod"

import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignInUseCase } from "../useCases/SignInUseCase";
import { InvalidCredentials } from "../errors/InvalidCredentials";


const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);

      const signInUseCase = new SignInUseCase();
      const { accessToken } = await signInUseCase.execute({ email, password });

      return {
        statusCode: 200,
        body: { accessToken },
      };
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: { error: "Invalid credentials." },
        }
      }

      throw error;
    }

  }
}
