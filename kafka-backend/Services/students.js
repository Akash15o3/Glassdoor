const Students = require('../Models/StudentModel');

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
