import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { TApiConfig } from '@app/infra/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService<TApiConfig>) => ({
        uri: config.getOrThrow<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(...models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
