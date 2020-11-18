const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

// Get all jobs
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: get all jobs');
  console.log('Req Body: ', request.body);

  kafka.make_request('jobsTopic', 'GETALL', request.body, (err, result) => {
    console.log('Get all jobs result ', result);
    if (err) {
      console.log('Get all jobs Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get all jobs Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

// Get a particular job
Router.get('/:id', (request, response) => {
  console.log('\nEndpoint GET: get all jobs');
  console.log('Req Body: ', request.body);
  const data = { ...request.params };

  kafka.make_request('jobsTopic', 'GETONE', data, (err, result) => {
    console.log('Get one jobs result ', result);
    if (err) {
      console.log('Get one jobs Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get one jobs Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

// Post a new job
Router.post('/', (request, response) => {
  console.log('\nEndpoint POST: Add new job');
  console.log('Req Body: ', request.body);
  const data = { ...request.params, ...request.body };

  kafka.make_request('jobsTopic', 'ADDNEWJOB', data, (err, result) => {
    console.log('Get new job result ', result);
    if (err) {
      console.log('Get new job Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get new job Kafka error');
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
