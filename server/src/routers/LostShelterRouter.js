/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { Router } from 'express';
import { loginRequired, adminRequired } from '../middlewares/index.js';
import { lostService, userService, lostShelterService, shelterService } from '../services/index.js';

const lostShelterRouter = Router();

// 1.전체 목록 조회
lostShelterRouter.get('/', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const lostShelters = await lostShelterService.getLostShelters();

    res.status(200).json(lostShelters);
  } catch (error) {
    next(error);
  }
});

// 2. 사용자가 작성한 분실 글에 대한 목록 조회
lostShelterRouter.get('/:lostId', loginRequired, async (req, res, next) => {
  try {
    const lostId = req.params.lostId;
    const posts = await lostShelterService.getLostShelterByLostId(lostId);
    if (!posts) {
      throw new Error('분실 등록된 글이 없습니다./ ');
    }

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// 3. 특정 보호소 기준으로 목록 불러오기
lostShelterRouter.get('/:shelterId', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const shelterId = req.params.shelterId;
    const postsByShelter = await lostShelterService.getLostShelterByShelter(shelterId);
    res.status(200).json(postsByShelter);
  } catch (error) {
    next(error);
  }
});

// 5. 분실위치에서 부터 보호소까지 거리 구하기 -> 이 과정이 있어야지 등록이 됨 (근데 일괄적으로 모든 사용자에게 해야하는데 .. 분실 신고가 들어올때마다 .. ) -> lostRouter 에서 분실 등록 하자마자 자동으로 여길로 페이지 옮겨오도록 해야할듯
lostShelterRouter.post('/:lostId', loginRequired, async (req, res, next)=> {
    try {
        const lostId = req.params.lostId;
        const phoneNumber = await lostShelterService.getPhoneNumber(lostId);
        const shelters = await shelterService.getShelters();
        let shelterId ;
        let distance ;
        let newLostShelterPost ;

        for(let i = 0; i < shelters.length; i++) {
            shelterId = shelters[i]._id;
            distance = await lostShelterService.getDistance(lostId, shelterId);
            console.log(distance);
            if(distance < 100) { 
                newLostShelterPost = await lostShelterService.addLostShelter({
                    lostId,
                    shelterId,
                    phoneNumber,
                    distance,
                });
            }
        }
        res.status(200).json('success');
    } catch (error) {
        next(error);
    }
})

export { lostShelterRouter };