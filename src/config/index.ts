import dotenv from 'dotenv';
import { Config } from '../types/config';

dotenv.config();
const getEnvNum = (key: string, defaultValue?: number) => {
    const value = Number(process.env[key]) ?? defaultValue;
  
    if (!value && value !== 0) {
      throw new Error(`${key} 환경 변수가 필요합니다.`);
    }
  
    return value;
  };
  const getEnvStr = (key: string, defaultValue?: string): string => {
    const value = process.env[key] ?? defaultValue;
  
    if (!value) {
      throw new Error(`${key} 환경 변수가 필요합니다.`);
    }
  
    return value;
  };
const config: Config = { 
    port:getEnvNum('PORT'), 
    // key:getEnvStr('key'), 
    database:{
        DB_HOST: getEnvStr('DB_HOST'),
        /** [데이터베이스] 데이터베이스 사용자 */
        DB_USER: getEnvStr('DB_USER'),
        /** [데이터베이스] 데이터베이스 비밀번호 */
        DB_PASSWORD: getEnvStr('DB_PASSWORD'),
        /** [데이터베이스] 데이터베이스 이름 */
        DB_NAME: getEnvStr('DB_NAME'),
    },

    naver:{CLIENT_ID: getEnvStr('NAVER_CLIENT_ID'), 
    CLIENT_SECRET: getEnvStr('NAVER_CLIENT_SECRET') 
},
shop11st:{
    API_KEY:getEnvStr('11st_API_KEY')

}
}

export default config
