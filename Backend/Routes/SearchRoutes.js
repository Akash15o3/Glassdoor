const express = require('express');
const mongoose = require('mongoose');
const { mongoDB } = require('../Config/keys');
const Companies = require('../Models/CompanyModel');

const Router = express.Router();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }
});

function escapeRegex(text) {
  if (text !== undefined) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  // eslint-disable-next-line consistent-return, no-useless-return
  return;
}

// Search company by name
// Maybe separate to a another route
Router.post('/companies', (request, response) => {
  console.log('\nEndpoint POST: search by company name');
  console.log('Req Body: ', request.body);
  const regex = new RegExp(escapeRegex(request.body.cname), 'gi');
  Companies.find({ cname: regex }, (error, company) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching companies');
      response.end('Error fetching companies');
    } else if (company) {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(company));
    } else {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching companies');
      response.end('Error fetching companies');
    }
  });
});

module.exports = Router;
