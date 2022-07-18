import mongoose from 'mongoose';
import { shortId } from './types/short-id.js';

const LostSchema = new mongoose.Schema(
  {
    shortId,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    animalName: {
      type: String,
      required: true,
    },
    lostDate: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: false,
    },
    radius: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    processState: {
      type: String,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'losts',
  },
);

export { LostSchema };
