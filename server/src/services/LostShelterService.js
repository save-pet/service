import { lostShelterModel } from '../db/models/LostShelterModel.js';
import { lostModel } from '../db/models/LostModel.js';
import { shelterModel } from '../db/models/ShelterModel.js';

class LostShelterService {
  constructor(lostShelterModel) {
    this.lostShelterModel = lostShelterModel;
  }

  // 전체 조회
  async getLostShelters() {
    const lostShelters = await this.lostShelterModel.findAll();

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

  // 특정 보호소 code 관련 목록 조회
  async getLostShelterByShelterCode(careCode) {
    const postByShelterCode = await this.lostShelterModel.findByShelterCode(
      careCode,
    );
    return postByShelterCode;
  }

  // 전화번호 반환 -> schema에 phoneNumber 저장 안해도 될듯
  async getPhoneNumber(lostId) {
    const phoneNumber = await lostModel.findPhoneNumberByLostId(lostId);
    return phoneNumber;
  }

  // 분실장소의 위/경도와 보호소의 위경도로 거리구하기
  async getDistance(lostId, shelterId) {
    function rad(x) {
      return (x * Math.PI) / 180;
    }

    const lostCoordinate = await lostModel.getCoordinate(lostId);
    const shelCoordinate = await shelterModel.getCoordinate(shelterId);
    const lostLa = lostCoordinate.latitude;
    const lostLon = lostCoordinate.longitude;
    const shelLa = shelCoordinate.latitude;
    const shelLon = shelCoordinate.longitude;

    const R = 6378.137;
    const dLat = rad(shelLa - lostLa);
    const dLong = rad(shelLon - lostLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lostLa)) *
        Math.cos(rad(shelLa)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    const Distance = d.toFixed(3);
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

    lostShelter = await this.lostShelterModel.update({
      lostShelterId,
      update: toUpdate,
    });

    return lostShelter;
  }

  // 게시글 삭제
  async deleteLost(id) {
    const lostShelterPost = await this.lostShelterModel.findById(id);

    if (!lostShelterPost) {
      throw new Error('해당하는 글이 없습니다. 게시글 id를 다시 확인해주세요');
    }
    await this.lostShelterModel.delete(id);
  }
}

const lostShelterService = new LostShelterService(lostShelterModel);

export { lostShelterService };
