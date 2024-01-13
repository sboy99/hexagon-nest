import { UserCategory } from '@app/core/domain/enums';
import { IReadProductStrategy } from './read-product.strategy.interface';
import { Product } from '@app/core/domain/entities';

export class UserReadProductStrategy implements IReadProductStrategy {
  getCategory(): UserCategory {
    return UserCategory.USER;
  }

  transform(product: Product): Partial<Product> {
    return {
      slug: product.slug,
      name: product.name,
    };
  }
}
