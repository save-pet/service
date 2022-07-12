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

  // 3-1. 분실 위치 위경도 불러오기 
  async LostLatitude(lostId) {
    const latitude = await LostShelter.find({lostId : lostId}).populate('lost','latitude');
    return latitude;
  }

  async LostLongitude(lostId) {
    const longitude = await LostShelter.find({lostId : lostId}).populate('lost','longitude');
    return longitude;
  }
  
  // 3-2. 보호소 위치 위경도 불러오기
  async ShelterLatitude(shelterId) {
    const latitude = await LostShelter.find({ shelterId : shelterId}).populate('shelter', 'latitude');
    return latitude;
  }

  async ShelterLongitude(shelterId) {
    const longitude = await LostShelter.find({shelterId: shelterId}).populate('shelter', 'longitude');
    return longitude;
  }

  // 3. 위경도 distance 구하기 
  async Dist(lat1, lon1, lat2, lon2) {
    function rad (x) {
        return x*Math.PI/180;
    }

    const R = 6378.137;             
    const dLat = rad( lat2 - lat1 );
    const dLong = rad( lon2 - lon1 );

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;

    return d.toFixed(3);
  }

  // 4. CRUD
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