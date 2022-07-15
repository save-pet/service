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
lostShelterRouter.get('/shelter/:shelterId', loginRequired, adminRequired, async (req, res, next) => {
  try {
    const shelterId = req.params.shelterId;
    const postsByShelter = await lostShelterService.getLostShelterByShelter(shelterId);
    res.status(200).json(postsByShelter);
  } catch (error) {
    next(error);
  }
});

// 5. 분실위치에서 부터 보호소까지 거리 구하기 -> lostRouter 에서 구현
// lostShelterRouter.post('/:lostId', loginRequired, async (req, res, next)=> {
//     try {
//       const lostId = req.params.lostId;
//       let radius = 50; // 혹시 입력받지 않으면 기본값
//       radius = req.body.radius; // !!!!
//       const phoneNumber = await lostShelterService.getPhoneNumber(lostId);
//       const shelters = await shelterService.getShelters();
//       let shelterId ;
//       let distance ;
//       let newLostShelterPost ;

//       for(let i = 0; i < shelters.length; i++) {
//           shelterId = shelters[i]._id;
//           distance = await lostShelterService.getDistance(lostId, shelterId);
//           if(distance < radius) { 
//               newLostShelterPost = await lostShelterService.addLostShelter({
//                   lostId,
//                   shelterId,
//                   phoneNumber,
//                   distance,
//               });
//           }
//       }
//       res.status(200).json('success');
//     } catch (error) {
//         next(error);
//     }
// })

export { lostShelterRouter };