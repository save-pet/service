import mongoose from 'mongoose';
import { LostShelterSchema } from '../schemas/LostShelterSchema.js';

const LostShelter = mongoose.model('lostshelters', LostShelterSchema);

export class LostShelterModel {

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

  // 4. 

}

const lostShelterModel = new LostShelterModel();

export { lostShelterModel };