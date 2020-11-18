/* eslint-disable */
var rpc = new (require('./kafkarpc'))();

//make request to kafka
// eslint-disable-next-line camelcase
function make_request(queue_name, subTopic, msg_payload, callback) {
  console.log('in make request');
  console.log(msg_payload);
  rpc.makeRequest(queue_name, subTopic, msg_payload, function(err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
