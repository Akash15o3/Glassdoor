const bcrypt = require('bcrypt');
const Students = require('../Models/StudentModel');
const Admins = require('../Models/AdminModel');
const Companies = require('../Models/CompanyModel');

function studentLogin(data, callback) {
  Students.findOne({ stemail: data.email }, (error, student) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Incorrect credentials',
      };
      callback(null, response);
    } else if (student) {
      bcrypt.compare(data.password, student.stpassword, (err, matched) => {
        if (matched) {
          const response = {
            status: 200,
            header: 'application/json',
            content: JSON.stringify(student),
          };
          callback(null, response);
        } else {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Incorrect credentials',
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Incorrect credentials',
      };
      callback(null, response);
    }
  });
}

function adminLogin(data, callback) {
  Admins.findOne({ ademail: data.email }, (error, admin) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Incorrect credentials',
      };
      callback(null, response);
    } else if (admin) {
      bcrypt.compare(data.password, admin.adpassword, (err, matched) => {
        if (matched) {
          const response = {
            status: 200,
            header: 'application/json',
            content: JSON.stringify(admin),
          };
          callback(null, response);
        } else {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Incorrect credentials',
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Incorrect credentials',
      };
      callback(null, response);
    }
  });
}

function companyLogin(data, callback) {
  Companies.findOne({ cemail: data.email }, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Incorrect credentials',
      };
      callback(null, response);
    } else if (company) {
      console.log('Company: ', company);
      bcrypt.compare(data.password, company.cpassword, (err, matched) => {
        if (matched) {
          const response = {
            status: 200,
            header: 'application/json',
            content: JSON.stringify(company),
          };
          callback(null, response);
        } else {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Incorrect credentials',
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Incorrect credentials',
      };
      callback(null, response);
    }
  });
}

function login(data, callback) {
  if (data.role === 'Student') {
    studentLogin(data, callback);
  } else if (data.role === 'Admin') {
    adminLogin(data, callback);
  } else if (data.role === 'Employer') {
    companyLogin(data, callback);
  } else {
    const response = {
      status: 401,
      header: 'text/plain',
      content: 'Incorrect role',
    };
    callback(null, response);
  }
}

function studentSignup(data, callback) {
  bcrypt.hash(data.password, 10, (errHash, hash) => {
    Students.findOne({ stemail: data.email }, (error, student) => {
      if (error) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error searching email ID',
        };
        callback(null, response);
      } else if (student) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Email ID is already registered',
        };
        callback(null, response);
      } else {
        const newStudent = new Students({
          stemail: data.email,
          stpassword: hash,
          stname: data.name,
        });
        console.log('student: ', newStudent);
        newStudent.save((err, stu) => {
          if (err) {
            const response = {
              status: 401,
              header: 'text/plain',
              content: 'Error saving student',
            };
            callback(null, response);
          } else {
            const response = {
              status: 200,
              header: 'application/json',
              content: JSON.stringify(stu),
            };
            callback(null, response);
          }
        });
      }
    });
  });
}

function companySignup(data, callback) {
  bcrypt.hash(data.password, 10, (errHash, hash) => {
    Companies.findOne({ cemail: data.email }, (error, company) => {
      if (error) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error searching email ID',
        };
        callback(null, response);
      } else if (company) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Email ID is already registered',
        };
        callback(null, response);
      } else {
        const newCompany = new Companies({
          cemail: data.email,
          cpassword: hash,
          cname: data.name,
        });
        newCompany.save((err, comp) => {
          if (err) {
            const response = {
              status: 401,
              header: 'text/plain',
              content: 'Error saving student',
            };
            callback(null, response);
          } else {
            const response = {
              status: 200,
              header: 'application/json',
              content: JSON.stringify(comp),
            };
            callback(null, response);
          }
        });
      }
    });
  });
}

function adminSignup(data, callback) {
  bcrypt.hash(data.password, 10, (errHash, hash) => {
    Admins.findOne({ ademail: data.email }, (error, admin) => {
      if (error) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error searching email ID',
        };
        callback(null, response);
      } else if (admin) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Email ID is already registered',
        };
        callback(null, response);
      } else {
        const newAdmin = new Admins({
          ademail: data.email,
          adpassword: hash,
          adname: data.name,
        });
        newAdmin.save((err, adm) => {
          if (err) {
            const response = {
              status: 401,
              header: 'text/plain',
              content: 'Error saving Admin',
            };
            callback(null, response);
          } else {
            const response = {
              status: 200,
              header: 'application/json',
              content: JSON.stringify(adm),
            };
            callback(null, response);
          }
        });
      }
    });
  });
}

function signup(data, callback) {
  if (data.role === 'Student') {
    studentSignup(data, callback);
  } else if (data.role === 'Employer') {
    companySignup(data, callback);
  } else if (data.role === 'Admin') {
    adminSignup(data, callback);
  } else {
    const response = {
      status: 401,
      header: 'text/plain',
      content: 'Incorrect role',
    };
    callback(null, response);
  }
}

function handleRequest(msg, callback) {
  switch (msg.subTopic) {
    case 'LOGIN': {
      console.log('KB: Inside get all companies');
      console.log('Message:', msg);
      login(msg.data, callback);
      break;
    }

    case 'SIGNUP': {
      console.log('KB: Inside get one company');
      console.log('Message:', msg);
      signup(msg.data, callback);
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
