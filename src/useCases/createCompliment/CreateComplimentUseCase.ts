import { getCustomRepository } from 'typeorm';

import { AppError } from '../../errors/AppError';
import { ICreateComplimentDTO } from '../../dtos/ICreateComplimentDTO';
import { ComplimentsRepository } from '../../repositories/ComplimentsRepository';
import { UsersRepository } from '../../repositories/UsersRepository';
import { Compliment } from '../../entities/Compliment';

class CreateComplimentUseCase {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: ICreateComplimentDTO): Promise<Compliment> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new AppError('User cannot send a compliment for themselves');
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new AppError('Receiver user doest not exists');
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentUseCase };
