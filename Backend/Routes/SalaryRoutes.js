const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

// Get a particular job
Router.get('/getSalaries', (request, response) => {
  console.log('\nEndpoint GET: get all salaries for a company');
  console.log('Req Body: ', request.query);
  const data = { ...request.params };
  kafka.make_request('salariesTopic', 'GETSALARIES', data, (err, result) => {
    console.log('Get get all salaries for a company result ', result);
    if (err) {
      console.log('Get get all salaries for a company Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get get all salaries for a company Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/createSalary', (request, response) => {
  console.log('\nEndpoint POST: post create salary');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('salariesTopic', 'CREATESALARY', data, (err, result) => {
    console.log('Create Salary id result', result);
    if (err) {
      console.log('Create Salary id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Create Salary id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

module.exports = Router;
