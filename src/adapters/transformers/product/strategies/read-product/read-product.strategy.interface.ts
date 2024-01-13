import { Product } from '@app/core/domain/entities';
import { UserCategory } from '@app/core/domain/enums';

export interface IReadProductStrategy {
  getCategory(): UserCategory;
  transform(product: Product): Partial<Product>;
}
