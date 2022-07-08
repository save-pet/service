import { ShelterModel } from "../db/models/ShelterModel.js";

class ShelterService {
    constructor(shelterModel){
        this.shelterModel = shelterModel;
    }

    // 1. 신규 보호장소 등록
    async addShelter(shelterInfo){
        const careNm = shelterInfo;

        const shelterList = (await (this.getShetlers())).map(shelter => shelter.careNm);
        const result = shelterList.includes(careNm);
        if (result){
            throw new Error(
                '이 보호소는 이미 존재합니다.'
            );
        }

        // 신규 보호소 정보 생성 및 db 저장
        const newShelterInfo = { careNm };
        const createdNewShelter = await this.shelterModel.create(newShelterInfo);
        
        return createdNewShelter
    }

    // 2. 전체 보호소 조회
    async getShelters(){
        const shelters = await this.shelterModel.findAll();
        return shelters;
    }

    // 3. 단일 보호소 조회
    async findShelter(shelterId){
        const shelter = await this.shelterModel.findById(shelterId);
        return shelter;
    }

    // 4. 보호소 정보 수정
    async setShelter(shelterId, toUpdate){
        const result = await this.shelterModel.update(shelterId, toUpdate);
        if (result){
            return result;
        }
        throw new Error('먼저 보호소를 등록해주세요');
    }

    // 5. 보호소 삭제
    async delShelter(shelterId){
        const shelter = await this.shelterModel.findById(shelterId);
        if(shelter){
            return this.shelterModel.del(shelterId);
        }
        throw new Error('등록되지 않은 보호소입니다. 다시한번 확인해주세요');
    }
}

const shelterService = new ShelterService(ShelterModel);

export { shelterService };