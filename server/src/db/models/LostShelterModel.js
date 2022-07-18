import mongoose from 'mongoose';
import { LostShelterSchema } from '../schemas/LostShelterSchema.js';

const LostShelter = mongoose.model('lostshelters', LostShelterSchema);

export class LostShelterModel {

  // 0. 전체 목록 조회
  async findAll() {
    const lostShelters = await LostShelter.find({});
    return lostShelters;
  }

  // 0. 하나의 정보 조회 (_id 사용)
  async findById(id) {
    const lostShelterInfo = await LostShelter.find({ _id : id});
    return lostShelterInfo;
  }

  // 1. 하나의 분실 목록에 대한 정보 조회
  async findByLostId(lostId) {
    const lostInfo = await LostShelter.find({ lostId : lostId});
    return lostInfo;
  }

  // 2. 하나의 보호소에 대한 정보 조회
  async findByShelter(shelterId) {
    const shelterInfo = await LostShelter.find({ shelterId : shelterId});
    return shelterInfo;
  }

  // 3. 하나의 보호소 code에 대한 정보 조회
  async findByShelterCode(careCode) {
    const shelterCodeInfo = await LostShelter.find({ careCode: careCode });
    return shelterCodeInfo;
  }

  // 3. CRUD
  async create(lostShelterInfo) {
    const newLostShelter = await LostShelter.create(lostShelterInfo);
    return newLostShelter;
  }

  async update({ lostShelterId, update }) {
    const filter = { _id : lostShelterId };
    const option = { returnOriginal: false };

    const updatedLostShelterPost = await LostShelter.findOneAndUpdate(filter, update, option);

    return updatedLostShelterPost;
  }

  async delete(lostShelterId) {
    await LostShelter.findOneAndDelete({ _id : lostShelterId });
  }

}

const lostShelterModel = new LostShelterModel();

export { lostShelterModel };