import { UserCategoryEnum } from '@app/core/domain';
import { IReadProductStrategy } from './read-product.strategy.interface';
import { Product } from '@app/core/domain/entities';

export class AdminReadProductStrategy implements IReadProductStrategy {
  getCategory(): UserCategoryEnum {
    return UserCategoryEnum.ADMIN;
  }

  transform(product: Product): Partial<Product> {
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
    };
  }
}
