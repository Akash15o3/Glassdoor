function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  if (topic_name != "__consumer_offsets") {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function (message) {
      console.log(
        "message received for " + topic_name + " ",
        fname,
        "message",
        message
      );
      console.log("message value-----", message.value);
      console.log("fname in server.js kafka backend", fname);
      var data = JSON.parse(message.value);
      console.log(
        "data on kafka server.js",
        data.data,
        "replyto",
        data.replyTo
      );
      fname.handle_request(data.data, function (err, res) {
        console.log("error in fname", err);
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res,
            }),
            partition: 0,
          },
        ];
        producer.send(payloads, function (err, data) {
          console.log("Producer data", data);
        });
        return;
      });
    });
  }
}
