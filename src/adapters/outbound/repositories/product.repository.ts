import { Product } from '@app/core/domain/entities';
import { TProductRepositoryPort } from '@app/core/ports';
import { MongoRepositoryWithSlugAdapter } from '@app/infra/mongo';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository
  extends MongoRepositoryWithSlugAdapter<Product>
  implements TProductRepositoryPort
{
  protected logger: Logger = new Logger(ProductRepository.name);

  constructor(
    @InjectModel(Product.name) protected readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }

  count(): Promise<number> {
    return this.model.countDocuments();
  }
}
