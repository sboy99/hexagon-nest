import { AbstractEntity } from '@app/common/abstracts';

export interface IProductService<TEntity extends AbstractEntity<TEntity>> {
  create(name: string, price: number): Promise<TEntity>;
  read(id: string): Promise<TEntity>;
  list(): Promise<TEntity[]>;
}
