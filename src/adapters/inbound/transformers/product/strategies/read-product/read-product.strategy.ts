import { UserCategoryEnum } from '@app/core/domain';
import { IReadProductStrategy } from './read-product.strategy.interface';
import { UserReadProductStrategy } from './user-read-product.strategy';
import { BuidlerReadProductStrategy } from './buidler-read-product.strategy';
import { AdminReadProductStrategy } from './admin-read-product.strategy';
import { Product } from '@app/core/domain/entities';

export class ReadProductStrategy {
  private strategyOrchestrator = new Map<
    UserCategoryEnum,
    IReadProductStrategy
  >();
  private strategies: IReadProductStrategy[] = [
    new UserReadProductStrategy(),
    new BuidlerReadProductStrategy(),
    new AdminReadProductStrategy(),
  ];

  constructor() {
    this.registerStrategies();
  }

  private registerStrategies(): void {
    for (const strategy of this.strategies) {
      const UserCategoryEnum = strategy.getCategory();
      this.strategyOrchestrator.set(UserCategoryEnum, strategy);
    }
  }

  public transform(
    UserCategoryEnum: UserCategoryEnum,
    product: Product,
  ): Partial<Product> {
    const strategy = this.strategyOrchestrator.get(UserCategoryEnum);
    return strategy.transform(product);
  }
}
