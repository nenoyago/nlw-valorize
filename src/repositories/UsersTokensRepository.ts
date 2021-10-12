import { EntityRepository, Repository } from 'typeorm';

import { UserToken } from '../entities/UserToken';

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {}

export { UsersTokensRepository };
