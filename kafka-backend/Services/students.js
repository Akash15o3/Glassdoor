const Students = require('../Models/StudentModel');
const Application = require('../Models/ApplicationModel');
const Company = require('../Models/CompanyModel');

const options = {
  useFindAndModify: false,
  new: true,
};
function getAllStudents(data, callback) {
  Students.find({}, (error, students) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching students',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(students),
      };
      callback(null, response);
    }
  });
}

function getStudentById(data, callback) {
  Students.findById(data.id, (error, student) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching student',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(student),
      };
      callback(null, response);
    }
  });
}
function updateStudentProfile(data, callback) {
  const { id, ...updateInfo } = data;
  Students.findByIdAndUpdate(id, updateInfo, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student profile',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results),
      };
      callback(null, response);
    }
  });
}
function uploadStudentProfilePicture(data, callback) {
  const { id, stphoto } = data;
  Students.findByIdAndUpdate(id, { stphoto }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error uploading student profile picture',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'text/plain',
        content: stphoto,
      };
      callback(null, response);
    }
  });
}

function uploadStudentResume(data, callback) {
  const { id, stresume } = data;
  Students.findByIdAndUpdate(id, { $push: { stresumes: { stresume } } }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error uploading student resume',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'text/plain',
        content: JSON.stringify(results.stresumes),
      };
      callback(null, response);
    }
  });
}
function updateStudentJobStatus(data, callback) {
  const { id, searchstatus } = data;
  Students.findByIdAndUpdate(id, { 'stjobpref.searchstatus': searchstatus }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student job status',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results.stjobpref),
      };
      callback(null, response);
    }
  });
}
function updateStudentJobTitle(data, callback) {
  const { id, title } = data;
  Students.findByIdAndUpdate(id, { 'stjobpref.title': title }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student job title',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results.stjobpref),
      };
      callback(null, response);
    }
  });
}
function updateStudentTargetSalary(data, callback) {
  const { id, targetsalary, salarypayperiod } = data;
  Students.findByIdAndUpdate(id, { 'stjobpref.targetsalary': targetsalary, 'stjobpref.salarypayperiod': salarypayperiod }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student target salary',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results.stjobpref),
      };
      callback(null, response);
    }
  });
}

function updateStudentRelocation(data, callback) {
  const { id, relocation } = data;
  Students.findByIdAndUpdate(id, { 'stjobpref.relocation': relocation }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student relocation',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results.stjobpref),
      };
      callback(null, response);
    }
  });
}

function updateStudentIndustry(data, callback) {
  const { id, industry } = data;
  Students.findByIdAndUpdate(id, { 'stjobpref.industry': industry }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student industry',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results.stjobpref),
      };
      callback(null, response);
    }
  });
}

function updateStudentDemographics(data, callback) {
  const { id, key } = data;
  Students.findByIdAndUpdate(id, { [`stdemographics.${key}`]: data[key] }, options, (error, results) => {
    if (error) {
      console.log(error);
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating student demographics',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results.stdemographics),
      };
      callback(null, response);
    }
  });
}
function getStudentApplications(data, callback) {
  const { aapplierid } = data;
  Application.find({ aapplierid }, (error, results) => {
    if (error) {
      console.log(error);
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error getting student applications',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results),
      };
      callback(null, response);
    }
  });
}
function studentSubmitApplication(data, callback) {
  new Application({ ...data })
    .save((err, app) => {
      if (err) {
        console.log(err);
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error saving application',
        };
        callback(null, response);
      } else {
        const response = {
          status: 200,
          header: 'application/json',
          content: JSON.stringify(app),
        };
        console.log(response);
        callback(null, response);
      }
    });
}
function studentWithdrawApplication(data, callback) {
  const { id } = data;
  Application.findByIdAndUpdate(id, { astatus: 'Withdrawn' }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error withdrawing student application',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(results),
      };
      callback(null, response);
    }
  });
}
function studentUploadCompanyPictures(data, callback) {
  const {
    cid, stid, cphotos, stphotos,
  } = data;
  Students.findByIdAndUpdate(stid, { $push: { cphotos: { $each: stphotos } } }, options, (error, results) => {
    console.log(results);
  });
  Company.findByIdAndUpdate(cid, { $push: { cphotos: { $each: cphotos } } }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error student uploading company pictures',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'text/plain',
        content: results.cphotos,
      };
      callback(null, response);
    }
  });
}
function handleRequest(msg, callback) {
  console.log('=>', msg.subTopic);
  switch (msg.subTopic) {
    case 'GETALL': {
      console.log('KB: Inside get all students');
      console.log('Message:', msg);
      getAllStudents(msg.data, callback);
      break;
    }
    case 'GETONE': {
      console.log('KB: Inside student by id');
      console.log('Message:', msg);
      getStudentById(msg.data, callback);
      break;
    }
    case 'UPDATEPROFILE': {
      console.log('KB: Inside update student profile');
      console.log('Message:', msg);
      updateStudentProfile(msg.data, callback);
      break;
    }
    case 'UPLOADPROFILEPICTURE': {
      console.log('KB: Inside upload student profile picture');
      console.log('Message:', msg);
      uploadStudentProfilePicture(msg.data, callback);
      break;
    }
    case 'UPLOADRESUME': {
      console.log('KB: Inside upload student resume');
      console.log('Message:', msg);
      uploadStudentResume(msg.data, callback);
      break;
    }
    case 'UPDATEJOBSTATUS': {
      console.log('KB: Inside update student job status');
      console.log('Message:', msg);
      updateStudentJobStatus(msg.data, callback);
      break;
    }
    case 'UPDATEJOBTITLE': {
      console.log('KB: Inside update student job title');
      console.log('Message:', msg);
      updateStudentJobTitle(msg.data, callback);
      break;
    }
    case 'UPDATETARGETSALARY': {
      console.log('KB: Inside update student target salary');
      console.log('Message:', msg);
      updateStudentTargetSalary(msg.data, callback);
      break;
    }
    case 'UPDATERELOCATION': {
      console.log('KB: Inside update student relocation');
      console.log('Message:', msg);
      updateStudentRelocation(msg.data, callback);
      break;
    }
    case 'UPDATEINDUSTRY': {
      console.log('KB: Inside update student industry');
      console.log('Message:', msg);
      updateStudentIndustry(msg.data, callback);
      break;
    }
    case 'UPDATEDEMOGRAPHICS': {
      console.log('KB: Inside update student demographics');
      console.log('Message:', msg);
      updateStudentDemographics(msg.data, callback);
      break;
    }
    case 'GETAPPLICATIONS': {
      console.log('KB: Inside student get applications');
      console.log('Message:', msg);
      getStudentApplications(msg.data, callback);
      break;
    }
    case 'SUBMITAPPLICATION': {
      console.log('KB: Inside student submit application');
      console.log('Message:', msg);
      studentSubmitApplication(msg.data, callback);
      break;
    }
    case 'WITHDRAWAPPLICATION': {
      console.log('KB: Inside student withdraw application');
      console.log('Message:', msg);
      studentWithdrawApplication(msg.data, callback);
      break;
    }
    case 'UPLOADCOMPANYPICTURES': {
      console.log('KB: Inside student upload company pictures');
      console.log('Message:', msg);
      studentUploadCompanyPictures(msg.data, callback);
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
