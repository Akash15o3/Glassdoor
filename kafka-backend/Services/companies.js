const Companies = require('../Models/CompanyModel');

function getAllCompanies(data, callback) {
  Companies.find({}, (error, companies) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching companies',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(companies),
      };
      callback(null, response);
    }
  });
}

function getOneCompany(data, callback) {
  Companies.findById(data.id, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(company),
      };
      callback(null, response);
    }
  });
}

function updateProfile(data, callback) {
  const updateData = {
    clocation: data.clocation,
    clatitude: data.clatitude,
    clongitude: data.clongitude,
    cwebsite: data.cwebsite,
    csize: data.csize,
    ctype: data.ctype,
    crevenue: data.crevenue,
    cindustry: data.cindustry,
    cheadquarters: data.cheadquarters,
    cfounded: data.cfounded,
    cdescription: data.cdescription,
    cmission: data.cmission,
    cceo: data.cceo,
  };
  Companies.findByIdAndUpdate(data.cid, updateData, { new: true }, (error, companyUpdated) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating company profile',
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(companyUpdated),
      };
      callback(null, response);
    }
  });
}

function addFtReview(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating company profile',
      };
      callback(null, response);
    } else if (company.cfeatured.length < 2) {
      company.cfeatured.push(data.reviewid);
      company.save((err, companyUpdated) => {
        if (err) {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Error adding review to featured',
          };
          callback(null, response);
        } else {
          const response = {
            status: 200,
            header: 'application/json',
            content: JSON.stringify(companyUpdated),
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Please delete from existing featured reviews first',
      };
      callback(null, response);
    }
  });
}

function deleteFtReview(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else if (company.cfeatured.length > 0) {
      console.log('=> ', data.reviewid);
      company.cfeatured = company.cfeatured.filter((item) => item !== data.reviewid);
      // company.cfeatured = [];
      console.log('fil:', company.cfeatured);
      company.save((err, companyUpdated) => {
        if (err) {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Error deleting review from featured',
          };
          callback(null, response);
        } else {
          const response = {
            status: 200,
            header: 'application/json',
            content: JSON.stringify(companyUpdated),
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Nothing to delete',
      };
      callback(null, response);
    }
  });
}

function addPhoto(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else if (company) {
      const photoObj = {
        // URL will be provided by AWS-SDK
        url: data.url,
        stname: data.stname,
        stid: data.stid,
      };
      company.cphotos.push(photoObj);
      console.log('new cphotos:', company.cphotos);
      company.save((err, companyUpdated) => {
        if (err) {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Error adding photo',
          };
          callback(null, response);
        } else {
          const response = {
            status: 200,
            header: 'application/json',
            content: JSON.stringify(companyUpdated),
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error adding photo',
      };
      callback(null, response);
    }
  });
}

function specificCompany(data, callback) {
  Companies.findOne({ cname: data.cname, clocation: data.clocation }, (error, company) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }

    return callback(null, company);
  });
}

function handleRequest(msg, callback) {
  switch (msg.subTopic) {
    case 'GETALL': {
      console.log('KB: Inside get all companies');
      console.log('Message:', msg);
      getAllCompanies(msg.data, callback);
      break;
    }

    case 'GETONE': {
      console.log('KB: Inside get one company');
      console.log('Message:', msg);
      getOneCompany(msg.data, callback);
      break;
    }

    case 'UPDATEPROFILE': {
      console.log('KB: Inside update company profile');
      console.log('Message:', msg);
      updateProfile(msg.data, callback);
      break;
    }

    case 'ADDFTREVIEW': {
      console.log('KB: Inside add featured review to company');
      console.log('Message:', msg);
      addFtReview(msg.data, callback);
      break;
    }

    case 'DELFTREVIEW': {
      console.log('KB: Inside delete featured review to company');
      console.log('Message:', msg);
      deleteFtReview(msg.data, callback);
      break;
    }

    case 'ADDPHOTO': {
      console.log('KB: Inside delete featured review to company');
      console.log('Message:', msg);
      addPhoto(msg.data, callback);
      break;
    }

    case 'SPECIFICCOMPANY': {
      console.log('KB: Inside specific company for company');
      console.log('Message:', msg);
      specificCompany(msg.data, callback);
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
