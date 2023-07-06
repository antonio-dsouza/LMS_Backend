import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/prisma/entities/User";

class UserMap {
  static toDTO({
    email,
    firstname,
    id,
    avatar,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      firstname,
      id,
      avatar,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
