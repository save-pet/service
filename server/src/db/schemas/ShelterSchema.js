import pkg from 'mongoose';

const { Schema } = pkg;

const ShelterSchema = new Schema(
    {
      careNm: {
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
