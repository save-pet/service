import mongoose from 'mongoose';

const RescueSchema = new mongoose.Schema (
    {
      imgUrl : {
        type : String,
        unique: true,
      },
      happenDate : {
        type: Date,
        default: new Date(0),
      },
      happenPlace: {
        type : String,
      },
      kindCode: {
        type: String,
      },
      colorCode: {
        type: String,
      },
      sexCode: {
        type: String,
      },
      noticeStartDate: {
        type: Date,
      },
      noticeEndDate :{
        type: Date,
      },
      processState: {
        type: String,
      },
      shelter : {
        type: mongoose.Schema.Types.ObjectId,
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
