import pkg from 'mongoose';

const { Schema } = pkg;

const ShelterInfoSchema = new Schema (
    {
        userId : {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true // 로그인 하지 않아도 검색 가능하면 false로 
        },
        imgUrl : {

        },
        happenDt : {

        },
        happenPlace: {

        },
        kindCd: {

        },
        colorCd: {

        },
        noticeSdt: {

        },
        noticeEdt :{

        },
        processState: {

        },
        careNm : {

        },
        careAddr: {

        },
        
    },
    {
      timestamps: true,
      collection : 'users',
    }
  );
  
export { ShelterInfoSchema };
