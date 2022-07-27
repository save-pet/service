/* eslint-disable no-await-in-loop */
import { Router } from 'express';
import { loginRequired, checkEmpty } from '../middlewares/index.js';
import {
  lostService,
  userService,
  lostShelterService,
  shelterService,
} from '../services/index.js';

// 이미지 업로드시 필요 모듈 ES6문법으로 변환
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

const lostRouter = Router();

// 1.전체 분실 글 목록 조회
lostRouter.get('/', async (req, res, next) => {
  try {
    const losts = await lostService.getLosts();

    res.status(200).json(losts);
  } catch (error) {
    next(error);
  }
});

// 2. 사용자가 작성한 분실 글 조회
lostRouter.get('/user', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const user = await userService.getUserByautoId(userId);
    if (!user) {
      throw new Error('등록된 글이 없습니다/ ');
    }

    const lostPost = await lostService.getLostById(userId);

    res.status(200).json(lostPost);
  } catch (error) {
    next(error);
  }
});

// 3. 분실번호 분실 글 목록 조회 (shortId로 조회)
lostRouter.get('/:shortid', async (req, res, next) => {
  try {
    const { shortid } = req.params;
    const lostPost = await lostService.getLostByShortId(shortid);
    res.status(200).json(lostPost);
  } catch (error) {
    next(error);
  }
});

// 4. 분실 글 이미지 저장 (저장 후 파일명만 프론트로 전달)
lostRouter.post('/upload', loginRequired, async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const file = files.image; // key를 image로 지정하고 파일을 보내줬기 때문에 files.image로 파일을 가져옴
    const dir = `public`;
    !fs.existsSync(dir) && fs.mkdirSync(dir); // 'public' dir이 없으면 새로
    const __dirname = path.resolve(); // ReferenceError 방지
    const newPath = path.join(
      __dirname,
      '/.',
      `${dir}/${file.originalFilename}`,
    ); // __dirname : 현재경로 가져오기
    fs.renameSync(file.filepath, newPath); // 파일명 변경 : fs.renameSync(이전경로, 현재경로)
    res.json({ result: `${file.originalFilename}` });
  });
});

// 5. 분실 글 등록
lostRouter.post('/post', loginRequired, checkEmpty, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    let radius = 30;
    const {
      animalName,
      lostDate,
      address,
      detail,
      image,
      processState,
      latitude,
      longitude,
    } = req.body;
    radius = Number(req.body.radius);

    const newLostPost = await lostService.addLostPost({
      userId,
      animalName,
      lostDate,
      address,
      detail,
      radius,
      image,
      processState,
      latitude,
      longitude,
    });

    const lostId = newLostPost._id;
    const phoneNumber = await lostShelterService.getPhoneNumber(lostId);
    const shelters = await shelterService.getShelters();
    let shelterId;
    let shelterCode;
    let distance;

    for (let cnt = 0; cnt < shelters.length; cnt += 1) {
      shelterId = shelters[cnt]._id;
      shelterCode = shelters[cnt].careCode;
      distance = await lostShelterService.getDistance(lostId, shelterId);
      if (distance < radius) {
        const newLostShelterPost = await lostShelterService.addLostShelter({
          lostId,
          shelterId,
          careCode: shelterCode,
          phoneNumber,
          distance,
        });
      }
    }
    res.status(200).json(newLostPost);
  } catch (error) {
    next(error);
  }
});

// 6. 분실 게시글 수정 (shortId로 게시글 불러옴)
lostRouter.patch(
  '/edit/:shortid',
  loginRequired,
  checkEmpty,
  async (req, res, next) => {
    try {
      const { shortid } = req.params;
      if (!shortid) {
        throw new Error(
          '해당 게시글이 존재하지 않습니다. 게시글 shortId를 다시 확인해주세요.',
        );
      }

      const userId = req.currentUserId;
      const {
        animalName,
        lostDate,
        address,
        detail,
        image,
        processState,
        latitude,
        longitude,
        radius,
      } = req.body;

      // 전화번호랑 날짜 형식 validator 만들기
      const toUpdate = {
        ...(userId && { userId }),
        ...(animalName && { animalName }),
        ...(lostDate && { lostDate }),
        ...(address && { address }),
        ...(detail && { detail }),
        ...(image && { image }),
        ...(processState && { processState }),
        ...(latitude && { latitude }),
        ...(longitude && { longitude }),
        ...(radius && { radius }),
      };

      const updatedLost = await lostService.updateLost(shortid, toUpdate);

      res.status(201).json(updatedLost);
    } catch (error) {
      next(error);
    }
  },
);

// 분실 글 삭제("id에 shortId가 들어가야됨") adminRequired,
lostRouter.delete('/delete/:shortid', async (req, res, next) => {
  try {
    const { shortid } = req.params;
    if (!shortid) {
      throw new Error('해당하는 글이 없습니다. 게시글 id를 다시 확인해주세요');
    }

    await lostService.deleteLost(shortid);

    res
      .status(200)
      .json({ data: shortid, message: '게시글이 삭제 되었습니다.' });
  } catch (error) {
    next(error);
  }
});

export { lostRouter };
