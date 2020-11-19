const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

// Search company by name
Router.post('/companies', (request, response) => {
  console.log('\nEndpoint POST: search by company name');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };

  kafka.make_request('searchesTopic', 'SEARCHCOMPANIESBYNAME', data, (err, result) => {
    console.log('Get companies by name result', result);
    if (err) {
      console.log('Get companies by name  Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get companies by name  Kafka error');
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
