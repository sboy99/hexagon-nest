import { UserCategoryEnum } from '@app/core/domain';
import { IReadProductStrategy } from './read-product.strategy.interface';
import { Product } from '@app/core/domain/entities';

export class BuidlerReadProductStrategy implements IReadProductStrategy {
  getCategory(): UserCategoryEnum {
    return UserCategoryEnum.BUIDLER;
  }

  transform(product: Product): Partial<Product> {
    return {
      slug: product.slug,
      name: product.name,
      price: product.price,
    };
  }
}
