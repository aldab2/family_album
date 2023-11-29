import {Client} from 'minio'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({path: __dirname+'/./../.env'});
console.log(__dirname)
console.log(process.env.MINIO_URL)
  const initMinioClient = ()=>{
    console.log(process.env.MINIO_URL)
    const minioClient = new Client({
        endPoint: process.env.MINIO_URL,
        port: 9000,//process.env.MINIO_PORT,
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey:  process.env.MINIO_SECERET_KEY
      });
    return minioClient
  }
  export default initMinioClient;