import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
  collection: 'movies',
})
export class Movie extends Document {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: Date,
    required: true,
  })
  released: Date;

  @Prop({
    type: String,
    required: true,
  })
  genre: string;

  @Prop({
    type: String,
    required: true,
  })
  director: string;

  @Prop({
    type: Date,
    required: true,
    default: () => Date.now(),
  })
  createdAt: Date;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
