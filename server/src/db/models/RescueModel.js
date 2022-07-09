import { model } from 'mongoose';
import { RescueSchema } from '../schemas/RescueSchema';

const Rescue = model('Rescue', RescueSchema);

export class RescueModel {

    // 1. 유기동물 정보 저장
    async create(RescueInfo){
        const createNewRescue = await Rescue.create(RescueInfo);
        return createNewRescue;
    }

    // 2. 전체 유기동물 목록 조회
    async findAll(){
        const rescues = await Rescue.find({}).populate('shelter', 'careNm').sort({"createdAt": -1});
        return rescues;
    }

    // 3. 특정 범위(페이지)에 위치한 제품 정보 조회
    async getInRange(page, perPage){
        const rescuesInRange = await Rescue.find({}).populate('shelter', 'careNm').sort({createdAt: -1}).skip(perPage * (page-1)).limit(perPage);
        return rescuesInRange;
    }

    // 4. _id 기준 조회
    async findById(rescueId){
        const rescue = await Rescue.findOne({ _id : rescueId}).populate('shelter', 'careNm');
        return rescue;
    }

    // 5. 보호소 기준 제품 조회(shelterId 기준 제품 조회)
    async findByShelter(shelterId){
        const rescues = await Rescue.find({ shelter: shelterId}).populate('shelter', 'careNm');
        return rescues;
    }

    // 6. RescueSchema 정보 수정
    async update({ rescueId, update}){
        const filter = { _id : rescueId };
        const option = { returnOriginal: false};
        const updatedRescue = await Rescue.findOneAndUpdate(filter, update, option);
        return updatedRescue;
    }

    // 7. RescueSchema 삭제 
    async del(rescueId){
        const deletedRescue = await Rescue.deleteOne({ _id : rescueId});
        return deletedRescue;
    }
}

const rescueModel = new RescueModel();

export { rescueModel };