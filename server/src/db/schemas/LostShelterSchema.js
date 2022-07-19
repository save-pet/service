import mongoose from 'mongoose';

const LostShelterSchema = new mongoose.Schema(
  {
    lostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lost',
      required: true,
    },
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shelter',
      required: true,
    },    
    careCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'lostshelters',
  },
);

export { LostShelterSchema };
