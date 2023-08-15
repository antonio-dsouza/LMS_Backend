import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/prisma/entities/User";

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: number, institution_id: number): Promise<User>;
  findAllUsers(institution_id: number): Promise<User[]>;
  save({ name, address, email, password, active, identification, image, phone, last_login, modality_id, course_id, pole_id, institution_id, group_id }: ICreateUserDTO): Promise<User>;
  updateUser({ id, name, address, email, password, active, identification, image, phone, last_login, modality_id, course_id, pole_id, institution_id, group_id }: IUpdateUserDTO): Promise<void>;
  deleteUser(id: number, institution_id: number): Promise<void>;
}

export { IUsersRepository };
