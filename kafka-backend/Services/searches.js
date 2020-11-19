const Companies = require('../Models/CompanyModel');

function escapeRegex(text) {
  if (text !== undefined) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  // eslint-disable-next-line consistent-return, no-useless-return
  return;
}

function searchCompaniesByName(data, callback) {
  console.log('Inside search companies kafka BE');
  const regex = new RegExp(escapeRegex(data.cname), 'gi');
  Companies.find({ cname: regex }, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching companies',
      };
      callback(null, response);
    } else if (company) {
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
        content: 'Error fetching companies',
      };
      callback(null, response);
    }
  });
}

function handleRequest(msg, callback) {
  console.log('=>', msg.subTopic);
  switch (msg.subTopic) {
    case 'SEARCHCOMPANIESBYNAME': {
      console.log('KB: Inside get companies by name');
      console.log('Message:', msg);
      searchCompaniesByName(msg.data, callback);
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
