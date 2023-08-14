interface IChangePasswordWithTokenDTO {
  token: string;
  newPassword: string;
  passwordConfirmation: string;
}

export { IChangePasswordWithTokenDTO };
