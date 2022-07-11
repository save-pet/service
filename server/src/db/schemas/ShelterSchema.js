import mongoose from 'mongoose';

const ShelterSchema = new mongoose.Schema(
    {
      careName: {
        type: String,
        required: true,
        unique: true,
      },
      careAddr: {
        type: String,
        required: true,
        unique: true,
        },
    },
    {
      collection: 'shelters',
    }
  );
  
  export { ShelterSchema };
