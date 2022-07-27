import { shelterModel } from '../db/models/ShelterModel.js';

class ShelterService {
  constructor(shelterModel) {
    this.shelterModel = shelterModel;
  }

  // 1. 신규 등록 -> 필요 없음 (openApi 에서 일괄적으로 등록)

  // 2. 전체 보호소 조회
  async getShelters() {
    const shelters = await this.shelterModel.findAll();
    return shelters;
  }

  // 3. 전체 보호소 수 조회
  async countShelters() {
    const sheltersNum = await this.shelterModel.countAll();
    return sheltersNum;
  }

  // 4. 특정 페이지 위치한 보호소 조회(pagination)
  async getRangeShelters(page, perPage) {
    const rangedSheltersInfo = await this.shelterModel.getInRange(
      page,
      perPage,
    );
    return rangedSheltersInfo;
  }

  // 5. _id 이용 보호소 조회
  async findShelter(shelterId) {
    const shelter = await this.shelterModel.findById(shelterId);
    return shelter;
  }

  // 6. 보호소 code 별 조회
  async findShelterByCode(shelterCd) {
    const shelter = await this.shelterModel.findByCode(shelterCd);
    return shelter;
  }

  // 7. 보호소 정보 수정 (API 사용하니까 수정할 일은 없을듯)

  // 8. 보호소 삭제 (자체적으로 삭제하면 안됨)
}

const shelterService = new ShelterService(shelterModel);

export { shelterService };
