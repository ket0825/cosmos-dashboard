let apiUrl: string;
let stage: string;

console.log(`VITE_STAGE: ${import.meta.env.VITE_STAGE}`)
if (import.meta.env.VITE_STAGE === 'dev') {
  console.log('개발 환경입니다.');
  apiUrl = import.meta.env.VITE_DEV_API_URL;
  console.log(apiUrl);
  stage = 'dev';
} else if (import.meta.env.VITE_STAGE === 'prod') {
  console.log('운영 환경입니다.');
  apiUrl = import.meta.env.VITE_PROD_API_URL;
  stage = 'prod';
} else {
  console.log('스테이지 환경입니다.');
  apiUrl = import.meta.env.VITE_STAGE_API_URL;
  stage = 'stage';
}

export { apiUrl, stage };