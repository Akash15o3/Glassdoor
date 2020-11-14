const config = {
  secret: 'cmpe273_secret_key',
  frontendURI: process.env.REACT_APP_FRONTEND,
  mongoDB: 'mongodb+srv://admin:admin@cluster0.ej2iu.mongodb.net/glassdoor?retryWrites=true&w=majority',
};

module.exports = config;
