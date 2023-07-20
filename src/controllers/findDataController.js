import { load } from 'cheerio';
import axios from 'axios';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from '../middlewares/config.js';
export async function getDataToScrap(req, res, next) {
  try {
    // 웹 페이지에 HTTP GET 요청
    const { search } = req.body; //검색어
    const response = await axios.get(`https://search.shopping.naver.com/search/all?query=${search}`); // 크롤링하려는 웹 페이지 URL

    // 응답 데이터에서 HTML 추출
    const html = response.data;

    // cheerio의 load 함수를 사용하여 HTML을 파싱
    const $ = load(html);

    const result = $('span.filter_text_over__iesoO').text();
    // console.log('검색결과', result);

    res.json({ result: result });
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
}

export async function getNaverShoppingData(req, res, next) {
  try {
    const API_URL = 'https://openapi.naver.com/v1/search/shop.json';
    const { search } = req.body;
    console.log(search);
    const response = await axios.get(API_URL, {
      params: {
        query: search,
        display: 10, // 검색 결과 개수 설정 (최대 100개)
      },
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });

    const result = response.data.items;

    res.json({ result: result });
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
}
