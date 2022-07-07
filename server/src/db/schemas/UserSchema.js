import pkg from 'mongoose';

const { Schema } = pkg;

const UserSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
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
        }
      ),
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
