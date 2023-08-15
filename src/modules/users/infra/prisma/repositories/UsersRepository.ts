import {
  IUsersRepository,
} from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";
import prismaClient from "@shared/infra/prisma";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";

class UsersRepository implements IUsersRepository {
  async findAllUsers(institution_id: number): Promise<User[]> {
    const users = prismaClient.user.findMany({
      where: {
        institution_id: institution_id
      }
    });

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = prismaClient.user.findFirst({
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

  async findById(id: number, institution_id: number): Promise<User> {
    const user = prismaClient.user.findFirst({
      where: {
        id: id,
        institution_id: institution_id,
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

  async updateUser({ id, name, address, email, password, active, identification, image, phone, last_login, modality_id, course_id, pole_id, institution_id, group_id }: IUpdateUserDTO): Promise<void> {
    await prismaClient.user.update({
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
      where: {
        id: id,
      },
    });
  }

  async deleteUser(id: number, institution_id: number): Promise<void> {
    await prismaClient.user.deleteMany({
      where: {
        id: id,
        institution_id: institution_id
      },
    });
  }
}

export { UsersRepository };
