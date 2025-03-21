import {prismaClient} from './prismaClient';

interface User {
  name: string;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string) {
  return prismaClient.user.findUnique({
    where: { email: email },
  })
}

export async function getUserById(id: string) {
  return prismaClient.user.findUnique({
    where: { id: id },
  })
}

export async function saveUser({ name, email, password }: User) {
  return prismaClient.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}
