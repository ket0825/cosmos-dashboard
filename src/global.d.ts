import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

declare global {
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
}

declare global {
  interface ProductType {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  }
}

declare global {
  interface ReqCategoryType {
    // caid: path parameter
    s_category: string;
    m_category: string;
  }
}

declare global {
  interface CategoryType {
  id: number
  type: string
  caid: string
  s_category: string
  m_category: string
  url: string
  s_topics: string[]
  m_topics: string[]
  }
}

declare global {
  interface ReqProductType {
    // prid: path parameter
    match_nv_mid: string,
    s_category: string,
    caid: string,
  }
}

declare global {
  interface RealProductType {
  id: number;
  type: string;
  caid: string;
  prid: string;
  url: string;
  grade: number;
  name: string;
  lowest_price: number;
  review_count: number;
  match_nv_mid: string;
  brand: string;
  maker: string;
  naver_spec: any;
  seller_spec: any;
  detail_image_urls: string[];
  }
}

declare global {
  interface ReqProductHistoryType {
    caid: string,
    prid: string,
    count_desc: number,
  }
}

declare global {
  interface ProductHistoryType {
  id: number;
  caid: string;
  prid: string;
  review_count: number;
  grade: number;
  lowest_price: number;
  timestamp: string;
    }
}

declare global {
  interface ReqReviewType {
    // caid: path parameter
    prid: string,
    reid: string,
  }
}

declare global {
  interface ReviewType {
    id: number;
    type: string;
    prid: string;
    caid: string;
    reid: string;
    content: string;
    our_topics_yn: string;
    n_review_id: string;
    quality_score: number;
    buy_option: string;
    star_score: number;
    topic_count: number;
    topic_yn: string;
    topics: any;
    user_id: string;
    aida_modify_time: string;
    mall_id: string;
    mall_seq: string;
    mall_name: string;
    match_nv_mid: string;
    nv_mid: string;
    image_urls: string[];
  }
}

declare global {
  interface ReqTopicType {
    caid: string,
    prid: string,
    count_desc: number,
    topic_code: string,
    type: string,
    positive_yn: string,
    sentiment_scale: string,
  }
}

declare global {
  interface TopicType {
  id: number;
  type: string;
  tpid: string;
  prid: string;
  reid: string;
  text: string;
  topic_code: string;
  topic_name: string;
  topic_score: number;
  start_pos: number;
  end_pos: number;
  positive_yn: string;
  sentiment_scale: number;
  }
}

declare global {
  interface GetErrorResponseType {    
    msg: string;
    status: number;
  }
}
