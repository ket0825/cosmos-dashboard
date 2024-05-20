import axios, { AxiosResponse, AxiosError } from 'axios';

const DEBUG=true;

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
    timeout:number=5000): Promise<[CategoryType | ProductType | ProductHistoryType | ReviewType | TopicType | 
        [string, number]
    ]> => {
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

    console.info(`[ERROR] Failed to fetch data from ${url}`);
    return [msg, 500];

    
}

class RouteHandler {
    constructor() {
        
    }
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


/**
 * const DEBUG = true;

interface Response {
  text(): Promise<string>;
  json(): Promise<any>;
  status: number;
}

async function deleteRequest(url: string, timeout = 1): Promise<[string | null, number | null]> {
  let retryCount = 0;
  if (DEBUG) {
    retryCount = 4;
    console.info("DEBUG MODE");
  }

  while (retryCount < 5) {
    try {
      const res: Response = await fetch(url, { method: 'DELETE', timeout: timeout });
      if (res.status) {
        return [await res.text(), res.status];
      }
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(`[ERROR] Timeout at ${url}. Retry count: ${retryCount}`);
        retryCount++;
      } else {
        console.error(`[ERROR] Error at ${url}.\nError log: ${e}`);
        return [null, null];
      }
    }
  }

  console.info(`[ERROR] Could not delete request at ${url}. Retry count: ${retryCount}`);
  return [null, null];
}

async function postRequest(url: string, data: any, timeout = 1): Promise<[string | null, number | null]> {
  let retryCount = 0;
  if (DEBUG) {
    retryCount = 4;
    console.info("DEBUG MODE");
  }

  while (retryCount < 5) {
    try {
      const res: Response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), timeout: timeout });
      if (res.status) {
        return [await res.text(), res.status];
      }
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(`[ERROR] Timeout at ${url}. Retry count: ${retryCount}`);
        retryCount++;
      } else {
        console.error(`[ERROR] Error at ${url}.\nError log: ${e}`);
        return [null, null];
      }
    }
  }

  console.info(`[ERROR] Could not post request at ${url}. Retry count: ${retryCount}`);
  return [null, null];
}

async function getRequest(url: string, data: any, timeout = 1): Promise<any> {
  let retryCount = 0;
  if (DEBUG) {
    retryCount = 4;
    console.info("DEBUG MODE");
  }

  while (retryCount < 5) {
    try {
      const res: Response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), timeout: timeout });
      if (res) {
        return await res.json();
      }
    } catch (e) {
      if (e instanceof TimeoutError) {
        console.error(`[ERROR] Timeout at ${url}. Retry count: ${retryCount}`);
        retryCount++;
      } else {
        console.error(`[ERROR] Error at ${url}.\nError log: ${e}`);
        return null;
      }
    }

    console.info(`[ERROR] Could not post request at ${url}. Retry count: ${retryCount}`);
  }

  return null;
}

class RouteHandler {
  private _stage: string;
  private _url: string;

  constructor(stage: string, url: string) {
    this._stage = stage;
    this._url = url;
  }

  async getIp(unused = true): Promise<any> {
    const res = await getRequest(`${this._url}/ip?unused=${unused}`, null, 1);
    return res;
  }

  async upsertIp(data: any): Promise<[string | null, number | null]> {
    const [resText, resCode] = await postRequest(`${this._url}/ip`, data);
    return [resText, resCode];
  }

  async deleteIp(address: string): Promise<[string | null, number | null]> {
    const [resText, resCode] = await deleteRequest(`${this._url}/ip/${address}`, 1);
    return [resText, resCode];
  }

  async getProduct(prid?: string, matchNvMid?: string, sCategory?: string, caid?: string): Promise<any> {
    let url = `${this._url}/product`;
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

    return res;
  }

  async upsertProductMatch(data: Record<string, any>): Promise<[string | null, number | null]> {
    const [resText, resCode] = await postRequest(`${this._url}/product/match`, data, 5);
    return [resText, resCode];
  }

  async updateProductDetailOne(data: Record<string, any>): Promise<[string | null, number | null]> {
    const [resText, resCode] = await postRequest(`${this._url}/product/detail/one`, data, 5);
    return [resText, resCode];
  }

  async getProductHistory(caid?: string, prid?: string, countDesc?: number): Promise<any> {
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
    const res = await getRequest(`${url}${suffixUrl}`, null, 1);

    return res;
  }

  async getCategory(caid?: string, sCategory?: string, mCategory?: string): Promise<any> {
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
    const res = await getRequest(`${url}${suffixUrl}`, null, 1);

    return res;
  }

  async upsertCategory(data: any[]): Promise<[string | null, number | null]> {
    const [resText, resCode] = await postRequest(`${this._url}/category`, data, 5);
    return [resText, resCode];
  }

  async getReview(caid: string, prid?: string, reid?: string): Promise<any> {
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

    return res;
  }

  async upsertReviewBatch(data: any[]): Promise<[string | null, number | null]> {
    const [resText, resCode] = await postRequest(`${this._url}/review`, data, 1000);
    return [resText, resCode];
  }

  async getTopicByReid(
    reid: string,
    caid?: string,
    prid?: string,
    topicCode?: string,
    topicScore?: string,
    type?: string,
    positiveYn?: string,
    sentimentScale?: string
  ): Promise<any> {
    let url = `${this._url}/topic`;
    let suffixUrl = '';

    suffixUrl += `/${reid}`;
    if (caid && typeof caid === 'string') {
      suffixUrl += `?caid=${caid}&`;
    }
    if (prid && typeof prid === 'string') {
      suffixUrl += `?prid=${prid}&`;
    }
    if (topicCode && typeof topicCode === 'string') {
      suffixUrl += `?topic_code=${topicCode}&`;
    }
    if (topicScore && typeof topicScore === 'string') {
      suffixUrl += `?topic_score=${topicScore}&`;
    }
    if (type && typeof type === 'string') {
      suffixUrl += `?type=${type}&`;
    }
    if (positiveYn && typeof positiveYn === 'string') {
      suffixUrl += `?positive_yn=${positiveYn}&`;
    }
    if (sentimentScale && typeof sentimentScale === 'string') {
      suffixUrl += `?sentiment_scale=${sentimentScale}&`;
    }

    suffixUrl = suffixUrl.replace(/&$/, '');
    const res = await getRequest(`${url}${suffixUrl}`, null, 5);

    return res;
  }
}

// Usage example
const routeHandler = new RouteHandler("stage", "url");
console.log(routeHandler.getTopicByReid("R01", "C02", "P01"));
 */