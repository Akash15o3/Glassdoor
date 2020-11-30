import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './Static/Styles/App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Credentials/Login';
import Signup from './Components/Credentials/Signup';
import Home from './Components/Student/Home/Home';
import Employer from './Components/Employer/Employer';
import EmpProfile from './Components/Employer/Home/Home';
// import EmpProfile from "./Components/Employer/Profile";
import Admin from './Components/Admin/Admin';
import AdminCompany from './Components/Admin/AdminCompanyPage';
import AdminSearchResults from './Components/Admin/AdminSearchResults';
import Jobs from './Components/Employer/jobs';
import CompanyHomePage from './Components/Student/Company/CompanyHomePage';
import CompanySearchResults from './Components/Student/Company/CompanySearchResults';
import JobSearchResults from './Components/Student/Jobs/JobSearchResults';
import JobApplications from './Components/Student/Jobs/JobApplications';
import StudentProfile from './Components/Employer/studentProfile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/student" component={Home} />
        <Route path="/employer" component={EmpProfile} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/company" component={AdminCompany} />
        <Route exact path="/admin/adminSearchResults" component={AdminSearchResults} />
        <Route path="/employerJobs" component={Jobs} />
        <Route path="/studentProfile/:aapplierid" component={StudentProfile} />
        <Route path="/student/company" component={CompanyHomePage} />
        <Route path="/student/companySearchResults" component={CompanySearchResults} />
        <Route path="/student/jobSearchResults" component={JobSearchResults} />
        <Route path="/student/jobApplications" component={JobApplications} />
        <Route path="/anonymous/companySearchResults" component={CompanySearchResults} />
        <Route path="/anonymous/company" component={CompanyHomePage} />
        <Route path="/anonymous/jobSearchResults" component={JobSearchResults} />
      </div>
    </BrowserRouter>
  );
}

export default App;
