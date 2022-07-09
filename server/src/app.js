import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routers/UserRouter.js';
import { shelterRouter } from './routers/ShelterRouter.js';
import { rescueRouter } from './routers/RescueRouter.js';
import { errorHandler } from './middlewares/ErrorHandler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

const DB_URL =
process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n.env 파일도 필요합니다.\n';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log(`정상적으로 MongoDB 서버에 연결되었습니다.  ${DB_URL}`)
);
db.on('error', (error) =>
  console.error(`\nMongoDB 연결에 실패하였습니다...\n${  DB_URL  }\n${  error}`)
);

app.get('/', (req, res) => {
  // 요청패스에 대한 콜백함수를 넣어줍니다.
  res.send('hello');
});

// app을 통해 웹서버를 실행할 listen 함수
app.listen(5000, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:5000`);
});

app.use('/api/user', userRouter);
app.use('/api/shelter', shelterRouter);
app.use('/api/rescue', rescueRouter);

app.use(errorHandler);

export { app };
