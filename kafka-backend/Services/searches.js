const Companies = require('../Models/CompanyModel');
const Jobs = require('../Models/JobModel');

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
  if (data.skip === undefined) {
    data.skip = 0;
  }
  if (data.limit === undefined) {
    data.limit = 10;
  }
  // data.limit = 10;
  Companies.find({ cname: regex })
    .skip(data.skip * data.limit)
    .limit(data.limit)
    .exec((error, companies) => {
      if (error) {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error fetching companies',
        };
        callback(null, response);
      } else if (companies) {
        const response = {
          status: 200,
          header: 'application/json',
          content: JSON.stringify(companies),
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

function getNumCompanySearchPages(data, callback) {
  const regex = new RegExp(escapeRegex(data.cname), 'gi');
  Companies.find({ cname: regex }, (err, companies) => {
    if (err) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching number of company search results pages',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify({ numCompanies: companies.length }),
      };
      callback(null, response);
    }
  });
}

function searchJobsByTitle(data, callback) {
  console.log('Inside search jobs kafka BE');
  const regex = new RegExp(escapeRegex(data.jtitle), 'gi');
  if (data.skip === undefined) {
    data.skip = 0;
  }
  if (data.limit === undefined) {
    data.limit = 10;
  }
  // data.limit = 10;
  // { jtitle: regex }
  Jobs.find({ jtitle: regex })
    .skip(data.skip * data.limit)
    .limit(data.limit)
    .exec((error, jobs) => {
      if (error) {
        console.log(error);
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error fetching Jobs',
        };
        callback(null, response);
      } else if (jobs) {
        jobs.sort((a, b) => Date.parse(a.jposted) - Date.parse(b.jposted));
        const response = {
          status: 200,
          header: 'application/json',
          content: JSON.stringify(jobs),
        };
        callback(null, response);
      } else {
        const response = {
          status: 401,
          header: 'text/plain',
          content: 'Error fetching jobs',
        };
        callback(null, response);
      }
    });
}

function handleRequest(msg, callback) {
  console.log('=>', msg.subTopic);
  switch (msg.subTopic) {
    case 'SEARCHCOMPANIESBYNAME': {
      console.log('KB: Inside search companies by name');
      console.log('Message:', msg);
      searchCompaniesByName(msg.data, callback);
      break;
    }
    case 'COMPANYSEARCHPAGES': {
      console.log('KB: Inside get company search results pages');
      console.log('Message:', msg);
      getNumCompanySearchPages(msg.data, callback);
      break;
    }
    case 'SEARCHJOBSBYTITLE': {
      console.log('KB: Inside search jobs by title');
      console.log('Message:', msg);
      searchJobsByTitle(msg.data, callback);
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
