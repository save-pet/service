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

}