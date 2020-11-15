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
  return;
}

// Get all companies
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: get all companies');
  console.log('Req Body: ', request.body);
  Companies.find({}, (error, companies) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching companies');
      response.end('Error fetching companies');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(companies));
    }
  });
});

// Get one company
Router.get('/:id', (request, response) => {
  console.log('\nEndpoint GET: get company');
  console.log('Req Body: ', request.body);
  Companies.findById({}, (error, company) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching company');
      response.end('Error fetching company');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(company));
    }
  });
});

// Update company's profile details
// please refer model: clocation-cceo can be updated here

Router.put('/profile/:cid', (request, response) => {
  console.log('\nEndpoint PUT: Update company profile');
  console.log('Req Body: ', request.body);
  const data = {
    clocation: request.body.clocation,
    clatitude: request.body.clatitude,
    clongitude: request.body.clongitude,
    cwebsite: request.body.cwebsite,
    csize: request.body.csize,
    ctype: request.body.ctype,
    crevenue: request.body.crevenue,
    cindustry: request.body.cindustry,
    cheadquarters: request.body.cheadquarters,
    cfounded: request.body.cfounded,
    cdescription: request.body.cdescription,
    cmission: request.body.cmission,
    cceo: request.body.cceo,
  };

  Companies.findByIdAndUpdate(request.params.cid, data, { new: true }, (error, companyUpdated) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error updating company profile');
      response.end('Error updating company profile');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(companyUpdated));
    }
  });
});


// Update company--Add review to featured
Router.put('/profile/addFtReview/:cid', (request, response) => {
  console.log('\nEndpoint PUT: Add featured review');
  console.log('Req Body: ', request.body);

  Companies.findById(request.params.cid, (error, company) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error updating company profile');
      response.end('Error updating company profile');
    } else if (company.cfeatured.length < 2) {
      company.cfeatured.push(request.body.reviewid);
      company.save((err, companyUpdated) => {
        if (err) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Error adding review to featured');
          response.end('Error adding review to featured');
        } else {
          response.writeHead(200, {
            'Content-Type': 'application/json',
          });
          console.log('Sending 200');
          response.end(JSON.stringify(companyUpdated));
        }
      });
    } else {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Please delete from existing featured reviews first');
      response.end('Please delete from existing featured reviews first');
    }
  });
});

// Delete review from featured
Router.put('/profile/delFtReview/:cid', (request, response) => {
  console.log('\nEndpoint PUT: Delete featured review');
  console.log('Req Body: ', request.body);

  Companies.findById(request.params.cid, (error, company) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching company');
      response.end('Error fetching company');
    } else if (company.cfeatured.length > 0) {
      console.log('=> ', request.body.reviewid);
      company.cfeatured = company.cfeatured.filter((item) => item !== request.body.reviewid);
      // company.cfeatured = [];
      console.log('fil:', company.cfeatured);
      company.save((err, companyUpdated) => {
        if (err) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Error deleting review from featured');
          response.end('Error deleting review from featured');
        } else {
          response.writeHead(200, {
            'Content-Type': 'application/json',
          });
          console.log('Sending 200');
          response.end(JSON.stringify(companyUpdated));
        }
      });
    } else {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Nothing to delete');
      response.end('Nothing to delete');
    }
  });
});

// Update company-- Add photos

// Search company by name
Router.post('/search', (request, response) => {
  console.log('\nEndpoint POST: search by company name');
  console.log('Req Body: ', request.body);
  const regex = new RegExp(escapeRegex(request.body.cname), 'gi');
  Companies.find({ cname: regex }, (error, company) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching company');
      response.end('Error fetching company');
    } else if (company.length === 1) {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(company));
    } else {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching company');
      response.end('Error fetching company');
    }
  });
});

// get average rating

module.exports = Router;
