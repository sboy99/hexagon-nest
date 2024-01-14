import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@app/core/domain';
import {
  ProductRepositoryPort,
  TProductRepositoryPort,
  TProductServicePort,
} from '../ports';

@Injectable()
export class ProductService implements TProductServicePort {
  constructor(
    @Inject(ProductRepositoryPort)
    private readonly productRepository: TProductRepositoryPort,
  ) {}

  create(entity: Partial<Product>): Promise<Product>;
  create(name: string, price: number): Promise<Product>;
  create(name: unknown, price?: unknown): Promise<Product> {
    return this.productRepository.create({
      name: name as string,
      price: price as number,
    });
  }

  count(): Promise<number> {
    return this.productRepository.count();
  }

  public async read(id: string): Promise<Product> {
    return await this.productRepository.readById(id);
  }

  public async list(): Promise<Product[]> {
    return this.productRepository.list();
  }
}
