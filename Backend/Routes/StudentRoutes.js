const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();

const upload = require('../Config/s3');

// Get all students
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: get all students');
  console.log('Req Body: ', request.body);
  kafka.make_request('studentsTopic', 'GETALL', request.body, (err, result) => {
    console.log('Get all students result', result);
    if (err) {
      console.log('Get all students Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get all students Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Get student by ID
Router.get('/:id', (request, response) => {
  console.log('\nEndpoint GET: get student');
  console.log('Req Body: ', request.body);
  const data = { ...request.params };
  kafka.make_request('studentsTopic', 'GETONE', data, (err, result) => {
    console.log('Get student by id result', result);
    if (err) {
      console.log('Get student by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get student by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/updateProfile', (request, response) => {
  console.log('\nEndpoint POST: post update student profile');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATEPROFILE', data, (err, result) => {
    console.log('Update Student Profile by id result', result);
    if (err) {
      console.log('Update Student Profile by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Profile by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/uploadProfilePicture', upload.single('file'), (request, response) => {
  console.log('\nEndpoint POST: post upload student profile picture');
  console.log('Req Body: ', request.body);
  const data = { id: request.body.id, stphoto: request.file.location };
  kafka.make_request('studentsTopic', 'UPLOADPROFILEPICTURE', data, (err, result) => {
    console.log('Upload Student Profile Picture by id result', result);
    if (err) {
      console.log('Upload Student Profile Picture by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Upload Student Profile Picture by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/uploadResume', upload.single('file'), (request, response) => {
  console.log('\nEndpoint POST: post upload student resume');
  console.log('Req Body: ', request.body);
  const data = { id: request.body.id, stresume: request.file.location };
  kafka.make_request('studentsTopic', 'UPLOADRESUME', data, (err, result) => {
    console.log('Upload Student Resume by id result', result);
    if (err) {
      console.log('Upload Student Resume by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Upload Student Resume by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/updateJobStatus', (request, response) => {
  console.log('\nEndpoint POST: post update student job status');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATEJOBSTATUS', data, (err, result) => {
    console.log('Update Student Job Status by id result', result);
    if (err) {
      console.log('Update Student Job Status by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Job Status by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/updateJobTitle', (request, response) => {
  console.log('\nEndpoint POST: post update student job title');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATEJOBTITLE', data, (err, result) => {
    console.log('Update Student Job Title by id result', result);
    if (err) {
      console.log(err);
      console.log('Update Student Job Title by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Job Title by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/updateTargetSalary', (request, response) => {
  console.log('\nEndpoint POST: post update student target salary');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATETARGETSALARY', data, (err, result) => {
    console.log('Update Student Target Salary by id result', result);
    if (err) {
      console.log('Update Student Target Salary by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Target Salary by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/updateRelocation', (request, response) => {
  console.log('\nEndpoint POST: post update student relocation');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATERELOCATION', data, (err, result) => {
    console.log('Update Student Relocation by id result', result);
    if (err) {
      console.log('Update Student Relocation by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Relocation by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
Router.post('/updateIndustry', (request, response) => {
  console.log('\nEndpoint POST: post update student industry');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATEINDUSTRY', data, (err, result) => {
    console.log('Update Student Industry by id result', result);
    if (err) {
      console.log('Update Student Industry by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Industry by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/updateDemographics', (request, response) => {
  console.log('\nEndpoint POST: post update student demographics');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'UPDATEDEMOGRAPHICS', data, (err, result) => {
    console.log('Update Student Demographics by id result', result);
    if (err) {
      console.log('Update Student Demographics by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Student Demographics by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
Router.post('/applications', (request, response) => {
  console.log('\nEndpoint POST: get student applications');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'GETAPPLICATIONS', data, (err, result) => {
    console.log(err);
    console.log('Student Get Application result', result);
    if (err) {
      console.log('Student Get Application Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Student Get Application Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
Router.post('/submitApplication', (request, response) => {
  console.log('\nEndpoint POST: post student submit application');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'SUBMITAPPLICATION', data, (err, result) => {
    console.log(err);
    console.log('Student Submit Application result', result);
    if (err) {
      console.log('Student Submit Application Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Student Submit Application Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
Router.post('/withdrawApplication', (request, response) => {
  console.log('\nEndpoint POST: post student withdraw application');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('studentsTopic', 'WITHDRAWAPPLICATION', data, (err, result) => {
    console.log(err);
    console.log('Student Withdraw Application result', result);
    if (err) {
      console.log('Student Withdraw Application Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Student Withdraw Application Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post('/uploadCompanyPhotos', upload.array('files', 10), (request, response) => {
  const {
    cid, stid, stname, cname,
  } = request.body;
  const stphotos = [];
  const cphotos = [];
  request.files.forEach((file) => {
    stphotos.push({ url: file.location, cname, cid });
    cphotos.push({ url: file.location, stname, stid });
  });
  console.log('\nEndpoint POST: post student upload company pictures');
  console.log('Req Body: ', request.body);
  const data = {
    cid, stid, cphotos, stphotos,
  };
  kafka.make_request('studentsTopic', 'UPLOADCOMPANYPICTURES', data, (err, result) => {
    console.log('Student Upload Company Pictures by id result', result);
    if (err) {
      console.log('Student Upload Company Pictures by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Student Upload Company Pictures by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});
module.exports = Router;
