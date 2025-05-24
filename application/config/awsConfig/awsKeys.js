const dotenv = require('dotenv');

dotenv.config();

const awsKeys = {
	region: process.env.S3_BUCKET_REGION,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretKeyId: process.env.S3_SECRET_ACCESS_KEY,
	bucketName: process.env.S3_BUCKET_NAME,
	endpoint: process.env.S3_BUCKET_ENDPOINT
};

module.exports = awsKeys;
