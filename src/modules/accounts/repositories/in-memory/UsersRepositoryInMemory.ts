import { User } from "@modules/accounts/infra/prisma/entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

  async save({
    firstname,
    lastname,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      firstname,
      lastname,
      email,
      password,
    });

    this.users.push(user);

    return user;
  }


  async updatePassword(password: string, id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);
    user.password = password;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async updateAvatarAndAvatarUrl(avatar: string, avatar_url: string, id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);
    user.avatar = avatar;
    user.avatar_url = avatar_url;
  }
}

export { UsersRepositoryInMemory };
