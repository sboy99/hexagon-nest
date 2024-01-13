import { Product } from '@app/core/domain/entities';

export class ReadProductResponseDto
  implements Required<Pick<Product, 'id' | 'slug' | 'name' | 'price'>>
{
  id: string;
  slug: string;
  name: string;
  price: number;

  constructor(entity: Product) {
    this.id = entity.id;
    this.slug = entity.slug;
    this.name = entity.name;
    this.price = entity.price;
  }
}
