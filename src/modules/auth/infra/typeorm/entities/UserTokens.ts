class UserTokens {
  public readonly id: number;
  refresh_token: string;
  expires_date: Date;
  created_at?: Date;
  user_id: number;
}

export { UserTokens };
