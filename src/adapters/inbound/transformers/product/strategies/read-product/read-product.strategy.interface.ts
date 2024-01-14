import { Product } from '@app/core/domain/entities';
import { UserCategoryEnum } from '@app/core/domain';
export interface IReadProductStrategy {
  getCategory(): UserCategoryEnum;
  transform(product: Product): Partial<Product>;
}
