import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  _id: false,
  validateBeforeSave: true,
  versionKey: false,
})
export class Image {
  @Prop({
    type: SchemaTypes.String,
  })
  url?: string;

  @Prop({
    type: SchemaTypes.String,
  })
  publicId?: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
