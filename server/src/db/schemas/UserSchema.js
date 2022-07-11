import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  },
  {
    timestamps: true,
    collection : 'users',
  }
);

export { UserSchema };
