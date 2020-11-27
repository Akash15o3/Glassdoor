import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class JobApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: []
    };
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/students/applications`;
    axios.post(url, { aapplierid: this.props.id })
      .then((response) => {
        this.setState({ applications: response.data });
      });
  }

  withdrawApplication= (e) => {
    const { applications } = this.state;
    const index = parseInt(e.target.getAttribute('index'));
    const { _id } = applications[index];
    const url = `${process.env.REACT_APP_BACKEND}/students/withdrawApplication`;
    axios.post(url, { id: _id })
      .then((response) => {
        console.log(response.data);
        applications[index].astatus = 'Withdrawn';
        this.setState({ applications });
      });
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Job Applications</h1>
        <table>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Withdraw</th>
          </tr>
          {this.state.applications.map((application, i) => {
            return (
              <tr>
                <td>{application.cname}</td>
                <td>{application.jtitle}</td>
                <td>{application.astatus}</td>
                <td><a href={application.aresume} target="blank">Link</a></td>
                <td>
                  {application.astatus === 'Withdrawn' ? <button className="withdraw-btn">Withdrawn</button> : <button onClick={this.withdrawApplication} index={i} type="button" className="btn btn-danger">Withdraw</button>}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.student.id
  };
};

export default connect(mapStateToProps)(JobApplications);
