import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentSalaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 5;
    this.numPages = Math.ceil(this.props.salaries.length / this.itemsPerPage);
  }

  setPage = (e) => {
    const { className } = e.currentTarget;
    const { pageIndex } = this.state;
    const { numPages } = this;
    if (className === 'prev' && pageIndex > 0) {
      this.setState({ pageIndex: pageIndex - 1 });
    } else if (className === 'next' && pageIndex < numPages - 1) {
      this.setState({ pageIndex: pageIndex + 1 });
    } else if (className.includes('page')) {
      this.setState({ pageIndex: parseInt(e.currentTarget.getAttribute('pageIndex')) });
    }
  }

  render() {
    const { name, salaries } = this.props;
    const { pageIndex } = this.state;
    const { numPages, itemsPerPage } = this;
    const numSalaries = salaries.length;
    let numItems = 0;
    if (numSalaries > 0) numItems = numPages === pageIndex + 1 && numSalaries % itemsPerPage !== 0 ? numSalaries % itemsPerPage : itemsPerPage;
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>{`${name}'s Salaries`}</h1>
        <table style={{ marginBottom: '20px' }}>
          <tr>
            <th>Job Title</th>
            <th>Base Salary</th>
            <th>Years of Experience</th>
            <th>Location</th>
            <th>Bonus</th>
          </tr>
          {[...Array(numItems)].map((e, i) => {
            const index = i + (pageIndex * itemsPerPage);
            return (
              <tr>
                <td>{salaries[index].jtitle}</td>
                <td>{`$${salaries[index].salbase}/hour`}</td>
                <td>{`${salaries[index].salexperience} years`}</td>
                <td>{salaries[index].sallocation}</td>
                <td>{`$${salaries[index].salbonus}`}</td>
              </tr>
            );
          })}
        </table>
        <Pagination setPage={this.setPage} page={pageIndex} numPages={numPages} />
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
