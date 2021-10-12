import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import { classToPlain } from 'class-transformer';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';
import { AppError } from '../../errors/AppError';

class CreateUserUseCase {
  async execute({
    name,
    email,
    admin = false,
    password,
  }: ICreateUserDTO): Promise<Record<string, User>> {
    if (!email) {
      throw new AppError('Email or password incorrect');
    }

    if (!password) {
      throw new AppError('Email or password incorrect');
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return classToPlain(user);
  }
}

export { CreateUserUseCase };
