import { instanceToInstance } from "class-transformer";
import { User } from "../infra/prisma/entities/User";

class UsersMap {
  static toDTO(usersArray: User[]): IUserResponseDTO[] {
    const users = [];
    usersArray.forEach(user => {
      var userReturn = instanceToInstance({
        id: user.id,
        name: user.name,
        address: user.address,
        email: user.email,
        active: user.active,
        identification: user.identification,
        image: user.image,
        phone: user.phone,
        last_login: user.last_login,
        modality_id: user.modality_id,
        course_id: user.course_id,
        pole_id: user.pole_id,
        institution_id: user.institution_id,
        group_id: user.group_id,
      });
      users.push(userReturn);
    });
    return users;
  }
}

export { UsersMap };
