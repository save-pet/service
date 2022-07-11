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
      careTel:{
        type: String, 
        required: false,
      },
    },
    {
      collection: 'shelters',
    }
  );
  
  export { ShelterSchema };
