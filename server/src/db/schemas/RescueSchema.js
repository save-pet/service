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
        type: String,
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
        type: String,
      },
      noticeEndDate :{
        type: String,
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
      careCode:{
        type: String,
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
