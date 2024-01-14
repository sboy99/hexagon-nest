import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/infra/database';
import { CacheModule } from '@app/infra/cache/cache.module';
import { ConfigModule } from '@app/infra/config';
import { ProductController } from '@app/adapters/inbound/controllers';
import { providers } from '@app/app';
import { ProductModel, UserModel } from '@app/infra/mongo/models';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CacheModule,
    DatabaseModule.forFeature(UserModel, ProductModel),
  ],
  controllers: [ProductController],
  providers,
})
export class AppModule {}
