import { AbstractEntity } from '@app/common/abstracts';
import { UserCategory } from '../enums';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Image, ImageSchema } from './image.entity';

export class User extends AbstractEntity<User> {
  @Prop({
    type: [SchemaTypes.String],
    enum: UserCategory,
  })
  category: UserCategory[];

  @Prop({
    type: ImageSchema,
  })
  avatar?: Image;

  @Prop({
    type: SchemaTypes.Boolean,
  })
  isBlocked?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
