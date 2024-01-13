import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/infra/database';
import { CacheModule } from '@app/infra/cache/cache.module';
import { ConfigModule } from '@app/infra/config';
import { ProductController } from '@app/adapters/controllers';
import { ProductService } from '@app/core/services';
import { ProductRepository } from '@app/adapters/repositories';
import { ProductModel, UserModel } from '@app/infra/database/mongo/models';
import { ProductTransformer } from '@app/adapters/transformers';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CacheModule,
    DatabaseModule.forFeature(UserModel, ProductModel),
  ],
  controllers: [ProductController],
  providers: [
    // -services- //
    ProductService,
    // -Repositories- //
    ProductRepository,
    // -Transformers- //
    ProductTransformer,
  ],
})
export class AppModule {}
