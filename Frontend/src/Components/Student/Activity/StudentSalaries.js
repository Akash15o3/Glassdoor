import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentSalaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 6;
    this.numPages = 3;
  }

  render() {
    const { name, salaries } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{`${name}'s Salaries`}</h1>
        <table>
          <tr>
            <th>Job Title</th>
            <th>Base Salary</th>
            <th>Years of Experience</th>
            <th>Location</th>
            <th>Bonus</th>
          </tr>
          {salaries.map((salary) => {
            return (
              <tr>
                <td>{salary.jtitle}</td>
                <td>{`$${salary.salbase}/hour`}</td>
                <td>{`${salary.salexperience} years`}</td>
                <td>{salary.sallocation}</td>
                <td>{`$${salary.salbonus}`}</td>
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
    name: state.student.user.stname,
    salaries: state.student.user.stsalaries,
  };
};

export default connect(mapStateToProps)(StudentSalaries);
