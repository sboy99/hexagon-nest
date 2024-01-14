import { Product } from '@app/core/domain';
import { TRepositoryWithSlugPort } from '@app/core/ports';

export type TProductRepositoryPort = TRepositoryWithSlugPort<Product> & {
  count(): Promise<number>;
};

export const ProductRepositoryPort = Symbol('ProductRepositoryPort');
