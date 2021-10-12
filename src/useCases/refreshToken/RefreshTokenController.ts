import { Request, Response } from 'express';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['x-access-token'];

    const refreshTokenUseCase = new RefreshTokenUseCase();

    const { token: newToken, refresh_token } =
      await refreshTokenUseCase.execute(token);

    return response.status(201).json({
      token: newToken,
      refresh_token,
    });
  }
}

export { RefreshTokenController };
