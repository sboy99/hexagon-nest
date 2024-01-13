import { AbstractEntity } from '@app/common/abstracts';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  id: true,
  validateBeforeSave: true,
  versionKey: false,
})
export class Product extends AbstractEntity<Product> {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  name: string;

  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
