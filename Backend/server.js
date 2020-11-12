const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const { frontendURI } = require('./Config/keys');

app.use(cors({ origin: frontendURI, credentials: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
const PORT = process.env.PORT || 5000;

app.use('/', require('./Routes/CredentialRoutes/CredentialRoutes'));
// app.use('/student', require('./Routes/StudentRoutes'));
// app.use('/employer', require('./Routes/EmployerRoutes'));
// app.use('/admin', require('./Routes/AdminRoutes'));

app.listen(PORT, console.log(`Server is running on localhost:${PORT}...`));
module.exports = app;
