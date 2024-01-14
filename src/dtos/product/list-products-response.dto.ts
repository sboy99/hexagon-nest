import { Product } from '@app/core/domain/entities';

export class ListProductsResponseDto
  implements Pick<Product, 'slug' | 'name' | 'price'>
{
  name: string;
  price: number;
  slug: string;

  constructor(entity: Product) {
    this.name = entity.name;
    this.price = entity.price;
    this.slug = entity.slug;
  }
}
