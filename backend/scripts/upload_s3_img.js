// services/upload.service.js
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { randomUUID } = require("crypto");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

async function uploadBufferToS3(buffer, mimeType, folder) {
  const ext = mimeType.split("/")[1];
  const fileName = `${randomUUID()}.${ext}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: buffer,
    ContentType: mimeType,
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${folder}/${fileName}`;
}
module.exports = { uploadBufferToS3 };
