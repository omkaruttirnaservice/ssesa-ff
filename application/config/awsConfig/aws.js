const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const awsKeys = require('./awsKeys');

const s3 = new S3Client({
	region: awsKeys.region, // e.g., 'us-east-1'
	credentials: {
		accessKeyId: awsKeys.accessKeyId,
		secretAccessKey: awsKeys.secretKeyId,
	},
	endpoint: awsKeys.endpoint,
});

module.exports = s3;
