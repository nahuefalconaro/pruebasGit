import { Schema } from 'mongoose';

export const taskSchema = new Schema({
  title: { type: String, required: true },
  desciption: String,
  fechaCreacion: { type: Date, defualt: new Date() },
  done: Boolean,
});
