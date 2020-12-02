const Jobs = require('../Models/JobModel');
const Application = require('../Models/ApplicationModel');
const Student = require('../Models/StudentModel');

const options = {
  useFindAndModify: false,
  new: true,
};
function getAllJobs(data, callback) {
  Jobs.find({}, (error, jobs) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching jobs',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(jobs),
      };
      callback(null, response);
    }
  });
}

// function getOneJob(data, callback) {
//   Jobs.findById(data.id, (error, job) => {
//     if (error) {
//       const response = {
//         status: 401,
//         header: "text/plain",
//         content: "Error fetching jobs",
//       };
//       callback(null, response);
//     } else {
//       const response = {
//         status: 200,
//         header: "application/json",
//         content: JSON.stringify(job),
//       };
//       callback(null, response);
//     }
//   });
// }

function getOneJob(data, callback) {
  Jobs.find({ cname: data.cname }, (error, job) => {
    console.log('Kafka backend job: ', job);
    console.log('kafka backend data: ', data);
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching jobs',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(job),
      };
      console.log('kafka be job response: ', response.content);
      callback(null, response);
    }
  });
}

// Get Applicants for job
function getJobApplicants(data, callback) {
  console.log('INSIDE GET JOB APPLICANTS DATA: ', data);
  Application.find({ ajobid: data.ajobid }, (error, job) => {
    console.log('INSIDE APPLICANTS.FIND');
    if (error) {
      console.log('GET JOB APPLICANTS ERROR ');
      console.log(error);
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching jobs',
      };
      callback(null, response);
    } else {
      console.log('SUCCESS APPLICANTS');
      console.log(job);
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(job),
      };
      console.log('job applicants response: ', response);
      callback(null, response);
    }
  });
}

// function addNewJob(data, callback) {
//   const { id, ...updateInfo } = data;
//   Jobs.findByIdAndUpdate(id, updateInfo, options, (error, results) => {
//     if (error) {
//       const response = {
//         status: 401,
//         header: "text/plain",
//         content: "Error updating Job ",
//       };
//       callback(null, response);
//     } else {
//       const response = {
//         status: 200,
//         header: "application/json",
//         content: JSON.stringify(results),
//       };
//       callback(null, response);
//     }
//   });
// }

function addNewJob(data, callback) {
  const now = new Date();
  const jsonDate = now.toJSON();
  const posted = new Date(jsonDate);

  const newJob = new Jobs({
    cname: data.cname,
    crating: data.averageRating,
    jtitle: data.jtitle,
    jindustry: data.jindustry,
    jcity: data.jcity,
    jstate: data.jstate,
    jcountry: data.jcountry,
    jzip: data.jzip,
    jaddress: data.jaddress,
    jlatitude: ' ',
    jlongitude: ' ',
    jwork: data.jwork,
    jposted: data.jposted,
    jpostedBy: ' ',
    jdescription: data.jdescription,
    jresponsibilities: data.jresponsibilities,
    jqualifications: data.jqualifications,
    jsalary: data.jsalary,
  });
  console.log('new job in kafka', newJob);
  newJob.save((error, job) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error saving job',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(job),
      };
      callback(null, response);
    }
  });
}

function updateApplicantStatus(data, callback) {
  const updateStatus = {
    astatus: data.astatus,
  };

  Application.updateOne(
    { ajobid: data.ajobid, aapplierid: data.aapplierid },
    { $set: updateStatus },
    (error, results) => {
      if (error) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error updating Job ',
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
    },
  );
}

function getApplierDemographics(data, callback) {
  Student.find({ _id: data.aapplierid }, (error, job) => {
    console.log('Kafka backend job: ', job);
    console.log('kafka backend data: ', data);
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error getApplierDemographics',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(job),
      };
      console.log('kafka be job response getApplierDemographics: ', response.content);
      callback(null, response);
    }
  });
}

function handleRequest(msg, callback) {
  console.log('msg.subTopic', msg.subTopic);
  switch (msg.subTopic) {
    case 'GETALL': {
      console.log('KB: Inside get all jobs');
      console.log('Message:', msg);
      getAllJobs(msg.data, callback);
      break;
    }

    case 'GETONE': {
      console.log('KB: Inside get one job');
      console.log('Message:', msg);
      getOneJob(msg.data, callback);
      break;
    }

    case 'ADDNEWJOB': {
      console.log('KB: Inside create new job');
      console.log('Message:', msg);
      addNewJob(msg.data, callback);
      break;
    }

    case 'GETAPPLICANTS': {
      console.log('KB: Inside get applicants for this job');
      console.log('Message:', msg);
      getJobApplicants(msg.data, callback);
      break;
    }

    case 'UPDATEAPPLICANTSTATUS': {
      console.log('KB: Inside update applicant status');
      console.log('Message:', msg);
      updateApplicantStatus(msg.data, callback);
      break;
    }

    case 'GETAPPLIERDEMOGRAPHICS': {
      console.log('KB: Inside GETAPPLIERDEMOGRAPHICS');
      console.log('Message:', msg);
      getApplierDemographics(msg.data, callback);
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
