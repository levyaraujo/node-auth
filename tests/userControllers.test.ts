import { makeSignUpController } from '../src/factories/makeSignUpController';
import { makeSignInController } from '../src/factories/makeSignInController';
import { prismaClient } from '../src/application/lib/prismaClient';
import { hash } from 'bcryptjs';
import {randomUUID} from 'node:crypto';
import {makeUserProfileController} from '../src/factories/makeUserProfileController';
import { verify } from 'jsonwebtoken';


describe('user controllers', () => {

  const user = {
    name: 'Jon Snow',
    email: `jon@winterfell.com`,
    password: 'password',
  };

  let userId: string | undefined | (() => string);

  it('should return 201 when user is created', async () => {
    const request = {
      body: user,
      metadata: { userId: null }
    }
    const signUpController = makeSignUpController();

    const response = await signUpController.handle(request);
    const expectedResponse = {
      statusCode: 201,
      body: { message: 'User created successfully' },
    }

    expect(response).toEqual(expectedResponse)
  })

  it('should return 200 when user is logged in', async () => {
    const hashedPassword = await hash(user.password, 12);
    user.email = randomUUID() + user.email;

    await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    const request = {
      body: {
        email: user.email,
        password: user.password,
      },
      metadata: { userId: null }
    }
    const signInController = makeSignInController();

    const response = await signInController.handle(request);
    const jwtRegex = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

    const accessToken = response.body!.accessToken;
    expect(accessToken).toMatch(jwtRegex)

    const payload = verify(accessToken, process.env.JWT_SECRET!)

    userId = payload.sub;
  })

  it('get user profile', async () => {
    const request = {
      body: {},
      metadata: { userId }
    }
    const userProfileController = makeUserProfileController();

    const response = await userProfileController.handle(request);
    const expectedResponse = {
      statusCode: 200,
      body: { name: user.name, email: user.email },
    }

    expect(response).toEqual(expectedResponse)
  })
})
