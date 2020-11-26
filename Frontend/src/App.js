import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './Static/Styles/App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Credentials/Login';
import Signup from './Components/Credentials/Signup';
import Home from './Components/Student/Home/Home';
import Employer from './Components/Employer/Employer';
import EmpProfile from './Components/Employer/Profile';
import Admin from './Components/Admin/Admin';
import Jobs from './Components/Employer/jobs';
import CompanySearchResults from './Components/Student/CompanySearchResults';
import JobSearchResults from './Components/Student/Jobs/JobSearchResults';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/student" component={Home} />
        <Route path="/employer" component={EmpProfile} />
        <Route path="/admin" component={Admin} />
        <Route path="/employerJobs" component={Jobs} />
        <Route path="/student/companySearchResults" component={CompanySearchResults} />
        <Route path="/student/jobSearchResults" component={JobSearchResults} />
      </div>
    </BrowserRouter>
  );
}

export default App;
