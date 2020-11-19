const express = require('express');
// const mongoose = require('mongoose');
// const redis = require('redis');
// const { mongoDB } = require('../Config/keys');
// const Reviews = require('../Models/ReviewModel');
const kafka = require('../kafka/client');

require('dotenv').config();

const Router = express.Router();

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   poolSize: 500,
//   bufferMaxEntries: 0,
// };

// const client = redis.createClient('6379', 'ec2-52-88-160-68.us-west-2.compute.amazonaws.com');
// const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_CLIENT);

// client.on('connect', () => {
//   console.error('Connected to Redis');
// });

// client.on('error', (error) => {
//   console.error(error);
// });

// eslint-disable-next-line no-unused-vars
// mongoose.connect(mongoDB, options, (err, res) => {
//   if (err) {
//     console.log(err);
//     console.log('MongoDB Connection Failed');
//   } else {
//     console.log('Reviews-MongoDB Connected');
//   }
// });

// Add a review
Router.post('/', (request, response) => {
  console.log('\nEndpoint POST: Add a review');
  console.log('Req Body: ', request.body);
  kafka.make_request('reviewsTopic', 'ADDREVIEW', request.body, (err, result) => {
    if (err) {
      console.log('Reviews addreview Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews addreview Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

// Get reviews for company cname--paginated, cached (page size set to 10)
Router.post('/cname', (request, response) => {
  console.log('\nEndpoint POST: get all reviews for a company');
  console.log('Req Body: ', request.body);
  kafka.make_request('reviewsTopic', 'GETREVIEWBYCNAME', request.body, (err, result) => {
    if (err) {
      console.log('Reviews getreviewbycname Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews getreviewbycname Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

module.exports = Router;
