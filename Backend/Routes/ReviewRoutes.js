const express = require('express');
const mongoose = require('mongoose');
const { mongoDB } = require('../Config/keys');
const Reviews = require('../Models/ReviewModel');

const Router = express.Router();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 500,
  bufferMaxEntries: 0,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('Reviews-MongoDB Connected');
  }
});

function escapeRegex(text) {
  if (text !== undefined) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  // eslint-disable-next-line consistent-return, no-useless-return
  return;
}

// Get all reviews --paginated
Router.post('/', (request, response) => {
  console.log('\nEndpoint GET: get all reviews');

  // Need request.body.skip, request.body.limit
  if (request.body.skip === undefined) {
    request.body.skip = 0;
  }
  if (request.body.limit === undefined) {
    request.body.limit = 10;
  }
  console.log('Req Body: ', request.body);
  /*
  Reviews.find({}, (error, reviews) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching reviews');
      response.end('Error fetching reviews');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(reviews));
    }
  });
  */
  //
  Reviews.find({})
    .skip(request.body.skip)
    .limit(request.body.limit)
    .exec((error, reviews) => {
      if (error) {
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        console.log('Error fetching reviews');
        response.end('Error fetching reviews');
      } else {
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        console.log('Sending 200');
        response.end(JSON.stringify(reviews));
      }
    });
});

// Get reviews for company cname--paginated
Router.post('/cname', (request, response) => {
  console.log('\nEndpoint POST: get all reviews for a company');
  console.log('Req Body: ', request.body);
  if (request.body.skip === undefined) {
    request.body.skip = 0;
  }
  if (request.body.limit === undefined) {
    request.body.limit = 10;
  }
  console.log('Req Body: ', request.body);
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
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        console.log('Sending 200');
        response.end(JSON.stringify(reviews));
      }
    });
});

module.exports = Router;
