import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_Sherry_User_Token_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_Sherry_User_Token_Access_Key_ID,
    secretAccessKey: process.env.R2_Sherry_User_Token_Secret_Access_Key,
  },
});
