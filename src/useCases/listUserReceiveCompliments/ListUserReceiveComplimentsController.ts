import { Request, Response } from 'express';

import { ListUserReceiveComplimentsUseCase } from './ListUserReceiveComplimentsUseCase';

class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listReceiveComplimentsUseCase =
      new ListUserReceiveComplimentsUseCase();

    const compliments = await listReceiveComplimentsUseCase.execute(id);

    return response.json(compliments);
  }
}

export { ListUserReceiveComplimentsController };
