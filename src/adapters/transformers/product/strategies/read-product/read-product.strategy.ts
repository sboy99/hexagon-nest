import { UserCategory } from '@app/core/domain/enums';
import { IReadProductStrategy } from './read-product.strategy.interface';
import { UserReadProductStrategy } from './user-read-product.strategy';
import { BuidlerReadProductStrategy } from './buidler-read-product.strategy';
import { AdminReadProductStrategy } from './admin-read-product.strategy';
import { Product } from '@app/core/domain/entities';

export class ReadProductStrategy {
  private strategyOrchestrator = new Map<UserCategory, IReadProductStrategy>();
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
      const userCategory = strategy.getCategory();
      this.strategyOrchestrator.set(userCategory, strategy);
    }
  }

  public transform(
    userCategory: UserCategory,
    product: Product,
  ): Partial<Product> {
    const strategy = this.strategyOrchestrator.get(userCategory);
    return strategy.transform(product);
  }
}
