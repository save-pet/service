import { Router } from 'express';
import { rescueService } from '../services/RescueService.js';
import { loginRequired } from '../middlewares/LoginRequired.js';
import { adminRequired } from '../middlewares/AdminRequired.js';

import is from '@sindresorhus/is';

const rescueRouter = Router();

// 1. 보호 동물 등록 -> 근데 api 사용해서 필요 없을 듯
// rescueRouter.post('/register',loginRequired, adminRequired,async (req, res, next) => {});

// 2. 페이지네이션 된 보호동물 리스트 조회 (페이지네이션 적용)
rescueRouter.get('/rescues', async (req, res, next) => {
  try {

    // url 쿼리로부터 page 값 수신, 부재시 기본값 1
    const page = Number(req.query.page) || 1;

    // url 쿼리로부터 perRage 값 수신, 부재시 기본값 12
    const perPage = Number(req.query.perPage) || 12;
    
    // total(전체 정보 수 ), posts(현재 페이지에 있는 정보) 를 Promise.all 을 사용해 동시에 호출
    const [total, posts] = await Promise.all([
      await rescueService.countRescue(),
      await rescueService.getRangeRescues(page, perPage)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
    // 구조 목록(배열), 현재 페이지, 전체 페이지 수, 전체 구조 수 등 을 json 형태로 프론트에 전달
    res.status(200).json({ posts, page, perPage, totalPage, total });
  } catch (error) {
    next(error);
  }
  });

// 3. Id 이용 단일 보호 동물 조회
rescueRouter.get('/:rescueId', async (req, res, next) => {
  try {
    const { rescueId } = req.params;
    const rescue = await rescueService.findRescue(rescueId);

    res.status(200).json(rescue);
  } catch (error) {
    next(error);
  }
});


// 4. 동일 보호소에 보호되고 있는 동물 조회
rescueRouter.get('/careCode/:careCode', async (req, res, next) => {
  try {
    const { careCode } = req.params;
    const rescues = await rescueService.findByCareCode(careCode);

    res.status(200).json(rescues);
  } catch (error) {
    next(error);
  }
}
);

// 5. 보호 동물 정보 수정 -> api 를 불러오기 때문에 수정할일 없음
// rescueRouter.patch( '/:rescueId', loginRequired, adminRequired, async (req, res, next) =>  {});
  

// 6. 특정 보호 동물 삭제
rescueRouter.delete('/:rescueId', loginRequired, adminRequired, async (req, res, next) =>{
    try {
      const {rescueId } = req.params;
      const result = await rescueService.removeRescue(rescueId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });



export { rescueRouter };
