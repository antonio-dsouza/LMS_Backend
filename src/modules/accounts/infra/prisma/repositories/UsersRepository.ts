import {
  ICreateUserDTO,
  IUsersRepository,
} from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";
import prismaClient from "@shared/infra/prisma";

class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User> {
    const user = prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async save({
    firstname,
    lastname,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        firstname,
        lastname,
        email,
        password,
      },
    });
    return user;
  }

  async updatePassword(password: string, id: string): Promise<void> {
    await prismaClient.user.update({
      data: {
        password: password,
      },
      where: {
        id: id,
      },
    });
  }

  async updateAvatarAndAvatarUrl(avatar: string, avatar_url: string, id: string): Promise<void> {
   await prismaClient.user.update({
     data: {
       avatar,
       avatar_url,
     },
     where: {
       id: id,
     }
   })
  }
}

export { UsersRepository };
