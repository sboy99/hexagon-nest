import { Product } from '@app/core/domain/entities';

export class CreateProductResponseDto
  implements Required<Pick<Product, 'id' | 'slug'>>
{
  id: string;
  slug: string;

  constructor(entity: Product) {
    this.id = entity.id;
    this.slug = entity.slug;
  }
}
