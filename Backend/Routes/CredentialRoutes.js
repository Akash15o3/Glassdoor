const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

// Login
Router.post('/login', (request, response) => {
  console.log('\nEndpoint LOGIN');
  console.log('Req Body: ', request.body);
  const data = { ...request.params, ...request.body };

  kafka.make_request('credentialsTopic', 'LOGIN', data, (err, result) => {
    // console.log('Login result ', result);
    if (err) {
      console.log('Login Kafka error');
      response.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      response.end('Login Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Sign up
Router.post('/signup', (request, response) => {
  console.log('\nEndpoint SIGNUP');
  console.log('Req Body: ', request.body);
  const data = { ...request.params, ...request.body };

  kafka.make_request('credentialsTopic', 'SIGNUP', data, (err, result) => {
    // console.log('Signup result ', result);
    if (err) {
      console.log('Signup Kafka error');
      response.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      response.end('Signup Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

module.exports = Router;
