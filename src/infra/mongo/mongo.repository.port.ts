import { AbstractEntity, AbstractEntityWithSlug } from '@app/core/domain';
import { TRepositoryPort, TRepositoryWithSlugPort } from '@app/core/ports';

export type TMongoRepositoryPort<TEntity extends AbstractEntity<TEntity>> =
  TRepositoryPort<TEntity>;

export type TMongoRepositoryWithSlugPort<
  TEntity extends AbstractEntityWithSlug<TEntity>,
> = TRepositoryWithSlugPort<TEntity>;
