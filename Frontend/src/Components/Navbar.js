import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { logout } from '../Actions/credentialActions';
import SearchBar from '../Components/Student/SearchBar';
import logo from '../Static/Images/navbarLogo.PNG'

class Navbar extends Component {
  render() {
    const { isAuth, role, logout } = this.props;
    let searchBar = null;

    if (role === 'student') {
      searchBar = (
        <SearchBar />
        );
    }

    return (
      <div>
        {isAuth ? <Redirect to={`/${role}`} /> : null}
        <nav className="navbar navbar-inverse" style={{ backgroundColor: 'white', height: '80px'}}>
          <div className="nav navbar-nav navbar-left">
          <img id="logo" src={logo} style={{width: '200px', position: 'relative', right: '540px', top: '20px'}}/>
          {searchBar}
          </div>
          <ul className="nav navbar-nav navbar-right">
            {isAuth ? (
              <li>
                <Link to="/" style={{position: 'relative', bottom: '190px', right: '5px'}} onClick={logout}>
                  <span className="glyphicon glyphicon-user" />
                  Logout
                </Link>
              </li>
            ) : null} 
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </nav>
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

const mapDisptachToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(Navbar);
