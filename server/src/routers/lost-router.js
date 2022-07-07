import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired, adminRequired } from '../middlewares/index.js';
import { lostService } from '../services/index.js';

// 이미지 업로드시 필요 모듈 ES6문법으로 변환
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs';

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
lostRouter.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const lostPost = await lostService.getLostByEmail(email);
    res.status(200).json(lostPost);
  } catch (error) {
    next(error);
  }
});

// 3. 분실번호 분실 글 목록 조회 (shortId로 조회)
lostRouter.get('/:id', async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const lostPost = await lostService.getLostById(shortId);
    res.status(200).json(lostPost);
  } catch (error) {
    next(error);
  }
});

// 상품 등록(이미지)
// lostRouter.post(
//   '/upload',
//   loginRequired,
//   adminRequired,
//   asyncHandler(async function (req, res, next) {
//     const form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         next(err);
//         return;
//       }

//       const file = files.image; // key를 image로 지정하고 파일을 보내줬기 때문에 files.image로 파일을 가져옴
//       const dir = `public`;
//       !fs.existsSync(dir) && fs.mkdirSync(dir);
//       const newPath = path.join(
//         __dirname,
//         '..',
//         `${dir}/${file.originalFilename}`,
//       ); //__dirname : 현재경로 가져오기
//       fs.renameSync(file.filepath, newPath); //파일명 변경 : fs.renameSync(이전경로, 현재경로)
//       res.json({ result: `${file.originalFilename}` });
//     });
//   }),
// );

// 5. 분실 글 등록
lostRouter.post('/post', async (req, res, next) => {
  if (is.emptyObject(req.body)) {
    throw new Error(
      'headers의 Content-Type을 application/json으로 설정해주세요',
    );
  }

  try {
    const {
      email,
      fullName,
      animalName,
      lostDate,
      address,
      phoneNumber1,
      phoneNumber2,
      detail,
      image,
    } = req.body;

    // 전화번호 형식 검사하는 validator

    const newLostPost = await lostService.addLostPost({
      email,
      fullName,
      animalName,
      lostDate,
      address,
      phoneNumber1,
      phoneNumber2,
      detail,
      image,
    });

    res.status(200).json(newLostPost);
  } catch (error) {
    next(error);
  }
});

// 6. 분실 게시글 수정 (shortId로 게시글 불러옴)
lostRouter.patch('/edit/:id', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const { lostShortId } = req.params;
    if (!lostShortId) {
      throw new Error(
        '해당 게시글이 존재하지 않습니다. 게시글 shortId를 다시 확인해주세요.',
      );
    }
    const {
      email,
      fullName,
      animalName,
      lostDate,
      address,
      phoneNumber1,
      phoneNumber2,
      detail,
      image,
    } = req.body;

    // 전화번호랑 날짜 형식 validator 만들기
    const toUpdate = {
      ...(email && { email }),
      ...(fullName && { fullName }),
      ...(animalName && { animalName }),
      ...(lostDate && { lostDate }),
      ...(address && { address }),
      ...(phoneNumber1 && { phoneNumber1 }),
      ...(phoneNumber2 && { phoneNumber2 }),
      ...(detail && { detail }),
      ...(image && { image }),
    };

    const updatedLost = await lostService.updateLost(lostShortId, toUpdate);

    res.status(201).json(updatedLost);
  } catch (error) {
    next(error);
  }
});

// 분실 글 삭제("id에 shortId가 들어가야됨")
lostRouter.delete('/delete/:id', adminRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }
    const { shortId } = req.params;
    if (!shortId) {
      throw new Error('해당하는 글이 없습니다. 게시글 id를 다시 확인해주세요');
    }

    await lostService.deleteLost(shortId);

    res.status(200).json({ message: '상품이 삭제되었습니다' });
  } catch (error) {
    next(error);
  }
});

export { lostRouter };
