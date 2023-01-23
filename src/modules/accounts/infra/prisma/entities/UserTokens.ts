import { v4 as uuidv4 } from "uuid";

class UserTokens {
  public readonly id: string;

  refresh_token: string;
  expires_date: Date;
  created_at: Date;
  userId: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { UserTokens };
