const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentsRouter = require('./Routes/StudentRoutes');
const companiesRouter = require('./Routes/CompanyRoutes');
const credentialsRouter = require('./Routes/CredentialRoutes');
const jobRouter = require('./Routes/JobRoutes');
const searchRouter = require('./Routes/SearchRoutes');
const reviewRouter = require('./Routes/ReviewRoutes');
const interviewRouter = require('./Routes/InterviewRoutes');
const adminRouter = require('./Routes/AdminRoutes');
const salariesRouter = require('./Routes/SalaryRoutes');

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

app.use('/', credentialsRouter);
app.use('/students', studentsRouter);
app.use('/companies', companiesRouter);
app.use('/jobs', jobRouter);
app.use('/search', searchRouter);
app.use('/reviews', reviewRouter);
app.use('/interviews', interviewRouter);
app.use('/admin', adminRouter);
app.use('/salaries', salariesRouter);

app.listen(PORT, console.log(`Server is running on localhost:${PORT}...`));
module.exports = app;
