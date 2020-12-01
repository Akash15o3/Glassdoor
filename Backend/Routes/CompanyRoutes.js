const express = require('express');
const kafka = require('../kafka/client');

const Router = express.Router();
const upload = require('../Config/s3');
// Get all companies
Router.get('/', (request, response) => {
  console.log('\nEndpoint GET: get all companies');
  console.log('Req Body: ', request.body);
  kafka.make_request(
    'companiesTopic',
    'GETALL',
    request.body,
    (err, result) => {
      console.log('Get all result ', result);
      if (err) {
        console.log('Companies getall Kafka error');
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        response.end('Companies getall Kafka error');
      } else {
        response.writeHead(result.status, {
          'Content-Type': result.header,
        });
        response.end(result.content);
      }
    },
  );
});

// Get one company
Router.get('/:id', (request, response) => {
  console.log('\nEndpoint GET: get company');
  console.log('Req Body: ', request.body);
  const data = { ...request.params };

  kafka.make_request('companiesTopic', 'GETONE', data, (err, result) => {
    console.log('Get one company result ', result);
    if (err) {
      console.log('Companies getone Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Companies getone Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Update company's profile details
// please refer model: clocation-cceo can be updated here
// Router.put("/profile/:cid", (request, response) => {
//   console.log("\nEndpoint PUT: Update company profile");
//   console.log("Req Body: ", request.body);
//   const data = { ...request.params, ...request.body };

//   kafka.make_request("companiesTopic", "UPDATEPROFILE", data, (err, result) => {
//     console.log("Update company profile result ", result);
//     if (err) {
//       console.log("Update company profile Kafka error");
//       response.writeHead(401, {
//         "Content-Type": "text/plain",
//       });
//       response.end("Update company profile Kafka error");
//     } else {
//       response.writeHead(result.status, {
//         "Content-Type": result.header,
//       });
//       console.log(result.content);
//       response.end(result.content);
//     }
//   });
// });

Router.post('/updateProfile', (request, response) => {
  console.log('\nEndpoint POST: post update Company profile');
  console.log('Req Body: ', request.body);
  const data = { ...request.body };
  kafka.make_request('companiesTopic', 'UPDATEPROFILE', data, (err, result) => {
    console.log('Update Company Profile by id result', result);
    if (err) {
      console.log('Update Company Profile by id Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Update Company Profile by id Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

Router.post(
  '/uploadProfilePicture',
  // upload.array(),
  upload.single('file'),
  (request, response) => {
    console.log('\nEndpoint POST: post upload Company profile picture');
    console.log('Req Body: ', request.body);
    const data = { id: request.body.id, cphoto: request.file.location };
    kafka.make_request('companiesTopic', 'ADDPHOTO', data, (err, result) => {
      console.log('Upload Company Profile Picture by id result', result);
      if (err) {
        console.log('Upload Company Profile Picture by id Kafka error');
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        response.end('Upload Company Profile Picture by id Kafka error');
      } else {
        response.writeHead(result.status, {
          'Content-Type': result.header,
        });
        response.end(result.content);
      }
    });
  },
);

// Update company--Add review to featured
// Router.put('/profile/addFtReview/:cid', (request, response) => {
//   console.log('\nEndpoint PUT: Add featured review');
//   console.log('Req Body: ', request.body);
//   const data = { ...request.params, ...request.body };

//   kafka.make_request('companiesTopic', 'ADDFTREVIEW', data, (err, result) => {
//     console.log('Add featured review result ', result);
//     if (err) {
//       console.log('Add featured review Kafka error');
//       response.writeHead(401, {
//         'Content-Type': 'text/plain',
//       });
//       response.end('Add featured review Kafka error');
//     } else {
//       response.writeHead(result.status, {
//         'Content-Type': result.header,
//       });
//       response.end(result.content);
//     }
//   });
// });

// Delete review from featured
Router.put('/profile/delFtReview/:cid', (request, response) => {
  console.log('\nEndpoint PUT: Delete featured review');
  console.log('Req Body: ', request.body);
  const data = { ...request.params, ...request.body };

  kafka.make_request('companiesTopic', 'DELFTREVIEW', data, (err, result) => {
    console.log('Delete featured review result ', result);
    if (err) {
      console.log('Delete featured review Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Delete featured review Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});

// Update company-- Add photos
// Router.put("/profile/addPhoto/:cid", (request, response) => {
//   console.log("\nEndpoint PUT: Add photo");
//   console.log("Req Body: ", request.body);
//   const data = { ...request.params, ...request.body };

//   kafka.make_request("companiesTopic", "ADDPHOTO", data, (err, result) => {
//     console.log("Company add photo result ", result);
//     if (err) {
//       console.log("Company add photo Kafka error");
//       response.writeHead(401, {
//         "Content-Type": "text/plain",
//       });
//       response.end("Company add photo Kafka error");
//     } else {
//       response.writeHead(result.status, {
//         "Content-Type": result.header,
//       });
//       console.log(result.content);
//       response.end(result.content);
//     }
//   });
// });

Router.post('/specificCompany', (request, response) => {
  console.log('Req Body: ', request.body);
  const data = { ...request.params, ...request.body };

  kafka.make_request(
    'companiesTopic',
    'SPECIFICCOMPANY',
    data,
    (err, result) => {
      if (err) {
        console.log('Company specific company Kafka error');
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        response.end('Company specific company Kafka error');
      } else {
        response.send(result);
      }
    },
  );
});

Router.get('/specificStudent', (request, response) => {
  console.log('Req Body: ', request.query);
  const data = { ...request.params, ...request.body };

  kafka.make_request(
    'companiesTopic',
    'SPECIFICSTUDENT',
    request.query,
    (err, result) => {
      if (err) {
        console.log('Get SPECIFIC STUDENT Kafka error');
        response.writeHead(401, {
          'Content-Type': 'text/plain',
        });
        response.end('Get SPECIFIC STUDENT Kafka error');
      } else {
        response.writeHead(result.status, {
          'Content-Type': result.header,
        });
        response.end(result.content);
      }
    },
  );
});
// Get number of reviews
Router.get('/:id/numPhotos', (request, response) => {
  console.log('\nEndpoint GET: Get number of company Photos');
  console.log('Req Body: ', request.body);
  const data = { ...request.params };
  kafka.make_request('companiesTopic', 'NUMPHOTOS', data, (err, result) => {
    console.log('Get number of company Photos result ', result);
    if (err) {
      console.log('Get number of company Photos Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Get number of company Photos Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      response.end(result.content);
    }
  });
});



//Add featured review
Router.post('/addFeaturedReview', (request, response) => {
  console.log('\nEndpoint POST: Reply to a review');
  console.log('Req Body: ', request.body);
  kafka.make_request('companiesTopic', 'ADDFTREVIEW', request.body, (err, result) => {
    if (err) {
      console.log('Reviews ReplyReview Kafka error');
      response.writeHead(401, {
        'Content-Type': 'text/plain',
      });
      response.end('Reviews addreview Kafka error');
    } else {
      response.writeHead(result.status, {
        'Content-Type': result.header,
      });
      // console.log(result.content);
      response.end(result.content);
    }
  });
});


/*
// Get number of reviews
Router.get('/numReviews', (request, response) => {

});

// Get number of salary reviews
Router.get('/numSalReviews', (request, response) => {

});

// Get number of interview reviewss
Router.get('/numIntReviews', (request, response) => {

});
*/

// get average rating

module.exports = Router;
