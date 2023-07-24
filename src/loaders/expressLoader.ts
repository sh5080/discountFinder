import express, { Application } from 'express';

import cors from 'cors';
import { dbLoader } from './dbLoader';
import routeLoader from './routeLoader';
import { errorHandler } from '../api/middlewares/errorHandler';
import responseTime from '../api/middlewares/responseTime';

export default async function expressLoader(app: Application): Promise<Application> {
  try {
    const db = await dbLoader();
    const corsOptions = {
      origin: ['http://127.0.0.1:5500'],
      credentials: true,
    };
    app.use(responseTime)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors(corsOptions));

    app.set('db', db);

    routeLoader(app);
    app.use(errorHandler);

    return app;
  } catch (error) {
    console.error('Error occurred during Express loader initialization:', error);
    throw error;
  }
}
