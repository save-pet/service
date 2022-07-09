/* eslint-disable import/named */
import { rescueModel } from '../db/models/RescueModel.js'
import { shelterModel } from '../db/models/ShelterModel.js'

class RescueService {
    constructor(rescueModel){
        this.rescueModel = rescueModel;
    }

    // 1. 신규 등록
    async addRescue(rescueInfo){
        const { imgUrl, happenDt, happenPlace, kindCd, colorCd, noticeSdt, noticeEdt, processState, shelter } = rescueInfo;
        const { _id: shelterId, careNm : shelterName, careAddr: shelterAddr } = shelter;

        const rescue = await this.rescueModel.findByName(imgUrl);
        if(rescue){
            throw new Error(
                '중복 등록입니다. '
            );
        }

        const shelterList = await shelterModel.getShelterNames();
        if (!shelterList.includes(shelterName)){
            const newShelterModel = await shelterModel.create({
                careNm: shelterName,
            });
            // eslint-disable-next-line no-const-assign
            shelterId = newShelterModel._id.toString();
        }

        const newRescueInfo = {
            imgUrl,
            happenDt,
            happenPlace,
            kindCd,
            colorCd,
            noticeSdt,
            noticeEdt,
            processState,
            shelter: shelterId,
        };

        const createdNewRescue = await this.rescueModel.create(newRescueInfo);
        return createdNewRescue;
    }

    // 2. 전체 구조 동물 조회
    async getRescues() {
        const rescues = await this.rescueModel.findAll();
        return rescues;
    }

    // 3. 전체 구조 동물 수 조회 (근데 이건 api 가 따로 있어서 .. 음 그래도 일단 작성해두긴 함)
    async countRescue(){
        const rescueQty = await this.rescueModel.countAll();
        return rescueQty;
    }

    // 4. 특정 페이지 위치한 보호 동물 정보 조회
    async getRangeRescues(page, perPage){
        const rangedRescuesInfo = await this.rescueModel.getInRange(page, perPage);
        return rangedRescuesInfo;
    }

    // 5. Id 이용 단일 보호 동물 조회
    async findRescue(rescueId){
        const rescue = await this.rescueModel.findById(rescueId);
        return rescue;
    }

    // 6. 보호소 아이디별 검색
    async findByShelterId(shelterId){
        const rescue = await this.rescueModel.findByShelterId(shelterId);
        return rescue;
    }

    // 7. 보호 동물 정보 수정 (근데 API 사용하니까 수정할 일은 없을듯)
    async setRescue(rescueId, toUpdate){
        let rescue = await this.rescueModel.findById(rescueId);

        if(!rescue){
            throw new Error('보호 동물 내역이 없습니다. 확인해주세요');
        }

        const shelterName = toUpdate.shelter;
        let shelterId = '';

        const shelterList = await shelterModel.getShelterNames();

        if(shelterList.includes(shelterName)){
            const index = shelterList.indexOf(shelterName);
            shelterId = (await shelterModel.findAll({})).map((result)=> result._id.toString())[index];
        } else if(shelterName){
            const newShelterModel = await shelterModel.create({
                name : shelterName,
            });
            shelterId = newShelterModel._id.toString();
        }
        toUpdate.shelter = shelterId;

        rescue = await this.shelterModel.update({
            shelterId,
            update: toUpdate,
        });

        return rescue;
    }

    // 8. 보호 동물 삭제
    async removeRescue(rescueId){
        const rescue = await this.rescueModel.findById(rescueId);

        if(rescue){
            return this.rescueModel.del(rescueId);
        }
        throw new Error('존재하지 않는 보호동물입니다. 다시한번 확인해주세요');
    }
}

const rescueService = new RescueService(rescueModel);

export { rescueService };