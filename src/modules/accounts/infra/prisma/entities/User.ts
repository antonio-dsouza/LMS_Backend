import { Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";

class User {
  public readonly id: string;

  email: string;
  password: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  avatar_url?: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
