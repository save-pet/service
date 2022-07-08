import { model } from 'mongoose';
import { ShelterSchema } from '../schemas/ShelterSchema';

const Shelter = model('Shelter', ShelterSchema);

export class ShelterModel {

    // 1. shelter 정보 저장
    async create(shelterInfo){
        const createNewShelter = await Shelter.create(shelterInfo);
        return createNewShelter;
    }

    // 2. 전체 shelter 목록 조회
    async findAll(){
        const shelters = await Shelter.find({});
        return shelters;
    }

    // 3. 특정 Shelter 조회
    async findById(shelterId){
        const shelter = await Shelter.findOne({_id : shelterId});
        return shelter;
    }

    // 4. shelter 수정
    async update(shelterId, update){
        const filter = { _id : shelterId};
        const option = { returnOriginal : false};
        const updatedShelter = await Shelter.findOneAndUpdate(filter, update, option);
        return updatedShelter;
    } 

    // 5. shelter 삭제 
    async del(shelterId){
        await Shelter.deleteOne({_id : shelterId});
        return 'Successfully deleted';
    }
}