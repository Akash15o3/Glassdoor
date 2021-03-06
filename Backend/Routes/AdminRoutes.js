const express = require('express');
const kafka = require('../kafka/client');

require('dotenv').config();

const Router = express.Router();

// Get reviews for company cname--paginated, cached
Router.post('/reviews/cname', (request, response) => {
  console.log('\nEndpoint POST: get all reviews for a company');
  // console.log('Req Body: ', request.body);
  kafka.make_request('adminsTopic', 'GETREVIEWSBYCNAME', request.body, (err, result) => {
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
      // console.log(result.content);
      response.end(result.content);
    }
  });
});

// Get reviews for company by cid
Router.post('/reviews/cid', (request, response) => {
  console.log('\nEndpoint POST: get all reviews for a company');
  // console.log('Req Body: ', request.body);
  kafka.make_request('adminsTopic', 'GETREVIEWSBYCID', request.body, (err, result) => {
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
      response.end(result.content);
    }
  });
});

// Approve a review
Router.put('/reviews/:rid/approve', (request, response) => {
  console.log('\nEndpoint PUT: Approve a review');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body, ...request.params };
  kafka.make_request('adminsTopic', 'APPROVEREVIEW', data, (err, result) => {
    if (err) {
      console.log('Reviews: approve review Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: approve review Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Reject a review
Router.put('/reviews/:rid/reject', (request, response) => {
  console.log('\nEndpoint PUT: Reject a review');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body, ...request.params };
  kafka.make_request('adminsTopic', 'REJECTREVIEW', data, (err, result) => {
    if (err) {
      console.log('Reviews: reject review Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: reject review Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Approve/Reject a photo
Router.put('/photo/approve', (request, response) => {
  console.log('\nEndpoint PUT: Approve a photo');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'APPROVEPHOTO', data, (err, result) => {
    if (err) {
      console.log('Reviews: approve photo Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: approve photo Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Approve/Reject a photo
Router.put('/photo/reject', (request, response) => {
  console.log('\nEndpoint PUT: Reject a photo');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'REJECTPHOTO', data, (err, result) => {
    if (err) {
      console.log('Reviews: reject photo Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: reject photo Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Get reviews per day
Router.get('/reviewsPerDay', (request, response) => {
  console.log('\nEndpoint GET: Reviews per day');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'REVIEWSPERDAY', data, (err, result) => {
    if (err) {
      console.log('Reviews: Reviews per day Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: Reviews per day Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Top 5 most reviewed companies
Router.get('/mostReviewed', (request, response) => {
  console.log('\nEndpoint GET: Most reviewed companies');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'MOSTREVIEWED', data, (err, result) => {
    if (err) {
      console.log('Reviews: Reviews per day Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: Reviews per day Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Top 5 average Rating
Router.get('/bestAvg', (request, response) => {
  console.log('\nEndpoint GET: Best avg rating companies');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'BESTAVG', data, (err, result) => {
    if (err) {
      console.log('Reviews: Best avg rating Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: Best avg rating Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Top 10 ceo
Router.get('/topCEO', (request, response) => {
  console.log('\nEndpoint GET: Top 10 CEOs');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'TOPCEO', data, (err, result) => {
    if (err) {
      console.log('Reviews: Top 10 CEOs Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: Top 10 CEOs Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Top 10 most viewed companies
Router.get('/topViewed', (request, response) => {
  console.log('\nEndpoint GET: Top 10 companies viewed per day');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'TOPVIEWEDPERDAY', data, (err, result) => {
    if (err) {
      console.log('Reviews: Top 10 companies viewed per day Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: Top 10 companies viewed per day Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.get('/topStudents', (request, response) => {
  console.log('\nEndpoint GET: Top 5 students');
  // console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('adminsTopic', 'TOPSTUDENTS', data, (err, result) => {
    if (err) {
      console.log('Reviews: Top 5 students Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews: Top 5 students Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

module.exports = Router;
