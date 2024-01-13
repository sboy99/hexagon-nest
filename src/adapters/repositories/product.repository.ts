import { Product } from '@app/core/domain/entities';
import { MongoRepositoryAdapter } from '@app/infra/database/mongo';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository extends MongoRepositoryAdapter<Product> {
  protected logger: Logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(Product.name) protected readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }
}
