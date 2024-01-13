import { Product } from '@app/core/domain/entities';

export class CreateProductRequestDto
  implements Pick<Product, 'name' | 'price'>
{
  name: string;
  price: number;
}
