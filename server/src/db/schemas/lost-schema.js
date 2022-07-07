import pkg from 'mongoose';
import { shortId } from './types/short-id.js';

const { Schema } = pkg;
const LostSchema = new Schema(
  {
    shortId,

    email: {
      type: String,
      index: true,
      unique: true,
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
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        },
      ),
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
