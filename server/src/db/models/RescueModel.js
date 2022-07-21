import mongoose from 'mongoose';
import { RescueSchema } from '../schemas/RescueSchema.js';

const Rescue = mongoose.model('Rescue', RescueSchema);

export class RescueModel {
  // 1. 전체 유기동물 목록 조회
  async findAll() {
    const rescues = await Rescue.find({});    
    return rescues;
  }

  // 2-1. 전체 유기동물 수 조회(SKU)
  async countAll(){
    const rescueSKU = await Rescue.countDocuments({});
    return rescueSKU;
  }

  // 2-2. 개체별 유기동물 수 조회
  async countAllByKind(kindCd){
    const rescueByKind = await Rescue.countDocuments({'kindCodeByNum' : kindCd});
    return rescueByKind;
  }

  // 3. 특정 범위(페이지)에 위치한 동물 정보 조회
  async getInRange(page, perPage) {
    let rescuesInRange ;
    if (page === 1){
      rescuesInRange = await Rescue.find({}).limit(perPage); 
    } else {
      const rescuesInPreRange = await Rescue.find({}).limit(perPage * (page - 1));
      const lastId = rescuesInPreRange[perPage * (page - 1) -1]._id;
      rescuesInRange = await Rescue.find({ '_id': {'$gt': lastId}})
        .limit(perPage);
    }
    return rescuesInRange;
  }

  async getInRangeByKind(page, perPage, kindCd) {
    let rescuesInRange ;
    if (page === 1){
      rescuesInRange = await Rescue.find({'kindCodeByNum' : kindCd}).limit(perPage); 
    } else {
      const rescuesInPreRange = await Rescue.find({'kindCodeByNum' : kindCd}).limit(perPage * (page - 1));
      const lastId = rescuesInPreRange[perPage * (page - 1) -1]._id;
      rescuesInRange = await Rescue.find({ '_id': {'$gt': lastId}, 'kindCodeByNum' : kindCd})
        .limit(perPage);
    }
    return rescuesInRange;
  }

  // 4. _id 기준 조회
  async findById(rescueId) {
    const rescue = await Rescue.findOne({ _id: rescueId });
    return rescue;
  }

  // 5. 보호소 기준 동물 조회(보호소 이름 기준 동물 목록 조회)
  async findByCareCode(carecode) {
    const rescues = await Rescue.find({ careCode: carecode });
    return rescues;
  }

  // 5-2. 보호소 기준 동물수 조회(보호소 코드 기준 동물 수 조회)
  async findCountByCareCode(carecode) {
    const rescueCount = await Rescue.find({ careCode: carecode }).count();
    return rescueCount;
  }

  // 6. RescueSchema 정보 수정
  async update({ rescueId, update }) {
    const filter = { _id: rescueId };
    const option = { returnOriginal: false };
    const updatedRescue = await Rescue.findOneAndUpdate(filter, update, option);
    return updatedRescue;
  }

  // 7. RescueSchema 삭제
  async del(rescueId) {
    const deletedRescue = await Rescue.deleteOne({ _id: rescueId });
    return deletedRescue;
  }
}

const rescueModel = new RescueModel();

export { rescueModel };
