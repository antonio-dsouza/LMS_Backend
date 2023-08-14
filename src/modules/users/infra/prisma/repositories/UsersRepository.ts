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
      include: {
        group: {
          include: {
            group_has_permission: {
              include: {
                permission: true,
              },
            },
          },
        }
      },
    });
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        group: {
          include: {
            group_has_permission: {
              include: {
                permission: true,
              },
            },
          },
        }
      },
    });
    return user;
  }

  async save({
    name,
    address,
    email,
    password,
    active,
    identification,
    image,
    phone,
    last_login,
    modality_id,
    course_id,
    pole_id,
    institution_id,
    group_id
  }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        address,
        email,
        password,
        active,
        identification,
        image,
        phone,
        last_login,
        modality_id,
        course_id,
        pole_id,
        institution_id,
        group_id
      },
    });
    return user;
  }

  async updatePassword(password: string, id: number): Promise<void> {
    await prismaClient.user.update({
      data: {
        password: password,
      },
      where: {
        id: id,
      },
    });
  }

  // async updateAvatarAndAvatarUrl(avatar: string, avatar_url: string, id: string): Promise<void> {
  //  await prismaClient.user.update({
  //    data: {
  //      avatar,
  //      avatar_url,
  //    },
  //    where: {
  //      id: id,
  //    }
  //  })
  // }
}

export { UsersRepository };
