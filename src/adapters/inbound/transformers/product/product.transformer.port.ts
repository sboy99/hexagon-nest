import { Product, User } from '@app/core/domain/entities';

export type TProductTransformerPort = {
  transformReadProduct(user: User, product: Product): Partial<Product>;
};

export const ProductTransformerPort = Symbol('ProductTransformerPort');
