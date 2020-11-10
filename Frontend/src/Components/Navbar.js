import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { logout } from '../Actions/credentialActions';
import logo from '../Static/Images/Glassdoor_logo.png'

class Navbar extends Component {
  render() {
    const { isAuth, role, logout } = this.props;
    return (
      <div>
        {isAuth ? <Redirect to={`/${role}`} /> : null}
        <nav className="navbar navbar-inverse" style={{ backgroundColor: 'white' }}>
          <img id="logo" src={logo} />
          <ul className="nav navbar-nav navbar-right">
            {isAuth ? (
              <li>
                <Link to="/" onClick={logout}>
                  <span className="glyphicon glyphicon-user" />
                  Logout
                </Link>
              </li>
            ) : null} 
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
