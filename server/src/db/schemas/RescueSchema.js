import mongoose from 'mongoose';

const RescueSchema = new mongoose.Schema (
    {
      desertionNo : {
        type: String,
        unique : true,
      }, 
      imgUrl : {
        type : String,
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
      neuterYN : {
        type: String, 
      },
      noticeStartDate: {
        type: Date,
      },
      noticeEndDate :{
        type: Date,
      },
      specialMark:{
        type: String,
      },
      age: {
        type: String,
      },
      weight: {
        type: String,
      },
      processState: {
        type: String,
      },
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
      officeTel: {
        type: String,
      }
    },
    {
      timestamps: true,
      collection : 'rescues',
    }
  );
  
export { RescueSchema };
