import { Request, Response } from 'express';

import { ListTagsUseCase } from './ListTagsUseCase';

class ListTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTagsUseCase = new ListTagsUseCase();

    const tags = await listTagsUseCase.execute();

    return response.json(tags);
  }
}

export { ListTagsController };
