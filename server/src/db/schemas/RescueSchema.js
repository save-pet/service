import pkg from 'mongoose';

const { Schema } = pkg;

const ShelterInfoSchema = new Schema (
    {
      imgUrl : {
        type : String,
        unique: true,
      },
      happenDt : {
        type: Date,
        default: new Date(0),
      },
      happenPlace: {
        type : String,
      },
      kindCd: {
        type: String,
      },
      colorCd: {
        type: String,
      },
      noticeSdt: {
        type: Date,
      },
      noticeEdt :{
        type: Date,
      },
      processState: {
        type: String,
      },
      careNm : {
        type: String,
        ref: 'Shelter',
        required: true
      }
    },
    {
      timestamps: true,
      collection : 'rescues',
    }
  );
  
export { ShelterInfoSchema };
