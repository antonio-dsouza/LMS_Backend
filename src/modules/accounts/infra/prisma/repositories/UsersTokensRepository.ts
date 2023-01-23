import { ICreateUserTokenDTO } from "@modules/application/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import prismaClient from "@shared/infra/prisma";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await prismaClient.userTokens.create({
      data: {
        refresh_token,
        expires_date,
        created_at: new Date(),
        user: {
          connect: {
            id: user_id
          }
        }
      }
    });
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const usersTokens = await prismaClient.userTokens.findFirst({
      where: {
        refresh_token: refresh_token,
        userId: user_id
      }
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await prismaClient.userTokens.delete({
      where: {
        id: id,
      }
    })
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userTokens = await prismaClient.userTokens.findFirst({
      where: {
        refresh_token: refresh_token,
      }
    });
    return userTokens;
  }
}

export { UsersTokensRepository };
