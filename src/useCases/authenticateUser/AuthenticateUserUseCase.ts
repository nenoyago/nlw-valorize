import { getCustomRepository } from 'typeorm';
import { compare } from 'bcrypt';
import dayjs from 'dayjs';

import auth from '../../config/auth';
import { AppError } from '../../errors/AppError';
import { UsersRepository } from '../../repositories/UsersRepository';
import {
  generateJwtRefreshToken,
  generateJwtToken,
} from '../../utils/generateAndVerifyTokens';
import { UsersTokensRepository } from '../../repositories/UsersTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
  user: {
    name: string;
    email: string;
  };
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = generateJwtToken(user.id);
    const refresh_token = generateJwtRefreshToken(user.id, { email });
    const expires_date = dayjs().add(auth.expires_refresh_token_days, 'days');

    const createdRefreshToken = usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    await usersTokensRepository.save(createdRefreshToken);

    return {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUserUseCase };
