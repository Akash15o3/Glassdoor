const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const { mongoDB } = require('../Config/keys');
const Reviews = require('../Models/ReviewModel');
require('dotenv').config();

const Router = express.Router();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

// const client = redis.createClient('6379', 'ec2-52-88-160-68.us-west-2.compute.amazonaws.com');
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_CLIENT);

client.on('connect', () => {
  console.error('Connected to Redis');
});

client.on('error', (error) => {
  console.error(error);
});

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('Reviews-MongoDB Connection Failed');
  } else {
    console.log('Reviews-MongoDB Connected');
  }
});

// Add a review
Router.post('/', (request, response) => {
  console.log('\nEndpoint POST: Add a review');
  console.log('Req Body: ', request.body);
  const newReview = new Reviews({
    cname: request.body.cname,
    rheadline: request.body.rheadline,
    rpros: request.body.rpros,
    rcons: request.body.rcons,
    radvice: request.body.radvice,
    rrecommended: request.body.rrecommended,
    routlook: request.body.routlook,
    rceoapprove: request.body.rceoapprove,
    rhelpful: request.body.rhelpful,
  });
  newReview.save((error, review) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log(error);
      console.log('Error saving review');
      response.end('Error saving review');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(review));
    }
  });
});

// Get reviews for company cname--paginated, cached (page size set to 10)
Router.post('/cname', (request, response) => {
  console.log('\nEndpoint POST: get all reviews for a company');
  console.log('Req Body: ', request.body);
  if (request.body.skip === undefined) {
    request.body.skip = 0;
  }
  // if (request.body.limit === undefined) {
  //   request.body.limit = 10;
  // }
  request.body.limit = 10;
  console.log('Req Body: ', request.body);
  const redisKey = `${request.body.cname}_Reviews_${request.body.skip}`;

  client.get(redisKey, (err, reply) => {
    if (err) {
      console.log(err);
    }
    if (reply !== null) {
      // Response exists inn the cache
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200 from Redis');
      response.end(JSON.parse(JSON.stringify(reply)));
    } else {
      // Response not in cache--fetch from mongo
      Reviews.find({ cname: request.body.cname })
        .skip(0)
        .limit(100)
        .exec((error, reviews) => {
          if (error) {
            response.writeHead(401, {
              'Content-Type': 'text/plain',
            });
            console.log('Error fetching reviews');
            response.end('Error fetching reviews');
          } else {
            const redisValue = JSON.stringify(reviews);
            client.set(redisKey, redisValue, (e, r) => {
              if (e) {
                console.log(e);
              } else {
                console.log('Cache successful: ', r);
              }
            });
            response.writeHead(200, {
              'Content-Type': 'application/json',
            });
            console.log('Sending 200 from Mongo');
            response.end(JSON.stringify(reviews));
          }
        });
    }
  });
});

module.exports = Router;
