/* eslint-disable import/named */
import { rescueModel } from '../db/models/RescueModel.js'
import { shelterModel } from '../db/models/ShelterModel.js'
import fs from 'fs';

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
}

const rescueService = new RescueService(rescueModel);

export { rescueService };