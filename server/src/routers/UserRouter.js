import { request, Router } from 'express';
import is from '@sindresorhus/is';

import { loginRequired } from '../middlewares/LoginRequired.js';
import { userService } from '../services/UserService.js';

const userRouter = Router();

// 1-1. 관리자(admin-user) 등록
userRouter.post('/admin', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const fullName = req.body.fullName;
    const id = req.body.id;
    const password = req.body.password;

    const newUser = await userService.addUser({
      fullName,
      id,
      password,
      role: 'admin-user',
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 1-2. 일반 회원(basic-user) 등록
userRouter.post('/register', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const fullName = req.body.fullName;
    const id = req.body.id;
    const password = req.body.password;

    const newUser = await userService.addUser({
      fullName,
      id,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 2. 로그인 구현
userRouter.post('/login', async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const id = req.body.id;
    const password = req.body.password;

    const userToken = await userService.getUserToken({ id, password });

    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

// 3. 전체 유저 목록 반환 (배열 형태)
userRouter.get('/users', loginRequired, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// 3-1. 전체 사용자 수 반환
userRouter.get('/numbers', loginRequired, async (req, res, next) => {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();
    const totalusers = users.length;

    res.status(200).json(totalusers);
  } catch (error) {
    next(error);
  }
});

// 4. 회원 정보 반환
userRouter.get('/', loginRequired, async (req, res, next) => {
  try {
    const user = await userService.getUser(req.currentUserId);
    const { id, fullName, role, _id, address, phoneNumber, password } = user;
    const toSend = {
      ...(id && { id }),
      ...(fullName && { fullName }),
      ...(_id && { _id }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    res.status(200).json(toSend);
  } catch (error) {
    next(error);
  }
});

// 5. 사용자 정보 수정 (여기서 userId 는 _id 를 의미)
userRouter.patch('/:userId', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const userId = req.params.userId;
    const id = req.body.id;
    const fullName = req.body.fullName;
    const password = req.body.password;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const role = req.body.role;
    const currentPassword = req.body.currentPassword;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };

    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address && { address: address }),
      ...(phoneNumber && { phoneNumber: phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );
    
    if (password) {
      const userToken = await userService.getUserToken({ id, password });
      res.status(200).json(userToken);
    } else{
      const userToken1 = await userService.getUserToken({ id, password: currentPassword });
      res.status(200).json(userToken1);
    }
  } catch (error) {
    next(error);
  }
});

// 6. 사용자 탈퇴
userRouter.delete('/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { currentPassword } = req.body;
    const result = await userService.delUser({ userId, currentPassword });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
