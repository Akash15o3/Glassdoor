import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './Static/Styles/App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Credentials/Login';
import Signup from './Components/Credentials/Signup';
import Student from './Components/Student/Profile';
import Employer from './Components/Employer/Employer';
import EmpProfile from './Components/Employer/Profile';
import Admin from './Components/Admin/Admin';
import Jobs from './Components/Employer/jobs';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/student" component={Student} />
        <Route path="/employer" component={EmpProfile} />
        <Route path="/admin" component={Admin} />
        <Route path="/employerJobs" component={Jobs} />
      </div>
    </BrowserRouter>
  );
}

export default App;
