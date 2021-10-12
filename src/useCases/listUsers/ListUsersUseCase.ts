import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';

import { User } from '../../entities/User';
import { UsersRepository } from '../../repositories/UsersRepository';

class ListUsersUseCase {
  async execute(): Promise<Record<string, User[]>> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return classToPlain(users);
  }
}

export { ListUsersUseCase };
