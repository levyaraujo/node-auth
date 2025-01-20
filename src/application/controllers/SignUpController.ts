import { z } from "zod"

import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignUpUseCase } from "../useCases/SignUpUseCase";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";


const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);
      this.signUpUseCase.execute({ name, email, password });

      return {
        statusCode: 201,
        body: { message: "User created successfully" },
      };
    }
    catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: { error: "Account already exists." },
        }
      }

      throw error;
    }

  }
}
