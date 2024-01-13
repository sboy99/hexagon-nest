import { TApiResponseAsync } from '@app/common/types';
import { Product } from '@app/core/domain/entities';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
} from '@app/dtos/product';

export interface IProductController {
  createProduct(
    dto: CreateProductRequestDto,
  ): TApiResponseAsync<CreateProductResponseDto>;

  listProducts(): TApiResponseAsync<Partial<Product>[]>;

  readProduct(id: string): TApiResponseAsync<Partial<Product>>;
}
