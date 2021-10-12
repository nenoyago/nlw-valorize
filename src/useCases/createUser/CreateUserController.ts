import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, admin, password } = request.body;

    console.log(email, password);

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      admin,
      password,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
