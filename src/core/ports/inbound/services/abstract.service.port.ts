import { AbstractEntity } from '@app/core/domain/abstracts';

export type TAbstractServicePort<TEntity extends AbstractEntity<TEntity>> = {
  create(entity: Partial<TEntity>): Promise<TEntity>;
  read(id: string): Promise<TEntity>;
  list(): Promise<TEntity[]>;
};
