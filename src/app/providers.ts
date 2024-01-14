import {
  ProductRepository,
  ProductTransformer,
  ProductTransformerPort,
} from '@app/adapters';
import { ProductRepositoryPort, ProductServicePort } from '@app/core/ports';
import { ProductService } from '@app/core/services';
import { Provider } from '@nestjs/common';

const serviceProviders: Provider[] = [
  {
    provide: ProductServicePort,
    useClass: ProductService,
  },
];

const transformProviders: Provider[] = [
  {
    provide: ProductTransformerPort,
    useClass: ProductTransformer,
  },
];

const repositoryProviders: Provider[] = [
  {
    provide: ProductRepositoryPort,
    useClass: ProductRepository,
  },
];

export const providers: Provider[] = [
  ...serviceProviders,
  ...repositoryProviders,
  ...transformProviders,
];
