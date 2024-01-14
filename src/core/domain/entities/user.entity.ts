import { AbstractEntityWithSlug } from '@app/core/domain';
import { UserCategoryEnum } from '../enums';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Image, ImageSchema } from './image.entity';

export class User extends AbstractEntityWithSlug<User> {
  @Prop({
    type: [SchemaTypes.String],
    enum: UserCategoryEnum,
  })
  category: UserCategoryEnum[];

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
