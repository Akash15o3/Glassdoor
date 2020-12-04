/* eslint-disable */
const connection = new require('./kafka/Connection');
const mongoose = require('mongoose');
const Companies = require('./Services/companies');
const Credentials = require('./Services/credentials');
const Jobs = require('./Services/jobs');
const Searches = require('./Services/searches');
const Students = require('./Services/students');
const Reviews = require('./Services/reviews');
const Interviews = require('./Services/interviews');
const Admin = require('./Services/admin');
const Salaries = require('./Services/salaries');

const mongoDB = process.env.REACT_APP_MONGODB;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

console.log('env var: ', process.env)

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log('MongoDB Connection Failed');
  } else {
    console.log('MongoDB Connected');
  }s
});

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', function (message) {
    // console.log('message received for ' + topic_name +" ", fname);
    // console.log('Message in server: ', message);
    // console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    
    fname.handleRequest(data, function(err,res){
      console.log('after handle'+res);
      var payloads = [
        { 
          topic: data.replyTo,
          messages:JSON.stringify({
              correlationId:data.correlationId,
              data : res
          }),
          partition : 0
        }
      ];
      producer.send(payloads, function(err, data){
          console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('companiesTopic', Companies);
handleTopicRequest('credentialsTopic', Credentials);
handleTopicRequest('jobsTopic', Jobs);
handleTopicRequest('searchesTopic', Searches);
handleTopicRequest('studentsTopic', Students);
handleTopicRequest('reviewsTopic', Reviews);
handleTopicRequest('interviewsTopic', Interviews);
handleTopicRequest('adminsTopic', Admin);
handleTopicRequest('salariesTopic', Salaries);
