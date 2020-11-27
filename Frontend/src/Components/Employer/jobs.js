import React, { Component } from "react";
import { Col, Card, FormGroup, Form } from "react-bootstrap";
import { connect } from "react-redux";
// import Navbar from '../Navbar.js';
// import DatePicker from 'react-bootstrap-date-picker';
// import Dropdown from 'react-dropdown';

import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");
class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      postingDate: new Date(),
      deadline: new Date(),
      city: "",
      cstate: "",
      country: "",
      salary: "",
      description: "",
    };

    this.onChangePostingDateHandler = this.onChangePostingDateHandler.bind(
      this
    );
    // this.onPostSubmit = this.onPostSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentWillMount() {
    document.title = "Jobs Page";
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangePostingDateHandler(date) {
    this.setState({
      postingDate: date,
    });
  }

  render() {
    return (
      <div>
        <div>{/* <Navbar /> */}</div>
        <div className="container">
          <div>
            <div className="main-div-createJobPost">
              <div className="login-form">
                <h2>Job Details</h2>
              </div>
              <form onSubmit={this.onPostSubmit}>
                <FormGroup row>
                  <Col sm={12}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Job Title"
                        pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
                        title="Book Title can only contain letters, digits and single space character. It must start with alphanumeric characters only."
                        onChange={this.onChangeHandler}
                        required
                        autoFocus
                      />
                    </div>
                  </Col>
                </FormGroup>
                {/* <FormGroup row>
                  <Form.Label sm={2}>Posting Date: </Form.Label>
                  <Col sm={4}>
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        selected={this.state.postingDate}
                        onChange={this.onChangePostingDateHandler}
                        required
                      />
                    </div>
                  </Col>

                </FormGroup> */}
                <FormGroup row>
                  <Col sm={4}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Job City"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="cstate"
                        placeholder="Job State"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Job Country"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={5}>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        placeholder="Annual Salary in USD"
                        title="Please enter only digits."
                        onChange={this.onChangeHandler}
                        required
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Form.Label sm={2}>Job description: </Form.Label>
                  <Col sm={8}>
                    <textarea
                      rows="8"
                      cols="80"
                      name="description"
                      placeholder="Job Description"
                      onChange={this.onChangeHandler}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ offset: 5 }}>
                    <button type="submit" className="btn btn-primary">
                      Post Job Opening
                    </button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
