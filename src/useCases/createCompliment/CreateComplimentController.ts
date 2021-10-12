import { Request, Response } from 'express';
import { CreateComplimentUseCase } from './CreateComplimentUseCase';

class CreateComplimentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { tag_id, user_receiver, message } = request.body;
    const { id: user_sender } = request.user;

    const createComplimentUseCase = new CreateComplimentUseCase();

    const compliment = await createComplimentUseCase.execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    return response.status(201).json(compliment);
  }
}

export { CreateComplimentController };
