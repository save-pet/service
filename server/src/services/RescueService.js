import { rescueModel } from '../db/models/RescueModel.js';

class RescueService {
  constructor(rescueModel) {
    this.rescueModel = rescueModel;
  }

  // 1. 신규 등록 -> 근데 필요없을듯 (openApi 에서 일괄적으로 등록하니까)

  // 2. 전체 구조 동물 조회
  async getRescues() {
    const rescues = await this.rescueModel.findAll();
    return rescues;
  }

  // 3. 전체 구조 동물 수 조회
  async countRescue() {
    const rescueQty = await this.rescueModel.countAll();
    return rescueQty;
  }

  // 3-1. 개체별 구조 동물 수 조회
  async countRescueByKind(kindCd) {
    const rescueQty = await this.rescueModel.countAllByKind(kindCd);
    return rescueQty;
  }

  // 4. 특정 페이지 위치한 보호 동물 정보 조회 (pagination)
  async getRangeRescues(page, perPage) {
    const rangedRescuesInfo = await this.rescueModel.getInRange(page, perPage);
    return rangedRescuesInfo;
  }

  // 4-1. 특정 페이지 위치한 개체별 보호 동물 정보 조회 (pagination)
  async getRangeRescuesByKind(page, perPage, kindCd) {
    const rangedRescuesInfoByKind = await this.rescueModel.getInRangeByKind(
      page,
      perPage,
      kindCd,
    );
    return rangedRescuesInfoByKind;
  }

  // 5. _id 이용 단일 보호 동물 조회
  async findRescue(rescueId) {
    const rescue = await this.rescueModel.findById(rescueId);
    return rescue;
  }

  // 6. 보호소 코드 별 검색
  async findByCareCode(careCode) {
    const rescues = await this.rescueModel.findByCareCode(careCode);
    return rescues;
  }

  // 6-2. 보호소 코드 별 동물 수 검색
  async findCountByCareCode(careCode) {
    const rescueCount = await this.rescueModel.findCountByCareCode(careCode);
    return rescueCount;
  }

  // 7. 보호 동물 정보 수정 (근데 API 사용하니까 수정할 일은 없을듯)

  // 8. 보호 동물 삭제
  async removeRescue(rescueId) {
    const rescue = await this.rescueModel.findById(rescueId);

    if (rescue) {
      return this.rescueModel.del(rescueId);
    }
    throw new Error('존재하지 않는 보호동물입니다. 다시한번 확인해주세요');
  }
}

const rescueService = new RescueService(rescueModel);

export { rescueService };
