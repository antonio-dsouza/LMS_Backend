import { instanceToInstance } from "class-transformer";
import { User } from "../infra/prisma/entities/User";

class UserMap {
  static toDTO({
    id,
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
    group_id,
    group,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      address,
      email,
      active,
      identification,
      image,
      phone,
      last_login,
      modality_id,
      course_id,
      pole_id,
      institution_id,
      group_id,
    });
    return user;
  }
}

export { UserMap };
