const Salary = require('../Models/SalaryModel');
const Students = require('../Models/StudentModel');

function getSalaries(data, callback) {
  Salary.find({ cid: data.cid }, (error, salaries) => {
    console.log('Kafka backend salaries: ', salaries);
    console.log('kafka backend data: ', data);
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching salaries',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(salaries),
      };
      callback(null, response);
    }
  });
}
function createNewSalary(data, callback) {
  const {
    jtitle, salbase, salexperience, sallocation, salbonus, stid, cid, cname,
  } = data;
  Students.findById(stid, (error, student) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Student id does not exist',
      };
      callback(null, response);
    } else {
      student.stsalaries.push({
        jtitle, salbase, salexperience, sallocation, salbonus,
      });
      student.save((err) => {
        if (err) {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Error modifying student',
          };
          callback(null, response);
        }
      });
    }
  });
  new Salary({
    jtitle, salbase, salexperience, sallocation, salbonus, cid, cname,
  })
    .save((err, salary) => {
      if (err) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error saving salary',
        };
        callback(null, response);
      } else {
        const response = {
          status: 200,
          header: 'application/json',
          content: JSON.stringify(salary),
        };
        callback(null, response);
      }
    });
}
function handleRequest(msg, callback) {
  console.log('=>', msg.subTopic);
  switch (msg.subTopic) {
    case 'GETSALARIES': {
      console.log('KB: Inside get company salaries');
      console.log('Message:', msg);
      getSalaries(msg.data, callback);
      break;
    }
    case 'CREATESALARY': {
      console.log('KB: Inside create salary');
      console.log('Message:', msg);
      createNewSalary(msg.data, callback);
      break;
    }
    default: {
      const response = {
        status: 400,
        header: 'text/plain',
        content: 'Bad request',
      };
      callback(null, response);
    }
  }
}

exports.handleRequest = handleRequest;
