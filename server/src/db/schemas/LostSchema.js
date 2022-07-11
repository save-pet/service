import mongoose from 'mongoose';
import { shortId } from './types/short-id.js';

const LostSchema = new mongoose.Schema(
  {
    shortId,

    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
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
    phoneNumber1: {
      type: String,
      required: true,
    },
    phoneNumber2: {
      type: String,
      required: false,
    },
    detail: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'losts',
  },
);

export { LostSchema };
