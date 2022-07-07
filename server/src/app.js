import express from 'express';
import cors from 'cors';
import { userRouter, lostRouter } from './routers/index.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

// app을 통해 웹서버를 실행할 listen 함수
app.listen(5000, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:5000`);
});

app.use('/api/user', userRouter);
app.use('/api/lost', lostRouter);

app.get('/', (req, res) => {
  // 요청패스에 대한 콜백함수를 넣어줍니다.
  res.send('hello');
});

app.use(errorHandler);

export { app };
