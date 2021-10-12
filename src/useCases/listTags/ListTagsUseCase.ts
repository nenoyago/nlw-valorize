import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { Tag } from '../../entities/Tag';
import { TagsRepository } from '../../repositories/TagsRepository';

class ListTagsUseCase {
  async execute(): Promise<Record<string, Tag[]>> {
    const tagsRepository = getCustomRepository(TagsRepository);

    const tags = await tagsRepository.find();

    return classToPlain(tags);
  }
}

export { ListTagsUseCase };
