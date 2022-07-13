import { Router } from 'express';
import { shelterService } from '../services/ShelterService.js';
import { loginRequired, adminRequired } from '../middlewares/index.js';

const shelterRouter = Router();

// 1. 보호소 등록 -> 사용자가 등록하면 안됨
// 2-1. 전체 보호소 리스트 조회 
shelterRouter.get('/', async (req, res, next) => {
  try {
    const shelters = await shelterService.getShelters();
    res.status(200).json(shelters);
  }
  catch (error) {
    next(error);
  }
});

// 2-2. 페이지네이션 된 보호소 리스트 조회 (페이지네이션 적용)
shelterRouter.get('/shelters', async (req, res, next) => {
  try {
    // url 쿼리로부터 page 값 수신, 부재시 기본값 1
    const page = Number(req.query.page) || 1;

    // url 쿼리로부터 perRage 값 수신, 부재시 기본값 12
    const perPage = Number(req.query.perPage) || 12;
    
    // total(전체 정보 수 ), posts(현재 페이지에 있는 정보) 를 Promise.all 을 사용해 동시에 호출
    const [total, posts] = await Promise.all([
      await shelterService.countShelters(),
      await shelterService.getRangeShelters(page, perPage)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
    // 보호소 목록(배열), 현재 페이지, 전체 페이지 수, 전체 보호소 수 등 을 json 형태로 프론트에 전달
    res.status(200).json({ posts, page, perPage, totalPage, total });
  } catch (error) {
    next(error);
  }
  });

// 3. _id 이용 보호소 조회
shelterRouter.get('/:shelterId', async (req, res, next) => {
  try {
    const { shelterId } = req.params;
    const shelter = await shelterService.findShelter(shelterId);

    res.status(200).json(shelter);
  } catch (error) {
    next(error);
  }
});


// 4. code 이용 보호소 조회
shelterRouter.get('/code/:shelterCd', async (req, res, next) => {
  try {
    const { shelterCd } = req.params;
    const shelter = await shelterService.findShelterByCode(shelterCd);

    res.status(200).json(shelter);
  } catch (error) {
    next(error);
  }
}
);


export { shelterRouter };
