import { Injectable } from '@nestjs/common';
import { TProductTransformerPort } from './product.transformer.port';
import { ReadProductStrategy } from './strategies/read-product';
import { UserCategoryEnum, User, Product } from '@app/core/domain';

@Injectable()
export class ProductTransformer implements TProductTransformerPort {
  private readonly readProductStategy: ReadProductStrategy =
    new ReadProductStrategy();

  transformReadProduct(user: User, product: Product): Partial<Product> {
    const userPriorCategory = this.getPriorCategory(user);
    return this.readProductStategy.transform(userPriorCategory, product);
  }

  private getPriorCategory(user: User): UserCategoryEnum {
    return Math.max(...user.category);
  }
}
