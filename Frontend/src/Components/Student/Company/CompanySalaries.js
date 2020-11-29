import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');
export default class CompanySalaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jtitle: '',
      salbase: '',
      salexperience: '',
      sallocation: '',
      salbonus: '',
      salaries: this.props.salaries
    };
  }

  openSalaryModal = () => {
    this.setState({ open: true });
  }

  closeSalaryModal = () => {
    this.setState({ open: false });
  }

  jobTitleChangeHandler = (e) => {
    this.setState({ jtitle: e.target.value });
  }

  baseSalaryChangeHandler = (e) => {
    this.setState({ salbase: e.target.value });
  }

  experienceChangeHandler = (e) => {
    this.setState({ salexperience: e.target.value });
  }

  locationChangeHandler = (e) => {
    this.setState({ sallocation: e.target.value });
  }

  bonusChangeHandler = (e) => {
    this.setState({ salbonus: e.target.value });
  }

  submitSalary = () => {
    const { jtitle, salbase, salexperience, sallocation, salbonus } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/salaries/createSalary`;
    axios.post(url, { jtitle, salbase, salexperience, sallocation, salbonus })
      .then((response) => {
        if (response.data) {
          const salaries = [...this.state.salaries, response.data];
          this.setState({ salaries });
          this.props.updateSalaries(salaries);
          this.closeSalaryModal();
        }
      });
  }

  render() {
    const { cname } = this.props;
    const { salaries } = this.state;
    return (
      <div id="companySalariesContainer">
        <Modal isOpen={this.state.open} onRequestClose={this.closeSalaryModal} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black' } }}>
          <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.closeSalaryModal}>
            <svg className="SVGInline-svg modal_closeIcon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="gray" fillRule="evenodd" />
            </svg>
          </span>
          <h1 style={{ textAlign: 'center' }}>
            Add a Salary
          </h1>
          <label className="salaryModalLabel">Job Title</label>
          <input onChange={this.jobTitleChangeHandler} className="salaryModalInput" />
          <label className="salaryModalLabel">Base Salary</label>
          <input onChange={this.baseSalaryChangeHandler} type="number" className="salaryModalInput" />
          <label className="salaryModalLabel">Years of Experience</label>
          <input onChange={this.experienceChangeHandler} type="number" className="salaryModalInput" />
          <label className="salaryModalLabel">Location</label>
          <input onChange={this.locationChangeHandler} className="salaryModalInput" />
          <label className="salaryModalLabel">Bonus</label>
          <input onChange={this.bonusChangeHandler} type="number" className="salaryModalInput" />
          <button className="save" onClick={this.submitSalary}>Submit</button>
        </Modal>
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{ fontWeight: 'bold', marginLeft: '150px', textAlign: 'center' }}>
            {`${cname} Salaries`}
            <button onClick={this.openSalaryModal} style={{ backgroundColor: '#1861bf', position: 'relative', left: '-25px', top: '-5px', float: 'right' }} className="gd-btn gd-btn-link gradient gd-btn-med gd-btn-icon padHorz addReview">
              <i className="btn-plus margRtSm" />
              <span>  Add Salary </span>
              <i className="hlpr" />
            </button>
          </h1>
          {/* <button className="btn btn-primary">Add Photos</button> */}
        </div>
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
