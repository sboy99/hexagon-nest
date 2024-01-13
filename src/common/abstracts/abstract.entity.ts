import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  versionKey: false,
})
export abstract class AbstractEntity<T> {
  id?: string;

  @Prop({
    type: SchemaTypes.String,
    index: true,
    unique: true,
  })
  slug?: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  name: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
