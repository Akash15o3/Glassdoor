const Interviews = require('../Models/InterviewModel');
const Students = require('../Models/StudentModel');

function addNewInterview(data, callback) {
  const {
    cname, overallexp, jobtitle, description, difficulty, offerstatus, interviewqna,
  } = data;
  const newInterview = new Interviews({
    cname,
    overallexp,
    jobtitle,
    description,
    difficulty,
    offerstatus,
    interviewqna,
  });
  Students.findById(data.stid, (error, student) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Student id does not exist',
      };
      callback(null, response);
    } else {
      student.stinterviews.push({
        cname,
        overallexp,
        jobtitle,
        description,
        difficulty,
        offerstatus,
        interviewqna,
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

  newInterview.save((error, interview) => {
    if (error) {
      console.log(error);
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error saving interview',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(interview),
      };
      callback(null, response);
    }
  });
}

function getAllInterviews(data, callback) {
  Interviews.find({}, (error, interviews) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching interviews',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(interviews),
      };
      callback(null, response);
    }
  });
}

function addNewQuestion(data, callback) {
  Interviews.findById(data.id, (error, interview) => {
    // eslint-disable-next-line prefer-const
    // let qna = interview.interviewqna === undefined ? [] : [ ...interview.interviewqna ];
    const newqna = {
      question: data.question,
      answers: [],
    };
    interview.interviewqna.push(newqna);
    interview.save((err, updatedInterview) => {
      if (err) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error saving interview',
        };
        callback(null, response);
      } else {
        const response = {
          status: 200,
          header: 'application/json',
          content: JSON.stringify(updatedInterview),
        };
        callback(null, response);
      }
    });
  });
}

/*
function addAnswer(data, callback) {
  Interviews.findById(data.id, (error, interview) => {
    // eslint-disable-next-line prefer-const
    // let qna = interview.interviewqna === undefined ? [] : [ ...interview.interviewqna ];
    // const newqna = {
    //   question: data.question,
    //   answers: [],
    // };
    // interview.interviewqna.push(newqna);
    // eslint-disable-next-line no-underscore-dangle
    let qna = interview.innterviewqna.filter((item) => item._id === data.qid);
    qna.answers.push(data.answer);
    interview.save((err, updatedInterview) => {
      if (err) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error saving interview',
        };
        callback(null, response);
      } else {
        const response = {
          status: 200,
          header: 'application/json',
          content: JSON.stringify(updatedInterview),
        };
        callback(null, response);
      }
    });
  });
}
*/

function getCompanyInterviews(data, callback) {
  Interviews.find({ cname: data.cname }, (error, interviews) => {
    console.log('Kafka backend interviews: ', interviews);
    console.log('kafka backend data: ', data);
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching interviews',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(interviews),
      };
      callback(null, response);
    }
  });
}
function handleRequest(msg, callback) {
  console.log('=>', msg.subTopic);
  switch (msg.subTopic) {
    case 'ADDNEW': {
      console.log('KB: Inside add new interview');
      console.log('Message:', msg);
      addNewInterview(msg.data, callback);
      break;
    }

    case 'GETALL': {
      console.log('KB: Inside add new question to interview');
      console.log('Message:', msg);
      getAllInterviews(msg.data, callback);
      break;
    }

    case 'ADDNEWQUESTION': {
      console.log('KB: Inside add new question to interview');
      console.log('Message:', msg);
      addNewQuestion(msg.data, callback);
      break;
    }

    case 'ADDANSWER': {
      console.log('KB: Inside add new question to interview');
      console.log('Message:', msg);
      addAnswer(msg.data, callback);
      break;
    }
    case 'GETINTERVIEWS': {
      console.log('KB: Inside get company interviews');
      console.log('Message:', msg);
      getCompanyInterviews(msg.data, callback);
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
