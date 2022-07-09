import { Router } from 'express';
import { shelterService } from '../services/ShelterService.js';
import { loginRequired, adminRequired } from '../middlewares';

const shelterRouter = Router();

// 1. 신규 보호소 등록
shelterRouter.post('/register', loginRequired, adminRequired, async(req, res, next) => {
    
});

// 2. 전체 보호소 조회
shelterRouter.get('shelters', async (req, res, next) => {

});

// 3. 보호소 id 이용, 단일 보호소 조회
shelterRouter.get('/:shelterId', async (req, res, next)=> {

});

// 4. 보호소 정보 수정
shelterRouter.patch('/:shelterId', loginRequired, adminRequired, async (req, res, next) => {

});

// 5. 특정 보호소 삭제
shelterRouter.delete('/:shelterId', async (req, res, next) => {

});

export { shelterRouter };