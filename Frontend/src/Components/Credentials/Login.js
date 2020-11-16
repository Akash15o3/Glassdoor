import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import '../../Static/Styles/Credentials.css';
import { BACK_SERVER_URL } from '../Config';
import { login } from '../../Actions/credentialActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'Student',
      email: '',
      password: '',
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { role, email, password } = this.state;

    // Please do an axios call on this url (refer Frontend/.env)
    // REACT_APP_BACKEND="http://localhost:5000"
    let url = `${process.env.REACT_APP_BACKEND}/login`
    // axios.post(url, { role, email, password })

    axios.post(url, { role, email, password })
      .then((response) => {
        if (response.data) {
          this.props.login(null, null, role);
        }
      });
  }

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  roleChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      role: e.target.value,
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin} className="form-signin">
          <h1 className="mb-4 title">{`${this.state.role} Login`}</h1>
          <h1 className="h3 mb-3 font-weight-normal signin">Sign in as</h1>
          <select onChange={this.roleChangeHandler} id="options">
            <option value="Student">Student</option>
            <option value="Employer">Employer</option>
            <option value="Admin">Admin</option>
          </select>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input onChange={this.emailChangeHandler} value={this.state.email} type="email" name="email" className="form-control mb-3" placeholder="Email address" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input onChange={this.passwordChangeHandler} value={this.state.password} type="password" name="password" className="form-control" placeholder="Password" required />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />
              {' '}
              Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <a style={{ color: 'white' }} className="btn btn-lg btn-success btn-block" href="/signup">Sign up</a>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, id, role) => dispatch(login(user, id, role)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
