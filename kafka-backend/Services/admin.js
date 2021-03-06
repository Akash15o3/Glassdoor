const redis = require('redis');
const Ioredis = require('ioredis');
const Reviews = require('../Models/ReviewModel');
const Companies = require('../Models/CompanyModel');
const Students = require('../Models/StudentModel');
const Jobs = require('../Models/StudentModel');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_CLIENT);

client.on('connect', () => {
  console.error('Connected to Redis');
});

client.on('error', (error) => {
  console.error(error);
});

function escapeRegex(text) {
  if (text !== undefined) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
  // eslint-disable-next-line consistent-return, no-useless-return
  return;
}

// Get all reviews for a company
// filter: 'All', 'Pending', 'Approved', 'Rejected'
function getByCompanyName(data, callback) {
  if (data.skip === undefined) {
    // eslint-disable-next-line no-param-reassign
    data.skip = 0;
  }
  if (data.limit === undefined) {
    // eslint-disable-next-line no-param-reassign
    data.limit = 5;
  }

  let toFind;
  let redisFilter;
  if (data.filter === undefined || data.filter === 'All') {
    toFind = {
      cname: data.cname,
    };
    redisFilter = 'All';
  } else {
    toFind = {
      cname: data.cname,
      rapproval: data.filter,
    };
    redisFilter = data.filter;
  }

  const redisKey = `${data.cname}_Reviews_${redisFilter}_${data.skip}_${data.limit}`;

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
      Reviews.find(toFind)
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

            // set expiry timer to 5 minutes
            client.set(redisKey, redisValue, 'EX', 300, (e, r) => {
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

function getByCompanyId(data, callback) {
  if (data.skip === undefined) {
    // eslint-disable-next-line no-param-reassign
    data.skip = 0;
  }
  if (data.limit === undefined) {
    // eslint-disable-next-line no-param-reassign
    data.limit = 5;
  }

  let toFind;
  let redisFilter;
  if (data.filter === undefined || data.filter === 'All') {
    toFind = {
      cid: data.cid,
    };
    redisFilter = 'All';
  } else {
    toFind = {
      cid: data.cid,
      rapproval: data.filter,
    };
    redisFilter = data.filter;
  }

  const redisKey = `${data.cid}_Reviews_${redisFilter}_${data.skip}_${data.limit}`;

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
      Reviews.find(toFind)
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

            // set expiry timer to 5 minutes
            client.set(redisKey, redisValue, 'EX', 300, (e, r) => {
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

const updateCompany = function update(cid, rating) {
  Companies.findById(cid, (error, company) => {
    if (error) {
      return false;
    }
    // eslint-disable-next-line max-len, no-param-reassign
    const averageRating = (company.averageRating * company.reviewCount + rating) / (company.reviewCount + 1);
    company.averageRating = averageRating;
    Jobs.update({ cname: company.cname }, { $set: { crating: averageRating } });
    // eslint-disable-next-line no-param-reassign, no-plusplus
    company.reviewCount++;
    company.save();
    return true;
  });
};

const updateStudent = function update(stid, review) {
  Students.findById(stid, (error, student) => {
    if (error) {
      return false;
    }
    student.streviewsaccepted++;
    student.save();
    return true;
  });
};

// Delete Redis keys using pattern
// Ref: https://medium.com/oyotech/finding-and-deleting-the-redis-keys-by-pattern-the-right-way-123629d7730
function approveReview(data, callback) {
  Reviews.findByIdAndUpdate(data.rid, { rapproval: 'Approved' }, { new: true }, (error, review) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching reviews',
      };
      callback(null, response);
    } else if (review) {
      // Delete all reviews cached in redis to prevent stale data in response
      const redisDel = new Ioredis(process.env.REDIS_PORT, process.env.REDIS_CLIENT);
      redisDel.keys('*Reviews*').then((keys) => {
        // Use pipeline instead of sending
        // one command each time to improve the
        // performance.
        console.log('keys:', keys);
        const pipeline = redisDel.pipeline();
        keys.forEach((key) => {
          console.log('key:', key);
          pipeline.del(key);
        });
        return pipeline.exec();
      });
      updateCompany(review.cid, review.overallRating);
      updateStudent(review.rstudent.stid, review);
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(review),
      };
      callback(null, response);
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching reviews',
      };
      callback(null, response);
    }
  });
}

function rejectReview(data, callback) {
  Reviews.findByIdAndUpdate(data.rid, { rapproval: 'Rejected' }, { new: true }, (error, review) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching reviews',
      };
      callback(null, response);
    } else if (review) {
      // Delete all reviews cached in redis to prevent stale data in response
      const redisDel = new Ioredis(process.env.REDIS_PORT, process.env.REDIS_CLIENT);
      redisDel.keys('*Reviews*').then((keys) => {
        // Use pipeline instead of sending
        // one command each time to improve the
        // performance.
        console.log('keys:', keys);
        const pipeline = redisDel.pipeline();
        keys.forEach((key) => {
          console.log('key:', key);
          pipeline.del(key);
        });
        return pipeline.exec();
      });
      const response = {
        status: 200,
        header: 'application/json',
        content: JSON.stringify(review),
      };
      callback(null, response);
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching reviews',
      };
      callback(null, response);
    }
  });
}

function approvePhoto(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else if (company) {
      // eslint-disable-next-line eqeqeq, no-underscore-dangle
      const photoIndex = company.cphotos.findIndex((photo) => photo._id == data.pid);

      // eslint-disable-next-line no-param-reassign
      company.cphotos[photoIndex].approval = 'Approved';
      // eslint-disable-next-line max-len
      Companies.findByIdAndUpdate(data.cid, { cphotos: [...company.cphotos] }, { new: true }, (err, cmpny) => {
        if (err) {
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
            content: JSON.stringify(cmpny),
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    }
  });
}

function rejectPhoto(data, callback) {
  Companies.findById(data.cid, (error, company) => {
    if (error) {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    } else if (company) {
      // eslint-disable-next-line eqeqeq, no-underscore-dangle
      const photoIndex = company.cphotos.findIndex((photo) => photo._id == data.pid);

      // eslint-disable-next-line no-param-reassign
      company.cphotos[photoIndex].approval = 'Rejected';
      // eslint-disable-next-line max-len
      Companies.findByIdAndUpdate(data.cid, { cphotos: [...company.cphotos] }, { new: true }, (err, cmpny) => {
        if (err) {
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
            content: JSON.stringify(cmpny),
          };
          callback(null, response);
        }
      });
    } else {
      const response = {
        status: 401,
        header: 'text/plain',
        content: 'Error fetching company',
      };
      callback(null, response);
    }
  });
}

function getReviewsPerDay(data, callback) {
  console.log('here');

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  Reviews.countDocuments({ rdate: { $gte: yesterday } }, (error, count) => {
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
        content: JSON.stringify(count),
      };
      callback(null, response);
    }
  });
}

// Get top 5 most reviewed companies
function getMostReviewed(data, callback) {
  Companies.find({})
    .sort({ reviewCount: -1 })
    .limit(5)
    .exec((error, companies) => {
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

function getBestAvg(data, callback) {
  Companies.find({})
    .sort({ averageRating: -1 })
    .limit(5)
    .exec((error, companies) => {
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

function getTopCEO(data, callback) {
  Companies.find({})
    .sort({ averageRating: -1 })
    .limit(10)
    .select({ cname: 1, cceo: 1 })
    .exec((error, companies) => {
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

function getTopViewed(data, callback) {
  const ioredis = new Ioredis(process.env.REDIS_PORT, process.env.REDIS_CLIENT);

  // const keys = await ioredis.collection.keys('*');
  // const values = await ioredis.collection.mget(keys);
  ioredis.keys('Views_*').then((keys) => {
    const promiseArray = keys.map((key) => ioredis.get(key));
    Promise.all(promiseArray)
      .then((values) => {
        console.log('values:', values);
        let kv = [];
        // keys.forEach((key, i) => kv[values[i]] = key);
        for (let i = 0; i < keys.length; i++) {
          const temp = {
            key: keys[i].split('_')[1],
            value: values[i],
          };
          kv.push(temp);
        }
        kv.sort((a, b) => b.value - a.value);
        console.log('kv:', kv);
        if (kv.length > 10) {
          kv = kv.slice(0, 10);
        }
        const promiseArr = kv.map((kvpair) => Companies.findById(kvpair.key));
        Promise.all(promiseArr)
          .then((companies) => {
            const response = {
              status: 200,
              header: 'application/json',
              content: JSON.stringify(companies),
            };
            callback(null, response);
          });
      });
  });
}

function getTopStudents(data, callback) {
  Students.find({})
    .sort({ streviewsaccepted: -1 })
    .limit(5)
    .exec((error, students) => {
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
          content: JSON.stringify(students),
        };
        callback(null, response);
      }
    });
}

function handleRequest(msg, callback) {
  switch (msg.subTopic) {
    case 'GETREVIEWSBYCNAME': {
      console.log('KB: Inside get review by company name');
      console.log('Message:', msg);
      getByCompanyName(msg.data, callback);
      break;
    }
    case 'GETREVIEWSBYCID': {
      console.log('KB: Inside get review by company name');
      console.log('Message:', msg);
      getByCompanyId(msg.data, callback);
      break;
    }
    case 'APPROVEREVIEW': {
      console.log('KB: Inside approve review');
      console.log('Message:', msg);
      approveReview(msg.data, callback);
      break;
    }
    case 'REJECTREVIEW': {
      console.log('KB: Inside reject review');
      console.log('Message:', msg);
      rejectReview(msg.data, callback);
      break;
    }
    case 'APPROVEPHOTO': {
      console.log('KB: Inside approve photo');
      console.log('Message:', msg);
      approvePhoto(msg.data, callback);
      break;
    }
    case 'REJECTPHOTO': {
      console.log('KB: Inside reject photo');
      console.log('Message:', msg);
      rejectPhoto(msg.data, callback);
      break;
    }
    case 'REVIEWSPERDAY': {
      console.log('KB: Inside reviews per day');
      console.log('Message:', msg);
      getReviewsPerDay(msg.data, callback);
      break;
    }
    case 'MOSTREVIEWED': {
      console.log('KB: Inside most reviewed');
      console.log('Message:', msg);
      getMostReviewed(msg.data, callback);
      break;
    }
    case 'BESTAVG': {
      console.log('KB: Inside best abg');
      console.log('Message:', msg);
      getBestAvg(msg.data, callback);
      break;
    }
    case 'TOPCEO': {
      console.log('KB: Inside top ceo');
      console.log('Message:', msg);
      getTopCEO(msg.data, callback);
      break;
    }
    case 'TOPVIEWEDPERDAY': {
      console.log('KB: Inside top viewed per day');
      console.log('Message:', msg);
      getTopViewed(msg.data, callback);
      break;
    }
    case 'TOPSTUDENTS': {
      console.log('KB: Inside top viewed per day');
      getTopStudents(msg.data, callback);
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
