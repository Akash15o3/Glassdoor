const rpc = new (require("./kafkarpc"))();

// make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log("in make request");
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, (err, response) => {
    console.log(
      "msg payload n queue name and response",
      msg_payload,
      queue_name,
      response
    );
    if (err) console.error("error in client", err);
    else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
