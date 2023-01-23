import { v4 as uuidV4 } from "uuid";

class Account {
  public readonly id: string;

  name: string;
  email: string;
  password: string;

  constructor(props: Omit<Account, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidV4();
    }
  }
}

export { Account };
