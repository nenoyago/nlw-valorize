import { getCustomRepository } from 'typeorm';
import dayjs from 'dayjs';

import auth from '../../config/auth';
import { AppError } from '../../errors/AppError';
import { UsersTokensRepository } from '../../repositories/UsersTokensRepository';
import {
  generateJwtRefreshToken,
  generateJwtToken,
  verifyToken,
} from '../../utils/generateAndVerifyTokens';

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

class RefreshTokenUseCase {
  async execute(token: string): Promise<ITokenResponse> {
    const { sub: user_id, email } = verifyToken(token, 'refresh_token');

    const usersTokensRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await usersTokensRepository.findOne({
      where: { id: user_id, email: email },
    });

    if (!userToken) {
      throw new AppError('Refresh token does not exists');
    }

    await usersTokensRepository.delete(userToken.id);

    const refresh_token = generateJwtRefreshToken(user_id, { email });
    const expires_date = dayjs().add(auth.expires_refresh_token_days, 'days');

    const newRefreshToken = usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await usersTokensRepository.save(newRefreshToken);

    const newToken = generateJwtToken(user_id);

    return { token: newToken, refresh_token };
  }
}

export { RefreshTokenUseCase };
