import express from 'express';
import { getDataToScrap, getNaverShoppingData } from '../controllers/findDataController.js';
const router = express.Router();

// 스크랩
router.get('/scrap', getDataToScrap);

//naverAPI
router.get('/naverAPI', getNaverShoppingData);

export default router;
