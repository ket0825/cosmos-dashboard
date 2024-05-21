import dotenv from 'dotenv'

dotenv.config({'path':'./env/.env'});

let apiUrl: string;
let stage: string;

// 환경 변수 사용
if (process.env.STAGE == "dev") {
  console.log("개발 환경입니다.");
  apiUrl = process.env.DEV_API_URL ?? ""; 
  stage = "dev";
}
else if (process.env.STAGE == "prod") {
  console.log("운영 환경입니다.");
  apiUrl = process.env.PROD_API_URL ?? "";
  stage = "prod";
}
else {
  console.log("스테이지 환경입니다.");
  apiUrl = process.env.STAGE_API_URL ?? "";
  stage = "stage";
}
export { apiUrl, stage };