import { ModelDefinition } from '@nestjs/mongoose';
import { ProductSchema, UserSchema } from '@app/core/domain/entities';

export const ProductModel: ModelDefinition = {
  name: 'Product',
  schema: ProductSchema,
};

export const UserModel: ModelDefinition = {
  name: 'User',
  schema: UserSchema,
};
