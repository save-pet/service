import { userModel } from '../db/models/UserModel.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 1. 회원가입
  async addUser(userInfo) {
    const { id, fullName, phoneNumber, password, role } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findById(id);
    if (user) {
      throw new Error(
        '이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요.'
      );
    }

    // 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { fullName, id, phoneNumber, password: hashedPassword, role };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);
    return createdNewUser;
  }

  // 2. 로그인
  async getUserToken(loginInfo) {
    const { id, password } = loginInfo;

    // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error(
        '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번째는 db에 있던 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    // 2개 프로퍼티를 JWT 토큰에 담음
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.fullName,
        id: user.id,
      },
      secretKey,
    );

    return { token };
  }

  // 3. 사용자 목록을 받음.
  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  async getUserByautoId(userId) {
    const users = await this.userModel.findByautoId(userId);
    return users;
  }

  async getUserById(id) {
    const user = await this.userModel.findById(id);
    return user;
  }

  // 4. 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findByautoId(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함
    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  // 5. user 탈퇴
  async delUser(userInfoRequired) {
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findByautoId(userId);
    
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 회원탈퇴 진행
    user = await this.userModel.del(userId);
    return 'Deleted User Successfully';
  }
}

const userService = new UserService(userModel);

export { userService };
