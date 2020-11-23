const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.Bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
    acl: 'public-read',
  }),
});

module.exports = upload;
