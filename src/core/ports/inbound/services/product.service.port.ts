import { Product } from '@app/core/domain';
import { TAbstractServicePort } from './abstract.service.port';

export type TProductServicePort = TAbstractServicePort<Product> & {
  create(name: string, price: number): Promise<Product>;
  count(): Promise<number>;
};

export const ProductServicePort = Symbol('ProductServicePort');
