export interface Config {
    port: number;
    // key: string;
    // jwt: {
    //   ACCESS_TOKEN_SECRET: string;
    //   REFRESH_TOKEN_SECRET: string;
    //   REFRESH_TOKEN_EXPIRES_IN: string;
    //   ACCESS_TOKEN_EXPIRES_IN: string;
    // };
    database: {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
    };
    // bcrypt: {
    //   saltRounds: number;
    // };
    // google: {
    //   GOOGLE_CLIENT_ID: string;
    //   GOOGLE_CLIENT_SECRET: string;
    //   GOOGLE_REDIRECT_URI: string;
    // };
    // kakao: {
    //   KAKAO_CLIENT_ID: string;
    //   KAKAO_REDIRECT_URI: string;
    // };
    naver:{
        CLIENT_ID: string; 
        CLIENT_SECRET: string;
    }
    shop11st:{
        API_KEY: string;
    }
  }
  