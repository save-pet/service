/* eslint-disable no-useless-return */
import { lostShelterModel } from '../db/models/LostShelterModel.js';

class LostShelterService {
    constructor(lostShelterModel) {
      this.lostShelterModel = lostShelterModel;
    }
  
    // 전체 조회
    async getLostShelters() {
      const lostShelters= await this.lostShelterModel.findAll();
      
      return lostShelters;
    }
  
    // 해당 분실 신고 관련 목록 조회
    async getLostShelterByLostId(lostId) {
      const postByLost = await this.lostShelterModel.findByLostId(lostId);
      return postByLost;
    }

    // 특정 보호소 관련 목록 조회
    async getLostShelterByShelter(shelterId) {
        const postByShelter = await this.lostShelterModel.findByShelter(shelterId);
        return postByShelter;
    }
  
    // 분실장소의 위/경도와 보호소의 위경도로 거리구하기
    async getDistance(lostId, shelterId) {
      const lostLa = await this.lostShelterModel.LostLatitude(lostId);
      const lostLon = await this.lostShelterModel.LostLongitude(lostId);
      const shelLa = await this.lostShelterModel.ShelterLatitude(shelterId);
      const shelLon = await this.lostShelterModel.ShelterLongitude(shelterId);

      const Distance = await this.lostShelterModel.Distance(lostLa, lostLon, shelLa, shelLon);
      return Distance;
    }
  
    // 게시글 하나씩 수정
    async updateLostShelter(lostShelterId, toUpdate) {
      let lostShelter = await this.lostShelterModel.findById(lostShelterId);
  
      if (!lostShelter) {
        throw new Error(
          '해당 게시글이 존재하지 않습니다. 게시글 id를 다시 확인해주세요.',
        );
      }
  
      lostShelter = await this.lostShelterModel.update({ lostShelterId, update: toUpdate });
  
      return lostShelter;
    }
  
    // 분실 글 삭제
    async deleteLost(id) {
      const lostShelterPost = await this.lostShelterModel.findById(id);
  
      if (!lostShelterPost) {
        throw new Error('해당하는 글이 없습니다. 게시글 id를 다시 확인해주세요');
      }
      await this.lostShelterModel.delete(id);
      return;
    }
  }
  
  const lostShelterService = new LostShelterService(lostShelterModel);
  
  export { lostShelterService };
  