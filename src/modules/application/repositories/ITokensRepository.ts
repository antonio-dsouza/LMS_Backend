import { Token } from "@modules/application/infra/prisma/entities/Token";

interface ITokensRepository {
  saveForgotToken(token: string, id: string): Promise<void>;
  saveJwtToken(token: string, id: string): Promise<void>;
  checkTokenIsValid(userId: string): Promise<Token>;
}

export { ITokensRepository };
