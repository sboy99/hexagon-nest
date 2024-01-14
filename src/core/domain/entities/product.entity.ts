import { AbstractEntityWithSlug } from '@app/core/domain';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  id: true,
  validateBeforeSave: true,
  versionKey: false,
})
export class Product extends AbstractEntityWithSlug<Product> {
  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
