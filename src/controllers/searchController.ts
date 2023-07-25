import { load } from 'cheerio';
import axios from 'axios';
import config from '../config/index';
import { CustomRequest } from '../types/customRequest';
import { Request,Response,NextFunction } from 'express';
import { parseString } from 'xml2js';
import iconv from 'iconv-lite';

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
    const { page, pageSize } = req.query;
    const start = (Number(page)) * Number(pageSize);
    const response = await axios.get(API_URL, {
      params: {
        query: keyword,
        display: pageSize, // 페이지당 결과 개수를 pageSize로 설정
        start: start, // start 파라미터 추가
      },
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    });
    const result = response.data.items;
    // const links = await getLink(result);

    // console.log('1:', links)
    // const realLink = await getCrUrls(links)
    // res.json(links);
    res.json(result);
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
}
const getLink = async (items: string[]) => {
  try {
    const links = items.map((item: string) => item.link);
    console.log('링크 추출 결과:', links);
    return links;
  } catch (error) {
    console.error('Error while getting links:', error);
    return { error };
  }
};

const getCrUrls = async (links:any) => {
  const crUrls = [];
  for (const link of links) {
    try {
      const response = await axios.get(link);
      const html = response.data;
      const $ = load(html);

      // 링크 안의 crUrl 값을 가져옵니다.
      const crUrl = $('meta[property="og:url"]').attr('content');
      if (crUrl) {
        crUrls.push(crUrl);
      }
    } catch (error) {
      console.error(`링크(${link})의 데이터를 가져오거나 파싱하는 중 오류가 발생했습니다:`, error);
    }
  }
  console.log('2: ',crUrls)
  return crUrls;
};




// export const get11stShoppingData = async(req:Request, res:Response, next:NextFunction) =>{
//   try {
//     const { keyword } = req.params; //검색어
//     const apiUrl = `https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${API_KEY}&apiCode=ProductSearch&keyword=${keyword}`;

//     const response = await axios.get(apiUrl);
//     parseString(response.data, (err, result) => {
//       if (err) {
//         console.error('Error while parsing XML:', err);
//         next(err);
//       } else {
//         const products = result.ProductSearchResponse.Products[0].Product;

//         console.log(products);

//         res.setHeader('Content-Type', 'application/json; charset=utf-8');
//         res.json(products);
//       }
//     });
//   } catch (error) {
//     console.error('Error while fetching data:', error);
//     next(error);
//   }
// }
export const get11stShoppingData = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { keyword } = req.params; //검색어
    const apiUrl = `https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=${API_KEY}&apiCode=ProductSearch&keyword=${keyword}`;

    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer', // 인코딩을 위해 responseType 설정
    });

    // 응답 데이터를 EUC-KR 인코딩에서 UTF-8로 변환하여 파싱
    const utf8ResponseData = iconv.decode(response.data, 'EUC-KR');
    parseString(utf8ResponseData, (err, result) => {
      if (err) {
        console.error('Error while parsing XML:', err);
        next(err);
      } else {
        const products = result.ProductSearchResponse.Products[0].Product;

        // UTF-8 인코딩으로 데이터 전달
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.json(products);
      }
    });
  } catch (error) {
    console.error('Error while fetching data:', error);
    next(error);
  }
};
