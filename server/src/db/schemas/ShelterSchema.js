import mongoose from 'mongoose';

const ShelterSchema = new mongoose.Schema(
  {
    careName: {
      type: String,
      required: true,
    },
    careAddress: {
      type: String,
      required: true,
    },
    careTel: {
      type: String,
      required: true,
    },
    careCode: {
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
    collection: 'shelters',
  },  
);

export { ShelterSchema };
