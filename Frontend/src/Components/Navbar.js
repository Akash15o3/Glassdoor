import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
// import { logout } from '../Actions/credentialActions';
import SearchBar from './Student/SearchBar';
import StudentTabs from './Student/StudentTabs';
import logo from '../Static/Images/navbarLogo.PNG';
import EmployerTabs from './Employer/EmployerTab';
import AdminTabs from './Admin/AdminTabs';
import AdminSearch from './Admin/AdminSearch';

class Navbar extends Component {
  render() {
    const { isAuth, role } = this.props;
    const searchBar = role === 'student' ? <SearchBar history={this.props.history} /> : null;
    const studentTabs = role === 'student' ? <StudentTabs /> : null;
    const employerTabs = role === 'employer' ? <EmployerTabs /> : null;
    const searchBar1 = role === 'employer' ? <SearchBar /> : null;
    const adminTabs = role === 'admin' ? <AdminTabs /> : null;
    const adminSearch = role === 'admin' ? <AdminSearch history={this.props.history} /> : null;
    return (
      <div>
        {isAuth === true ? (
          <Redirect to={`/${role}`} />
        ) : (
          <nav
            className="navbar navbar-inverse"
            style={{ backgroundColor: 'white' }}
          >
            <img id="logo" src={logo}/>
          </nav>
        )}
        {searchBar}
        {studentTabs}
        {searchBar1}
        {employerTabs}
        {adminSearch}
        {adminTabs}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.credentials.isAuth,
    role: state.credentials.role,
  };
};

// const mapDisptachToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(logout()),
//   };
// };
export default connect(mapStateToProps)(Navbar);
