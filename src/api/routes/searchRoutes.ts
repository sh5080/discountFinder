import { Router } from 'express';
import * as searchController from '../../controllers/searchController';
const router = Router();

// 스크랩
router.get('/scrap', searchController.getDataToScrap);

//쇼핑몰API
router.get('/naver/:keyword', searchController.getNaverShoppingData);
router.get('/11st/:keyword', searchController.get11stShoppingData);

export default router;
