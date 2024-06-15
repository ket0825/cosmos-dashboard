import axios, { AxiosResponse, AxiosError } from 'axios';


// const DEBUG=true;
const DEBUG=false;
console.log(`DEBUG: ${DEBUG}`);

// 이후에 사용할 수도 있는 함수
// const postRequest = async(url:string, data:any, timeout:number=5000): Promise<[string | null, number | null]> => {
//     return new Promise((resolve) => {
//         axios.post(url, data, {timeout: timeout})
//             .then((response) => {
//                 if (DEBUG) console.log(response);
//                 resolve([response.data, response.status]);
//             })
//             .catch((error) => {
//                 if (DEBUG) console.log(error);
//                 resolve([error.message, null]);
//             });
//     });
// }

const getRequest = async(url:string, 
    params:ReqCategoryType | ReqProductHistoryType | ReqProductType | ReqReviewType | ReqTopicType | null, 
    timeout:number=5000): Promise<CategoryType[] | ProductType[] | ProductHistoryType[] | ReviewType[] | TopicType[] | KanoData[] |
                          PolarizedData[] | null
    > => {
    let retryCount = 0;
    if (DEBUG) {
        retryCount = 4;
        console.info("DEBUG MODE");
    }
    let msg = "";
    while (retryCount < 5) {
        try {
            const res:AxiosResponse = await axios.get(url, {
                params: params?? {}, 
                timeout: timeout
            });
            if (res.data) {
                return res.data;
            }            
        } catch (error) {
            if (error instanceof AxiosError && error.code === 'ECONNABORTED') {
                if (DEBUG)
                console.error(`[ERROR] Timeout at ${url}. Retry count: ${retryCount}`);
            
                msg = error.message;            
            
            } else {
                if (DEBUG && (error instanceof Error || error instanceof AxiosError)) 
                console.log(`[ERROR] Error at ${url}.\nError log:${error.message}`);            
                if (error instanceof Error || error instanceof AxiosError) 
                msg = error.message;            
            }
            
            retryCount += 1;
        }
    }

    console.info(`[ERROR] Could not get request at ${url}. Retry count: ${retryCount}. Error message: ${msg}`);
    return null;    
}

export const fetchProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw error;
        }
    }
}

class RouteHandler {
  private _stage: string;
  private _url: string;

  constructor(stage: string, url: string) {
    this._stage = stage;
    this._url = url;
  }
  
  stage(): string {
    return this._stage;
  }

  async getProduct(prid?: string, matchNvMid?: string, sCategory?: string, caid?: string): Promise<ProductType[] | null> {
    let url:string = `${this._url}/product`;
    let suffixUrl = '';

    if (prid && typeof prid === 'string') {
      suffixUrl += `/${prid}`;
    }
    if (matchNvMid && typeof matchNvMid === 'string') {
      suffixUrl += `?match_nv_mid=${matchNvMid}&`;
    }

    if (caid && typeof caid === 'string') {
      suffixUrl += `?caid=${caid}&`;
    } else if (sCategory && typeof sCategory === 'string') {
      suffixUrl += `?s_category=${sCategory}&`;
    }

    suffixUrl = suffixUrl.replace(/&$/, '');
    const res = await getRequest(`${url}${suffixUrl}`, null, 3);

    return res as ProductType[] | null;
  }

  async getProductHistory(caid?: string, prid?: string, countDesc?: number): Promise<ProductHistoryType[] | null> {
    let url = `${this._url}/product_history`;
    let suffixUrl = '';

    if (caid && typeof caid === 'string') {
      suffixUrl += `?caid=${caid}&`;
    }
    if (prid && typeof prid === 'string') {
      suffixUrl += `?prid=${prid}&`;
    }
    if (countDesc && typeof countDesc === 'number') {
      suffixUrl += `?count_desc=${countDesc}&`;
    }

    suffixUrl = suffixUrl.replace(/&$/, '');
    const res = await getRequest(`${url}${suffixUrl}`, null, 1000);

    return res as ProductHistoryType[] | null;
  }

  async getCategory(caid?: string, sCategory?: string, mCategory?: string): Promise<CategoryType[]> {
    let url = `${this._url}/category`;
    let suffixUrl = '';

    if (caid && typeof caid === 'string') {
      suffixUrl += `/${caid}`;
    }
    if (sCategory && typeof sCategory === 'string') {
      suffixUrl += `?s_category=${sCategory}&`;
    }
    if (mCategory && typeof mCategory === 'string') {
      suffixUrl += `?m_cateogry=${mCategory}&`;
    }

    suffixUrl = suffixUrl.replace(/&$/, '');

    const res = await getRequest(`${url}${suffixUrl}`, null, 1000);
    return res as CategoryType[];
  }

  async getReview(caid: string, prid?: string, reid?: string): Promise<ReviewType[] | null> {
    let url = `${this._url}/category`;
    let suffixUrl = '';

    suffixUrl += `/${caid}`;
    if (prid && typeof prid === 'string') {
      suffixUrl += `?prid=${prid}&`;
    }
    if (reid && typeof reid === 'string') {
      suffixUrl += `?reid=${reid}&`;
    }

    suffixUrl = suffixUrl.replace(/&$/, '');
    const res = await getRequest(`${url}${suffixUrl}`, null, 3);

    return res as ReviewType[] | null;
  }

    async getTopicByType(
      type: string,
      reid?: string,
      caid?: string,
      prid?: string,
      topicCode?: string,
      topicScore?: string,
      positiveYn?: string,
      sentimentScale?: string
    ): Promise<TopicType[]> {
    let url = `${this._url}/topic`;
    let suffixUrl = `?type=${type}&`;    

    if (reid && typeof reid === 'string') {
      suffixUrl += `reid=${reid}&`;
    }
    if (caid && typeof caid === 'string') {
      suffixUrl += `caid=${caid}&`;
    }
    if (prid && typeof prid === 'string') {
      suffixUrl += `prid=${prid}&`;
    }
    if (topicCode && typeof topicCode === 'string') {
      suffixUrl += `topic_code=${topicCode}&`;
    }
    if (topicScore && typeof topicScore === 'string') {
      suffixUrl += `topic_score=${topicScore}&`;
    }    
    if (positiveYn && typeof positiveYn === 'string') {
      suffixUrl += `positive_yn=${positiveYn}&`;
    }
    if (sentimentScale && typeof sentimentScale === 'string') {
      suffixUrl += `sentiment_scale=${sentimentScale}&`;
    }

    suffixUrl = suffixUrl.replace(/&$/, '');
    console.log(`url: ${url}${suffixUrl}`)
    const res = await getRequest(`${url}${suffixUrl}`, null, 150000);

    return res as TopicType[];
  }

  async getKanoModelData(
      type: string,
      caid?: string,
    ): Promise<KanoData[]> {
    let url = `${this._url}/topic/kano_model`;
    let suffixUrl = `?type=${type}&caid=${caid}`;    
    
    console.log(`url: ${url}${suffixUrl}`)
    const res = await getRequest(`${url}${suffixUrl}`, null, 150000);

    return res as KanoData[];
  }

  async getPolarizedData(
    type: string,
    caid?: string,
  ): Promise<PolarizedData[]> {
    let url = `${this._url}/topic/polarized`;
    let suffixUrl = `?type=${type}&caid=${caid}`;        
    console.log(`url: ${url}${suffixUrl}`)
    const res = await getRequest(`${url}${suffixUrl}`, null, 150000);
    return res as PolarizedData[];
  }
}

export default RouteHandler;

// Usage example
// import {apiUrl, stage} from '../settings.ts';
// const routeHandler = new RouteHandler(apiUrl, stage);
// console.log(routeHandler.getTopicByReid("R01", "C02", "P01"));