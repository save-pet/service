/* eslint-disable no-useless-return */
import { lostShelterModel } from '../db/models/LostShelterModel.js';
import { lostModel } from '../db/models/LostModel.js'
import { shelterModel } from '../db/models/ShelterModel.js';

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

    // 전화번호 반환 -> schema에 phoneNumber 저장 안해도 될듯 
    async getPhoneNumber (lostId){
        const phoneNumber = await lostModel.findPhoneNumberByLostId(lostId);
        return phoneNumber;
    }
  
    // 분실장소의 위/경도와 보호소의 위경도로 거리구하기
    async getDistance(lostId, shelterId) {
      
      const lostLa = await lostModel.getLatitude(lostId);
      const lostLon = await lostModel.getLongitude(lostId);
      const shelLa = await shelterModel.getLatitude(shelterId);
      const shelLon = await shelterModel.getLongitude(shelterId);      
      const Distance = await this.lostShelterModel.Dist(lostLa, lostLon, shelLa, shelLon);
      return Distance;
    }

    // 게시글 생성
    async addLostShelter(lostShelterInfo) {
        const Info = await this.lostShelterModel.create(lostShelterInfo);
        return Info;
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
  
    // 게시글 삭제
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
  