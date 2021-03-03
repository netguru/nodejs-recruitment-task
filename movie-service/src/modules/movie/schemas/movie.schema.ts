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
  title: string;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
