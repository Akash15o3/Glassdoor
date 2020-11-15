import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
// import { logout } from '../Actions/credentialActions';
import SearchBar from './Student/SearchBar';
import StudentTabs from './Student/StudentTabs';
import logo from '../Static/Images/navbarLogo.PNG';

class Navbar extends Component {
  render() {
    const { isAuth, role } = this.props;
    const searchBar = role === 'student' ? <SearchBar /> : null;
    const studentTabs = role === 'student' ? <StudentTabs /> : null;
    return (
      <div>
        {isAuth ? <Redirect to={`/${role}`} /> : (
          <nav className="navbar navbar-inverse" style={{ backgroundColor: 'white' }}>
            <img id="logo" src={logo} />
          </nav>
        )}
        {searchBar}
        {studentTabs}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.credentials.isAuth,
    role: state.credentials.role
  };
};

// const mapDisptachToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(logout()),
//   };
// };
export default connect(mapStateToProps)(Navbar);
