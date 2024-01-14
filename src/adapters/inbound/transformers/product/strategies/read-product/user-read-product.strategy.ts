import { UserCategoryEnum } from '@app/core/domain';
import { IReadProductStrategy } from './read-product.strategy.interface';
import { Product } from '@app/core/domain/entities';

export class UserReadProductStrategy implements IReadProductStrategy {
  getCategory(): UserCategoryEnum {
    return UserCategoryEnum.USER;
  }

  transform(product: Product): Partial<Product> {
    return {
      slug: product.slug,
      name: product.name,
    };
  }
}
