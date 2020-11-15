const express = require('express');
const mongoose = require('mongoose');
const { mongoDB } = require('../Config/keys');
const Jobs = require('../Models/JobModel');

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

// Get all jobs
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: get all jobs');
  console.log('Req Body: ', request.body);
  Jobs.find({}, (error, jobs) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log(error);
      console.log('Error fetching jobs');
      response.end('Error fetching jobs');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(jobs));
    }
  });
});

// Get a particular job
Router.get('/:id', (request, response) => {
  console.log('\nEndpoint GET: get all jobs');
  console.log('Req Body: ', request.body);
  Jobs.findById(request.params.id, (error, job) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log(error);
      console.log('Error fetching jobs');
      response.end('Error fetching jobs');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(job));
    }
  });
});

// Post a new job
Router.post('/', (request, response) => {
  console.log('\nEndpoint POST: Add new job');
  console.log('Req Body: ', request.body);

  const now = new Date();
  const jsonDate = now.toJSON();
  const posted = new Date(jsonDate);

  const newJob = new Jobs({
    cname: request.body.cname,
    jtitle: request.body.jtitle,
    jindustry: request.body.jindustry,
    jcity: request.body.jcity,
    jstate: request.body.jstate,
    jcountry: request.body.jcountry,
    jzip: request.body.jzip,
    jaddress: request.body.jaddress,
    jlatitude: request.body.jlatitiude,
    jlongitude: request.body.jlongitude,
    jwork: request.body.jwork,
    jposted: posted,
    jpostedBy: request.body.jpostedBy,
    jdescription: request.body.jdescription,
    jresponsibilities: request.body.jresponsibilities,
    jqualifications: request.body.jqualifications,
  });

  newJob.save((error, job) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log(error);
      console.log('Error saving job');
      response.end('Error saving job');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(job));
    }
  });
});

module.exports = Router;
