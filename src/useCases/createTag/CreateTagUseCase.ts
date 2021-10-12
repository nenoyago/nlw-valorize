import { getCustomRepository } from 'typeorm';

import { Tag } from '../../entities/Tag';
import { TagsRepository } from '../../repositories/TagsRepository';
import { AppError } from '../../errors/AppError';

class CreateTagUseCase {
  async execute(name: string): Promise<Tag> {
    if (!name) {
      throw new AppError('Name incorrect');
    }

    const tagsRepository = getCustomRepository(TagsRepository);

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new AppError('Tag already exists');
    }

    const tag = tagsRepository.create({ name });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagUseCase };
