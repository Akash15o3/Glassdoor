const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { mongoDB } = require('../../Config/keys');
const Students = require('../../Models/StudentModel');

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

// Get all students
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: get all students');
  console.log('Req Body: ', request.body);
  Students.find({}, (error, students) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching students');
      response.end('Error fetching students');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(students));
    }
  });
});

// Get student by ID
Router.get('/:id', (request, response) => {
  console.log('\nEndpoint GET: get student');
  console.log('Req Body: ', request.body);
  Students.findById(request.params.id, (error, student) => {
    if (error) {
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      console.log('Error fetching student');
      response.end('Error fetching student');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
      console.log('Sending 200');
      response.end(JSON.stringify(student));
    }
  });
});

// Get count of ratings

module.exports = Router;
