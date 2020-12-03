import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../Actions/credentialActions';
import SearchBar from './Student/SearchBar';
import StudentTabs from './Student/StudentTabs';
import logo from '../Static/Images/navbarLogo.PNG';
import EmployerTabs from './Employer/EmployerTab';
import AdminSearch from './Admin/AdminSearch';

class Navbar extends Component {
  render() {
    const { isAuth, role } = this.props;
    let tabs = null;
    let searchBar = null;
    switch (role) {
      case 'student':
        tabs = <StudentTabs />;
        searchBar = <SearchBar history={this.props.history} />;
        break;
      case 'employer':
        tabs = <EmployerTabs />;
        searchBar = (
          <nav className="navbar navbar-inverse" style={{ backgroundColor: 'white', margin: '0', border: 'none' }}>
            <Link to="/employer" class="nav-link">
              <img id="logo" src={logo} />
            </Link>
            <Link style={{ marginLeft: 'auto' }} to="/" onClick={this.props.logout} style={{ marginTop: '20px', fontSize: '20px', float: 'right' }}>
              <span className="glyphicon glyphicon-user" />
              Logout
            </Link>
          </nav>
        );
        break;
      case 'admin':
        searchBar = <AdminSearch history={this.props.history} />;
        break;
      default:
        searchBar = <SearchBar history={this.props.history} />;
        break;
    }
    // const studentTabs = role === 'student' ? <StudentTabs /> : null;
    // const employerTabs = role === 'employer' ? <EmployerTabs /> : null;
    // const adminTabs = role === 'admin' ? <AdminTabs /> : null;
    // const searchBar = role === 'admin' ? <AdminSearch history={this.props.history} /> : <SearchBar history={this.props.history} />;
    return (

      <div>
        {isAuth === false ? <Redirect to="/" /> : null}
        {this.props.history.location.pathname === '/' && isAuth === true ? <Redirect to={`/${role}`} /> : null}
        {searchBar}
        {tabs}
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

const mapDisptachToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(Navbar);
