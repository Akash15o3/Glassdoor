const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { mongoDB } = require('../../Config/keys');
const Admins = require('../../Models/AdminModel');
const Students = require('../../Models/StudentModel');
const Companies = require('../../Models/CompanyModel');

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

/*
Router.post('/login', (req, res) => {
  const { role, email, password } = req.body;
  if (email === 'admin@gmail.com' && password === 'admin') { res.send(true); } else { res.send(false); }
});
*/

Router.post('/login', (request, response) => {
  console.log('\nEndpoint LOGIN');
  console.log('Req Body: ', request.body);

  if (request.body.role === 'Student') {
    Students.findOne({ stemail: request.body.email }, (error, student) => {
      if (error) {
        console.log(error);
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        console.log('Incorrect credentials');
        response.end('Incorrect credentials');
      } else {
        bcrypt.compare(request.body.password, student.stpassword, (err, matched) => {
          if (matched) {
            response.writeHead(200, {
              'Content-Type': 'application/json',
            });
            console.log('Sending 200');
            response.end(JSON.stringify(student));
          } else {
            response.writeHead(401, {
              'Content-Type': 'text/plain',
            });
            console.log('Incorrect credentials');
            response.end('Incorrect credentials');
          }
        });
      }
    });
  } else if (request.body.role === 'Admin') {
    Admins.findOne({ ademail: request.body.email }, (error, admin) => {
      if (error) {
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        console.log('Incorrect credentials');
        response.end('Incorrect credentials');
      } else {
        bcrypt.compare(admin.stpassword, request.body.password, (err, matched) => {
          if (matched) {
            response.writeHead(200, {
              'Content-Type': 'application/json',
            });
            console.log('Sending 200');
            response.end(JSON.stringify(admin));
          } else {
            response.writeHead(401, {
              'Content-Type': 'text/plain',
            });
            console.log('Incorrect credentials');
            response.end('Incorrect credentials');
          }
        });
      }
    });
  } else if (request.body.role === 'Company') {
    Companies.findOne({ cemail: request.body.email }, (error, company) => {
      if (error) {
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        console.log('Incorrect credentials');
        response.end('Incorrect credentials');
      } else {
        bcrypt.compare(company.stpassword, request.body.password, (err, matched) => {
          if (matched) {
            response.writeHead(200, {
              'Content-Type': 'application/json',
            });
            console.log('Sending 200');
            response.end(JSON.stringify(company));
          } else {
            response.writeHead(401, {
              'Content-Type': 'text/plain',
            });
            console.log('Incorrect credentials');
            response.end('Incorrect credentials');
          }
        });
      }
    });
  } else {
    response.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    console.log('Incorrect role');
    response.end('Incorrect role');
  }
});

Router.post('/signup', (request, response) => {
  console.log('\nEndpoint SIGNUP');
  console.log('Req Body: ', request.body);

  if (request.body.role === 'Student') {
    bcrypt.hash(request.body.password, 10, (errHash, hash) => {
      Students.findOne({ stemail: request.body.email }, (error, student) => {
        if (error) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Error searching email ID');
          response.end('Error searching email ID');
        } else if (student) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Email ID is already registered');
          response.end('Email ID is already registered');
        } else {
          const newStudent = new Students({
            stemail: request.body.email,
            stpassword: hash,
            stname: request.body.name,
          });
          console.log('student: ', newStudent);
          newStudent.save((err, stu) => {
            if (err) {
              response.writeHead(401, {
                'Content-Type': 'text/plain',
              });
              console.log('Error saving student');
              response.end('Error saving student');
            } else {
              response.writeHead(200, {
                'Content-Type': 'application/json',
              });
              console.log('Sending 200');
              response.end(JSON.stringify(stu));
            }
          });
        }
      });
    });
  } else if (request.body.role === 'Company') {
    bcrypt.hash(request.body.password, 10, (errHash, hash) => {
      Companies.findOne({ cemail: request.body.email }, (error, company) => {
        if (error) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Error searching email ID');
          response.end('Error searching email ID');
        } else if (company) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Email ID is already registered');
          response.end('Email ID is already registered');
        } else {
          const newCompany = new Companies({
            cemail: request.body.email,
            cpassword: hash,
            cname: request.body.name,
          });
          newCompany.save((err, comp) => {
            if (err) {
              response.writeHead(401, {
                'Content-Type': 'text/plain',
              });
              console.log('Error saving student');
              response.end('Error saving student');
            } else {
              response.writeHead(200, {
                'Content-Type': 'application/json',
              });
              console.log('Sending 200');
              response.end(JSON.stringify(comp));
            }
          });
        }
      });
    });
  } else if (request.body.role === 'Admin') {
    bcrypt.hash(request.body.password, 10, (errHash, hash) => {
      Admins.findOne({ ademail: request.body.email }, (error, admin) => {
        if (error) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Error searching email ID');
          response.end('Error searching email ID');
        } else if (admin) {
          response.writeHead(401, {
            'Content-Type': 'text/plain',
          });
          console.log('Email ID is already registered');
          response.end('Email ID is already registered');
        } else {
          const newAdmin = new Admins({
            ademail: request.body.email,
            adpassword: hash,
            adname: request.body.name,
          });
          newAdmin.save((err, adm) => {
            if (err) {
              response.writeHead(401, {
                'Content-Type': 'text/plain',
              });
              console.log('Error saving student');
              response.end('Error saving student');
            } else {
              response.writeHead(200, {
                'Content-Type': 'application/json',
              });
              console.log('Sending 200');
              response.end(JSON.stringify(adm));
            }
          });
        }
      });
    });
  } else {
    response.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    console.log('Incorrect role');
    response.end('Incorrect role');
  }
});

module.exports = Router;
