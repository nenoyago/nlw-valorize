import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../../errors/AppError';
import { UsersRepository } from '../../../repositories/UsersRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = getCustomRepository(UsersRepository);

  const { admin } = await usersRepository.findOne(id);

  if (!admin) {
    throw new AppError('Unauthorized', 401);
  }

  return next();
}
