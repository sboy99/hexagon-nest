import { Injectable } from '@nestjs/common';
import { IProductTransformer } from './product.transformer.interface';
import { User, Product } from '@app/core/domain/entities';
import { ReadProductStrategy } from './strategies/read-product';
import { UserCategory } from '@app/core/domain/enums';

@Injectable()
export class ProductTransformer implements IProductTransformer {
  private readonly readProductStategy: ReadProductStrategy =
    new ReadProductStrategy();

  transformReadProduct(user: User, product: Product): Partial<Product> {
    const userPriorCategory = this.getPriorCategory(user);
    return this.readProductStategy.transform(userPriorCategory, product);
  }

  private getPriorCategory(user: User): UserCategory {
    return Math.max(...user.category);
  }
}
