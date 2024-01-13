import { Injectable } from '@nestjs/common';
import { IProductService } from './product.service.interface';
import { Product } from '../domain/entities';
import { ProductRepository } from '@app/adapters/repositories';

@Injectable()
export class ProductService implements IProductService<Product> {
  constructor(private readonly productRepository: ProductRepository) {}

  public async create(name: string, price: number): Promise<Product> {
    return await this.productRepository.create({
      name,
      price,
    });
  }

  public async read(id: string): Promise<Product> {
    return await this.productRepository.readById(id);
  }

  public async list(): Promise<Product[]> {
    return this.productRepository.list();
  }
}
