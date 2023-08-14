import { ICreateUserTokenDTO } from "@modules/auth/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/auth/repositories/IUsersTokensRepository";
import prismaClient from "@shared/infra/prisma";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await prismaClient.user_token.create({
      data: { expires_date, refresh_token, user_id },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersTokens = await prismaClient.user_token.findFirst({
      where: {
        user_id: user_id,
        refresh_token: refresh_token,
      },
    });
    return usersTokens;
  }

  async deleteById(id: number): Promise<void> {
    await prismaClient.user_token.delete({
      where: {
        id: id,
      },
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await prismaClient.user_token.findFirst({
      where: {
        refresh_token: refresh_token,
      },
    });

    return userToken;
  }
}

export { UsersTokensRepository };
