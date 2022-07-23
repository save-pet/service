import mongoose from 'mongoose';
import { ShelterSchema } from '../schemas/ShelterSchema.js';

const Shelter = mongoose.model('Shelter', ShelterSchema);

export class ShelterModel {

  // 1. 전체 보호소 목록 조회
  async findAll() {
    const shelters = await Shelter.find({})
      .sort({ createdAt: -1 });
    return shelters;
  }

  // 2. 전체 보호소 개수 조회 (SKU)
  async countAll(){
    const shelterSKU = await Shelter.countDocuments({});
    return shelterSKU;
  }

  // 3. 특정 범위(페이지)에 위치한 보호소 조회 
  async getInRange(page, perPage) {
    const sheltersInRange = await Shelter.find({}).sort({ 'careName': 1 }).skip(perPage * (page - 1)).limit(perPage)
    return sheltersInRange;
  }

  // 4. _id 기준 조회
  async findById(shelterId) {
    const shelter = await Shelter.findOne({ _id: shelterId });
    return shelter;
  }

  // 5. code 기준 조회
  async findByCode(shelterCd){
    const shelter = await Shelter.findOne({ careCode : shelterCd });
    return shelter;
  }

  // 보호소 위경도 조회
  async getCoordinate(shelterId) {
    const shelterInfo = await Shelter.findOne({ _id : shelterId });
    const latitude = shelterInfo.latitude;
    const longitude = shelterInfo.longitude;
    return { latitude: latitude, longitude: longitude };
  }

  // 6. 보호소 정보 수정 -> api 에서 불러오는것이므로 우리가 자체적으로 수정할 필요 없을듯

  // 7. 보호소 정보 삭제 -> 자체적으로 삭제하면 안됨

}

const shelterModel = new ShelterModel();

export { shelterModel };
