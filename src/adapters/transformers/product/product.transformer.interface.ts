import { Product, User } from '@app/core/domain/entities';

export interface IProductTransformer {
  transformReadProduct(user: User, product: Product): Partial<Product>;
}
