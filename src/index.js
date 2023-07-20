import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { errorHandler } from './middlewares/errorHandler.js';
import searchRoutes from './routers/searchRoutes.js';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT } from './middlewares/config.js';

const app = express();

//db 연결
export let db;
export const dbLoader = async () => {
  if (db) {
    return db;
  }
  try {
    db = await mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });
    console.log('Cloud SQL server connection successful');
    return db;
  } catch (error) {
    console.error('Failed to establish connection to the Cloud SQL server:', error);
    throw error;
  }
};
async function startServer() {
  try {
    await dbLoader();

    // 미들웨어 및 라우터 설정
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //cors 설정
    app.use(
      cors({
        origin: ['http://localhost:5500'],
        credentials: true,
      })
    );

    app.set(db);

    app.use('/search', searchRoutes);

    app.use(errorHandler);

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}
startServer();
