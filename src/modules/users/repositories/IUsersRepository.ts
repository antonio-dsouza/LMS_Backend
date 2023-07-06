import { User } from "../infra/prisma/entities/User";

interface ICreateUserDTO {
  name: string;
  address?: string;
  email: string;
  password: string;
  active: number;
  identification?: string;
  image?: string;
  phone?: string;
  last_login?: Date;
  modality_id?: number;
  course_id?: number;
  pole_id?: number;
  institution_id: number;
  group_id: number;
}

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  save({ name, address, email, password, active, identification, image, phone, last_login, modality_id, course_id, pole_id, institution_id, group_id }: ICreateUserDTO ): Promise<User>;
  updatePassword(password: string, id: number): Promise<void>;
  // updateAvatarAndAvatarUrl(avatar: string, avatar_url: string, id: number): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
