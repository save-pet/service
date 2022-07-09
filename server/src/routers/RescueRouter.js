import { Router } from 'express';
import { rescueService } from '../services/RescueService.js';
import { loginRequired, adminRequired } from '../middlewares';

const rescueRouter = Router();

// 1. 보호 동물 등록
rescueRouter.post('/register', loginRequired, adminRequired, async (req, res, next) => {

});

// 2. 페이지네이션 된 보호동물 리스트 조회 (페이지네이션 적용)
rescueRouter.get('/rescues', async (req, res, next) => {

});

// 3. Id 이용 단일 보호동물 조회
rescueRouter.get('/:rescueId', async (req, res, next) => {

});

// 4. shelterId 이용 단일 보호동물 조회
rescueRouter.get('/shelter/:shelterId', async (req, res, next) =>{

});

// 5. 보호 동물 정보 수정
rescueRouter.patch('/:rescueId', loginRequired, adminRequired, async (req, res, next) =>{

});

// 6. 특정 보호 동물 삭제
rescueRouter.delete('/:rescueId', loginRequired, adminRequired, async (req, res, next) =>{

});

export { rescueRouter };