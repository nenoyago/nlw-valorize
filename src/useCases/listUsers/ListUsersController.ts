import { Request, Response } from 'express';

import { ListUsersUseCase } from './ListUsersUseCase';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = new ListUsersUseCase();

    const users = await listUsersUseCase.execute();

    return response.json(users);
  }
}

export { ListUsersController };
