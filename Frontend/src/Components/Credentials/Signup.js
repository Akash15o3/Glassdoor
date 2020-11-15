import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BACK_SERVER_URL } from '../Config';
import { signUp } from '../../Actions/credentialActions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 'Student',
      name: '',
      email: '',
      password: '',
    };
  }

  signUp = (e) => {
    e.preventDefault();
    const { role, name, email, password } = this.state;
    axios.post(`${BACK_SERVER_URL}/signup`, { role, name, email, password })
      .then((response) => {
        console.log(response.data);
        this.props.history.push('/');
      });
  }

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value
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
  this.setState({
    role: e.target.value,
    name: '',
    email: '',
    password: '',
  });
}

render() {
  const { role, name, email, password } = this.state;
  const formInputs = [
    <label htmlFor="inputUsername" className="sr-only">Username</label>,
    <input onChange={this.nameChangeHandler} value={name} type="username" name="username" className="form-control mb-3" placeholder="Username" required autoFocus />,
    <label htmlFor="inputEmail" className="sr-only">Email address</label>,
    <input onChange={this.emailChangeHandler} value={email} type="email" name="email" className="form-control mb-3" placeholder="Email address" required autoFocus />,
    <label htmlFor="inputPassword" className="sr-only">Password</label>,
    <input onChange={this.passwordChangeHandler} value={password} type="password" name="password" className="form-control mb-3" placeholder="Password" required />,
  ];
  return (
    <div>
      <form onSubmit={this.signUp} className="form-signin">
        <h2 className="mb-4 title">{`${role} Sign Up`}</h2>
        <h1 className="h3 mb-3 font-weight-normal signin">Sign up as</h1>
        <select onChange={this.roleChangeHandler} id="options">
          <option value="Student">Student</option>
          <option value="Employer">Employer</option>
          <option value="Admin">Admin</option>
        </select>
        {formInputs}
        <button className="btn btn-lg btn-success btn-block" type="submit">Register</button>
        <h1 className="h6 mt-3 ">Already registered?</h1>
        <a style={{ color: 'white' }} className="btn btn-lg btn-primary btn-block" href="/">Sign in</a>
      </form>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user, id, role) => dispatch(signUp(user, id, role))
  };
};

export default connect(null, mapDispatchToProps)(Signup);
