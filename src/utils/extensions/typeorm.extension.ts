import { BaseEntity, Connection, EntityManager, FindOneOptions, getConnection, ObjectType, QueryRunner, Repository } from 'typeorm';
import ExpressContext from 'utils/expressContext';

import NotFound from '../responses/errors/notFound';

Connection.prototype.createEntityManager = function (queryRunner?: QueryRunner): EntityManager {
  const em = ExpressContext.get('entityManager');
  if (em) {
    return em;
  }
  return new EntityManager(this, queryRunner);
};

BaseEntity.getRepository = function <T>(this: ObjectType<T>): Repository<T> {
  const connection = getConnection();
  const em = connection.createEntityManager();
  return em.getRepository(this);
};

// Repository.prototype.findSingle = async function <Entity>(idOrConditions?: any, options?: FindOneOptions<Entity>): Promise<Entity> {
//   try {
//     return await this.findOneOrFail(idOrConditions, options);
//   } catch (error) {
//     if (error.name === 'EntityNotFound') {
//       throw new NotFound(error.message, `${this.target.name}${NotFound.name}`);
//     }
//     throw error;
//   }
// };
