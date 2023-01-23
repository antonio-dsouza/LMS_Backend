import { User } from "../infra/prisma/entities/User";


interface ICreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  findByEmail(name: string): Promise<User>;
  findById(id: string): Promise<User>;
  save({ firstname, lastname, email, password }: ICreateUserDTO ): Promise<User>;
  updatePassword(password: string, id: string): Promise<void>;
  updateAvatarAndAvatarUrl(avatar: string, avatar_url: string, id: string): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
