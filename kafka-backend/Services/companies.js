const Companies = require("../Models/CompanyModel");
const Student = require("../Models/StudentModel");
const redis = require('redis');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_CLIENT);

const options = {
  useFindAndModify: false,
  new: true,
};
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

// function updateProfile(data, callback) {
//   const updateData = {
//     clocation: data.clocation,
//     clatitude: data.clatitude,
//     clongitude: data.clongitude,
//     cwebsite: data.cwebsite,
//     csize: data.csize,
//     ctype: data.ctype,
//     crevenue: data.crevenue,
//     cindustry: data.cindustry,
//     cheadquarters: data.cheadquarters,
//     cfounded: data.cfounded,
//     cdescription: data.cdescription,
//     cmission: data.cmission,
//     cceo: data.cceo,
//   };
//   Companies.findByIdAndUpdate(
//     data.cid,
//     updateData,
//     { new: true },
//     (error, companyUpdated) => {
//       if (error) {
//         const response = {
//           status: 401,
//           header: "text/plain",
//           content: "Error updating company profile",
//         };
//         callback(null, response);
//       } else {
//         const response = {
//           status: 200,
//           header: "application/json",
//           content: JSON.stringify(companyUpdated),
//         };
//         callback(null, response);
//       }
//     }
//   );
// }

function updateCompanyProfile(data, callback) {
  const { id, ...updateInfo } = data;
  Companies.findByIdAndUpdate(id, updateInfo, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating Company profile',
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
function uploadCompanyProfilePicture(data, callback) {
  const { id, cphoto } = data;
  Companies.findByIdAndUpdate(id, { cphoto }, options, (error, results) => {
    if (error) {
      const response = {
        status: 401,
        header: "text/plain",
        content: "Error uploading Company profile picture",
      };
      callback(null, response);
    } else {
      const response = {
        status: 200,
        header: "text/plain",
        content: cphoto,
      };
      callback(null, response);
    }
  });
}

function addFtReview(data, callback) {
  console.log("inside addftReviews: ", data)

  Companies.findById(data.cid, (error, company) => {
    console.log("inside findbyID addftReviews: ", company)
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error updating company profile',
      };
      callback(null, response);
    } else if (company.cfeatured.length < 2) {
      // company.cfeatured.push(data.reviewid);
      company.cfeatured.push(data.rreplyid);
      console.log("inside addftReviews: ", company.cfeatured)
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
      company.cfeatured = company.cfeatured.filter(
        (item) => item !== data.reviewid,
      );
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

function specificCompany(data, callback) {
  console.log('Specific company hit');
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }
    // update views for company
    const redisKey = `Views_${data.cid}`;
    client.get(redisKey, (err, reply) => {
      if (err) {
        console.log(err);
      }
      if (reply !== null) {
        // Response exists in the cache
        const updatedReply = +reply + 1;
        client.set(redisKey, updatedReply, 'EX', 86400, (e, r) => {
          if (e) {
            console.log('Could not cache');
          } else {
            console.log('Cache successful: ', r);
          }
        });
      } else {
        // set timeout to 24h x 60m x 60s (24 h)
        client.set(redisKey, 1, 'EX', 86400, (e, r) => {
          if (e) {
            console.log('Could not cache');
          } else {
            console.log('Cache successful: ', r);
          }
        });
      }
    });
    return callback(null, company);
  });
}

function specificStudent(data, callback) {
  // const { id, ...updateInfo } = data;
  console.log("data.aapplierid: ", data.aapplierid)
  Student.find({_id: data.aapplierid}, (error, results) => {
    console.log("INSIDE FIND results specific student: ", results)
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      const response = {
        status: 200,
        header: "application/json",
        content: JSON.stringify(results),
      };
      callback(null, response);
    }
  });
}

function getNumReviews(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else {
      const response = {
        status: 401,
        header: 'application/json',
        content: JSON.stringify({ reviews: company.reviewCount }),
      };
      callback(null, response);
    }
  });
}

function getNumSalReviews(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else {
      const response = {
        status: 401,
        header: 'application/json',
        content: JSON.stringify({ salaries: company.salaryCount }),
      };
      callback(null, response);
    }
  });
}

function getNumIntReviews(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else {
      const response = {
        status: 401,
        header: 'application/json',
        content: JSON.stringify({ interviews: company.interviewCount }),
      };
      callback(null, response);
    }
  });
}

function getAvgRating(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else {
      const response = {
        status: 401,
        header: 'application/json',
        content: JSON.stringify({ averageRating: company.averageRating }),
      };
      callback(null, response);
    }
  });
}

function handleRequest(msg, callback) {
  console.log("*******Message subtopic*******:", msg.subTopic)
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
      // updateProfile(msg.data, callback);
      updateCompanyProfile(msg.data, callback);
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
      // addPhoto(msg.data, callback);
      uploadCompanyProfilePicture(msg.data, callback);
      break;
    }

    case 'SPECIFICCOMPANY': {
      console.log('KB: Inside specific company for company');
      console.log('Message:', msg);
      specificCompany(msg.data, callback);
      break;
    }

    case "SPECIFICSTUDENT": {
      console.log("KB: Inside specific student ");
      console.log("Message:", msg);
      specificStudent(msg.data, callback);
      break;
    }

    case 'GETNUMREVIEWS': {
      console.log('KB: Get number of reviews');
      getNumReviews(msg.data, callback);
      break;
    }

    case 'GETNUMSALARY': {
      console.log('KB: Get number of salary reviews');
      getNumSalReviews(msg.data, callback);
      break;
    }

    case 'GETNUMINT': {
      console.log('KB: Get number of interview reviews');
      getNumIntReviews(msg.data, callback);
      break;
    }

    case 'AVGRATING': {
      console.log('KB: Get number of interview reviews');
      getAvgRating(msg.data, callback);
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
