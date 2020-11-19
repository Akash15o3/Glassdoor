const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

// Add interview --separate API for adding questions to interview experience
Router.post('/', (request, response) => {
  console.log('\nEndpoint POST: Add new interview');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };

  kafka.make_request('interviewsTopic', 'ADDNEW', data, (err, result) => {
    console.log('Add new interview result ', result);
    if (err) {
      console.log('Add new interview Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Add new interview Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

// Add interview --separate API for adding questions to interview experience
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: Get all interviews');
  console.log('Req Body: ', request.body);

  kafka.make_request('interviewsTopic', 'GETALL', request.body, (err, result) => {
    console.log('Get all interviews result ', result);
    if (err) {
      console.log('Get all interviews Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get all interviews Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

// Add question to interview
// :id is interview id
Router.put('/:id/addQuestion', (request, response) => {
  console.log('\nEndpoint PUT: Add question to an interview experience');
  console.log('Req Body: ', request.body);
  const data = { ...request.body, ...request.params };

  kafka.make_request('interviewsTopic', 'ADDNEWQUESTION', data, (err, result) => {
    console.log('Add new question to innterview exp result ', result);
    if (err) {
      console.log('Add new question to interview exp Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Add new question to interview exp Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      console.log(result.content);
      response.end(result.content);
    }
  });
});

// Post an answer to an interview question
// :id is interview id
// request.body.qid is id of the question that is being answered
Router.put('/:id/addAnswer', (request, response) => {
  console.log('\nEndpoint PUT: Add answer for an interview experience question');
  console.log('Req Body: ', request.body);
  const data = { ...request.body, ...request.params };

  kafka.make_request('interviewsTopic', 'ADDANSWER', data, (err, result) => {
    console.log('Add answer for an interview experience question result ', result);
    if (err) {
      console.log('Add answer for an interview experience question Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Add answer for an interview experience question Kafka error');
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
