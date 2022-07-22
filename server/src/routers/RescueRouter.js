import { Router } from 'express';
import { rescueService } from '../services/RescueService.js';
import { loginRequired, adminRequired } from '../middlewares/index.js';

const rescueRouter = Router();

// 1. 보호 동물 등록 -> openApi 사용해서 필요없음

// 2-0. 페이지네이션 하지 않고 보호동물 리스트 전체 조회
rescueRouter.get('/', async (req, res, next) => {
  try {
    const rescues = await rescueService.getRescues();
    res.status(200).json(rescues);
  } catch(error){
    next(error);
  }
});

// 2. 페이지네이션 된 보호동물 리스트 조회
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

// 2-1. 개체별 페이지네이션 된 보호동물 리스트 조회
rescueRouter.get('/rescues/:kindCode', async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 12;
    const kindCode = Number(req.params.kindCode);

    const [total, posts] = await Promise.all([
      await rescueService.countRescueByKind(kindCode),
      await rescueService.getRangeRescuesByKind(page, perPage, kindCode)
    ]);
    
    const totalPage = Math.ceil(total / perPage);
    
    res.status(200).json({ posts, page, perPage, totalPage, total });
  } catch(error) {
    next(error);
  }
})

// 2-2. 개체 다중 선택, 후 페이지네이션 해 리스트 조회
rescueRouter.get('/rescues/kind/:dog/:cat/:etc', async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 12;
    const dog = Number(req.params.dog) || 0; // 0은 선택 안된걸로 간주, 1은 선택 된걸로 간주
    const cat = Number(req.params.cat) || 0; 
    const etc = Number(req.params.etc) || 0;

    const kindCode = dog + cat + etc;

    if (kindCode === 0 ){ 
      const [total, posts] = await Promise.all([
        await rescueService.countRescue(),
        await rescueService.getRangeRescues(page, perPage)
      ]);
      const totalPage = Math.ceil(total / perPage);
      res.status(200).json({ posts, page, perPage, totalPage, total });    
     } else {
      let total = 0;
      const posts = [];
      if(dog === 1){
        const [dogTotal, dogPosts] = await Promise.all([
          await rescueService.countRescueByKind(0),
          await rescueService.getRangeRescuesByKind(page, perPage, 0)
        ]);
        total += dogTotal;
        posts.push(...dogPosts);
      }
      if(cat === 1){
        const [catTotal, catPosts] = await Promise.all([
          await rescueService.countRescueByKind(1),
          await rescueService.getRangeRescuesByKind(page, perPage, 1)
        ]);
        total += catTotal;
        posts.push(...catPosts);
      }
      if(etc === 1){
        const [etcTotal, etcPosts] = await Promise.all([
          await rescueService.countRescueByKind(2),
          await rescueService.getRangeRescuesByKind(page, perPage, 2)
        ]);
        total += etcTotal;
        posts.push(...etcPosts);
      }

      const totalPage = Math.ceil(total / perPage);
      res.status(200).json({ posts, page, perPage, totalPage, total });    
    }
  } catch(error) {
    next(error);
  }
});

// 3. _id 이용 단일 보호 동물 조회
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
rescueRouter.get('/care-code/:careCode', async (req, res, next) => {
  try {
    const { careCode } = req.params;
    const rescues = await rescueService.findByCareCode(careCode);

    res.status(200).json(rescues);
  } catch (error) {
    next(error);
  }
}
);

// 4-2. 보호소에 보호되고 있는 동물수 조회
rescueRouter.get('/care-code/count/:careCode', async (req, res, next) => {
  try {
    const { careCode } = req.params;
    const rescueCount = await rescueService.findCountByCareCode(careCode);

    res.status(200).json(rescueCount);
  } catch (error) {
    next(error);
  }
}
);

// 5. 보호 동물 정보 수정 -> api 를 불러오기 때문에 수정할일 없음
  

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
