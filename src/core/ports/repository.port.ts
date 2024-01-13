import { AbstractEntity } from '@app/common/abstracts';

export interface IRepositoryPort<TEntity extends AbstractEntity<TEntity>> {
  create(entity: Partial<TEntity>): Promise<TEntity>;
  createSlug(name: string): Promise<string>;
  list(): Promise<TEntity[]>;
  readById(id: string): Promise<TEntity>;
  readBySlug(slug: string): Promise<TEntity>;
}
