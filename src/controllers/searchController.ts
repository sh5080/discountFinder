import { load } from 'cheerio';
import axios from 'axios';
import config from '../config/index';
import { CustomRequest } from '../types/customRequest';
import { Request,Response,NextFunction } from 'express';
const { CLIENT_ID, CLIENT_SECRET } = config.naver;
const { API_KEY } = config.shop11st;
export const getDataToScrap = async(req:Request, res:Response, next:NextFunction)=> {
  try {
    // 웹 페이지에 HTTP GET 요청
    const { keyword } = req.params; //검색어
    const response = await axios.get(`https://search.shopping.naver.com/search/all?query=${keyword}`); // 크롤링하려는 웹 페이지 URL

    // 응답 데이터에서 HTML 추출
    const html = response.data;

    // cheerio의 load 함수를 사용하여 HTML을 파싱
    const $ = load(html);

    const result = $('span.filter_text_over__iesoO').text();
    // console.log('검색결과', result);

    res.json();
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
}

export const getNaverShoppingData = async(req:Request, res:Response, next:NextFunction)=> {
  try {
    const API_URL = 'https://openapi.naver.com/v1/search/shop.json';
    const { keyword } = req.params;
    console.log(keyword);
    const response = await axios.get(API_URL, {
      params: {
        query: keyword,
        display: 10, // 검색 결과 개수 설정 (최대 100개)
      },
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Client-Secret': CLIENT_SECRET,
      },
    });

    const result = response.data.items;

    res.json();
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
}

export async function get11stShoppingData(req:Request, res:Response, next:NextFunction) {
  try {
    const { keyword } = req.params; //검색어
    const apiUrl = `https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${API_KEY}&apiCode=ProductSearch&keyword=${keyword}`;

    const response = await axios.get(apiUrl);
    const products = response.data.ProductSearchResponse.Products.Product;

    // 가공된 데이터를 클라이언트에 응답
    res.json();
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
}
