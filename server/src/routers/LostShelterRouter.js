import { Router } from 'express';
import { loginRequired, adminRequired } from '../middlewares/index.js';
import {
  lostService,
  userService,
  lostShelterService,
  shelterService,
} from '../services/index.js';

const lostShelterRouter = Router();

// 1.전체 목록 조회
lostShelterRouter.get(
  '/',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const lostShelters = await lostShelterService.getLostShelters();

      res.status(200).json(lostShelters);
    } catch (error) {
      next(error);
    }
  },
);

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
lostShelterRouter.get(
  '/shelter/:shelterId',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const shelterId = req.params.shelterId;
      const postsByShelter = await lostShelterService.getLostShelterByShelter(
        shelterId,
      );
      res.status(200).json(postsByShelter);
    } catch (error) {
      next(error);
    }
  },
);

// 4. 특정 보호소 code 기준으로 목록 불러오기
lostShelterRouter.get(
  '/shelter-code/:careCode',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      const careCode = req.params.careCode;
      const postsByShelterCode =
        await lostShelterService.getLostShelterByShelterCode(careCode);
      res.status(200).json(postsByShelterCode);
    } catch (error) {
      next(error);
    }
  },
);

export { lostShelterRouter };
