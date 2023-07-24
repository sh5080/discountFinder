import express from 'express';
import { getDataToScrap, getNaverShoppingData, get11stShoppingData } from '../../controllers/searchController';
const router = express.Router();

// 스크랩
router.get('/scrap', getDataToScrap);

//naverAPI
router.get('/naver/:keyword', getNaverShoppingData);
router.get('/11st/:keyword', get11stShoppingData);

export default router;
