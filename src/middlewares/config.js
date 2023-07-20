import dotenv from 'dotenv';

dotenv.config();
export const { PORT, KEY, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } = process.env;
