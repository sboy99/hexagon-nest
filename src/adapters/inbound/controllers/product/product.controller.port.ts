import { TApiResponseAsync, Product } from '@app/core/domain';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
} from '@app/dtos/product';

export type TProductControllerPort = {
  createProduct(
    dto: CreateProductRequestDto,
  ): TApiResponseAsync<CreateProductResponseDto>;

  listProducts(): TApiResponseAsync<Partial<Product>[]>;

  countProducts(): TApiResponseAsync<number>;

  readProduct(id: string): TApiResponseAsync<Partial<Product>>;
};
