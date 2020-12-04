const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

// Search company by name
Router.post('/companies', (request, response) => {
  console.log('\nEndpoint POST: search by company name');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };

  kafka.make_request('searchesTopic', 'SEARCHCOMPANIESBYNAME', data, (err, result) => {
    // console.log('Search companies by name result', result);
    if (err) {
      console.log('Search companies by name Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Search companies by name Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
Router.post('/companies/numPages', (request, response) => {
  console.log('\nEndpoint POST: get number of company search result pages ');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };

  kafka.make_request('searchesTopic', 'COMPANYSEARCHPAGES', data, (err, result) => {
    // console.log('get number of company search result pages', result);
    if (err) {
      console.log('get number of company search result pages Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('get number of company search result pages Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
// Search Jobs by title
Router.post('/jobs', (request, response) => {
  console.log('\nEndpoint POST: search by Job title');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };

  kafka.make_request('searchesTopic', 'SEARCHJOBSBYTITLE', data, (err, result) => {
    // console.log('Search jobs by title result', result);
    if (err) {
      console.log('Search jobs by title Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get jobs by title Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
Router.post('/jobs/numPages', (request, response) => {
  console.log('\nEndpoint POST: get number of jobs search result pages ');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };

  kafka.make_request('searchesTopic', 'JOBSEARCHPAGES', data, (err, result) => {
    // console.log('get number of jobs search result pages', result);
    if (err) {
      console.log('get number of jobs search result pages Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('get number of jobs search result pages Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
module.exports = Router;
