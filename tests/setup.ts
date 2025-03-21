import { prismaClient } from '../src/application/lib/prismaClient';

afterAll(async () => {
  await prismaClient.user.deleteMany({});
})
