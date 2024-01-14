import { AbstractEntity, AbstractEntityWithSlug } from '@app/core/domain';

export type TRepositoryPort<TEntity extends AbstractEntity<TEntity>> = {
  create(entity: Partial<TEntity>): Promise<TEntity>;
  list(): Promise<TEntity[]>;
  readById(id: string): Promise<TEntity>;
};

export type TRepositoryWithSlugPort<
  TEntity extends AbstractEntityWithSlug<TEntity>,
> = TRepositoryPort<TEntity> & {
  createSlug(name: string): Promise<string>;
  readBySlug(slug: string): Promise<TEntity>;
};
