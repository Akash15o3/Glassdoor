const redis = require('redis');
const Reviews = require('../Models/ReviewModel');
const Students = require('../Models/StudentModel');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_CLIENT);

client.on('connect', () => {
  console.error('Connected to Redis');
});

client.on('error', (error) => {
  console.error(error);
});

function addReview(data, callback) {
  const newReview = new Reviews({
    cname: data.cname,
    cid: data.cid,
    overallRating: data.overallRating,
    rheadline: data.rheadline,
    rpros: data.rpros,
    rcons: data.rcons,
    radvice: data.radvice,
    rrecommended: data.rrecommended,
    routlook: data.routlook,
    rceoapprove: data.rceoapprove,
    rhelpful: data.rhelpful,
    rstudent: {
      stid: data.stid,
      stname: data.stname,
    },
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
      // eslint-disable-next-line no-underscore-dangle
      student.streviews.push(newReview._id);
      student.save((err) => {
        if (err) {
          const response = {
            status: 401,
            header: 'text/plain',
            content: 'Error modifyinng student',
          };
          callback(null, response);
        } else {
          newReview.save((e, review) => {
            if (e) {
              const response = {
                status: 401,
                header: 'text/plain',
                content: 'Error saving review',
              };
              callback(null, response);
            } else {
              // Save this review id in student collection
              const response = {
                status: 200,
                header: 'application/json',
                content: JSON.stringify(review),
              };
              callback(null, response);
            }
          });
        }
      });
    }
  });
}

function getByCompnayName(data, callback) {
  if (data.skip === undefined) {
    data.skip = 0;
  }
  // if (data.limit === undefined) {
  //   data.limit = 10;
  // }
  data.limit = 5;
  console.log('Req Body: ', data);
  const redisKey = `${data.cname}_Reviews_${data.skip}`;
  client.set('test', 'foobar', (error, response) => {
    if (error) {
      console.log('==> could not save to redis', error);
    } else {
      console.log('==> ', response);
    }
  });

  client.get(redisKey, (err, reply) => {
    if (err) {
      console.log(err);
    }
    if (reply !== null) {
      // Response exists inn the cache
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.parse(JSON.stringify(reply)),
      };
      console.log('Sending 200 from Redis');
      callback(null, response);
    } else {
      // Response not in cache--fetch from mongo
      Reviews.find({ cname: data.cname })
        .skip(data.skip * data.limit)
        .limit(data.limit)
        .exec((error, reviews) => {
          if (error) {
            const response = {
              status: 401,
              header: 'text/plain',
              content: 'Error fetching reviews',
            };
            callback(null, response);
          } else {
            const redisValue = JSON.stringify(reviews);
            client.set(redisKey, redisValue, (e, r) => {
              if (e) {
                console.log(e);
              } else {
                console.log('Cache successful: ', r);
              }
            });
            console.log('Sending 200 from Mongo');
            const response = {
              status: 200,
              header: 'application/json',
              content: JSON.stringify(reviews),
            };
            callback(null, response);
          }
        });
    }
  });
}

function getByCompnayId(data, callback) {
  Reviews.find({ cid: data.cid }, (error, reviews) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }

    return callback(null, reviews);
  });
}

function handleRequest(msg, callback) {
  switch (msg.subTopic) {
    case 'ADDREVIEW': {
      console.log('KB: Inside add review');
      console.log('Message:', msg);
      addReview(msg.data, callback);
      break;
    }
    case 'GETREVIEWBYCNAME': {
      console.log('KB: Inside get review by company name');
      console.log('Message:', msg);
      getByCompnayName(msg.data, callback);
      break;
    }
    case 'GETREVIEWBYCID': {
      console.log('KB: Inside get review by company name');
      console.log('Message:', msg);
      getByCompnayId(msg.data, callback);
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
