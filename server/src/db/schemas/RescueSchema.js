import pkg from 'mongoose';

const { Schema } = pkg;

const RescueSchema = new Schema (
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
      shelter : {
        type: Schema.Types.ObjectId,
        ref: 'Shelter',
        required: true
      }
    },
    {
      timestamps: true,
      collection : 'rescues',
    }
  );
  
export { RescueSchema };
