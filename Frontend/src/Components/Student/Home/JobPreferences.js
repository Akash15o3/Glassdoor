import React, { Component } from 'react';
import axios from 'axios';

export default class JobPreferences extends Component {
  constructor(props) {
    super(props);
    const { searchstatus, title, targetsalary, salarypayperiod, relocation, industry } = this.props.stjobpref;
    this.state = {
      searchstatus,
      title,
      editTitle: false,
      targetsalary: targetsalary || '?',
      salarypayperiod: salarypayperiod || 'hour',
      editSalary: false,
      relocation,
      industry
    };
  }

  jobStatusChangeHandler = (e) => {
    const searchstatus = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateJobStatus`;
    axios.post(url, { searchstatus, id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stjobpref: res.data });
      });
    this.setState({ searchstatus });
  }

  toggleEditJobTitle = () => {
    const { editTitle, title } = this.state;
    if (editTitle) {
      const url = `${process.env.REACT_APP_BACKEND}/students/updateJobTitle`;
      axios.post(url, { title, id: this.props.id })
        .then((res) => { // then print response status
          console.log(res.data);
          this.props.updateStudent({ stjobpref: res.data });
        });
    }
    this.setState({ editTitle: !editTitle });
  }

  jobTitleChangeHandler = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  toggleEditSalary = () => {
    const { editSalary, targetsalary, salarypayperiod } = this.state;
    if (editSalary) {
      const url = `${process.env.REACT_APP_BACKEND}/students/updateTargetSalary`;
      axios.post(url, { targetsalary, salarypayperiod, id: this.props.id })
        .then((res) => { // then print response status
          console.log(res.data);
          this.props.updateStudent({ stjobpref: res.data });
        });
    }
    this.setState({ editSalary: !editSalary });
  }

  salaryChangeHandler = (e) => {
    this.setState({
      targetsalary: e.target.value
    });
  }

  salaryPayPeriodChangeHandler = (e) => {
    this.setState({
      salarypayperiod: e.target.value
    });
  }

  relocationChangeHandler = (e) => {
    const relocation = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateRelocation`;
    axios.post(url, { relocation, id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stjobpref: res.data });
      });
    this.setState({ relocation });
  }

  industryChangeHandler = (e) => {
    const industry = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateIndustry`;
    axios.post(url, { industry, id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stjobpref: res.data });
      });
    this.setState({ industry });
  }

  render() {
    const { searchstatus, editTitle, title, targetsalary, salarypayperiod, editSalary, relocation, industry } = this.state;
    const jobTitleView = !editTitle ? [<h2 style={{ display: 'inline-block', margin: '0' }}>{title}</h2>,
      <svg onClick={this.toggleEditJobTitle} className="edit" style={{ width: '24px', height: '24px', marginLeft: '5px' }} width="24" height="24" viewBox="0 0 24 24">
        <g fill="currentColor" fillRule="evenodd">
          <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
        </g>
      </svg>] : [<input value={title} style={{ height: '35px' }} placeholder="Job Title..." onChange={this.jobTitleChangeHandler} />,
        <button onClick={this.toggleEditJobTitle} style={{ fontSize: '28px', padding: '0', marginLeft: '5px' }} className="home-btn info">+</button>];

    const targetSalaryView = !editSalary ? [<h2 style={{ display: 'inline-block', margin: '0' }}>{`$${targetsalary}/${salarypayperiod}`}</h2>,
      <svg onClick={this.toggleEditSalary} className="edit" style={{ width: '24px', height: '24px', marginLeft: '5px' }} width="24" height="24" viewBox="0 0 24 24">
        <g fill="currentColor" fillRule="evenodd">
          <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
        </g>
      </svg>] : [<input value={targetsalary} style={{ height: '35px', marginRight: '5px' }} placeholder="Enter Salary..." onChange={this.salaryChangeHandler} />,
        <select value={salarypayperiod} onChange={this.salaryPayPeriodChangeHandler}>
          <option value="hour">hour</option>
          <option value="month">month</option>
          <option value="year">year</option>
        </select>,
        <button onClick={this.toggleEditSalary} style={{ fontSize: '28px', padding: '0', marginLeft: '5px' }} className="home-btn info">+</button>];

    return (
      <div className="studentHomeContent">
        <h1 style={{ fontWeight: 'bold' }}>Job Preferences</h1>
        <p>Tell us what you’re looking for in a job and we’ll use this information to recommend the best jobs to you. This information will not be visible to employers.</p>
        <div className="jobPrefField">
          <h3 style={{ fontWeight: 'bold' }}>Where are you in your job search?</h3>
          <h5>Select Job Search Status</h5>
          <select value={searchstatus} style={{ width: '15%', margin: 'auto' }} onChange={this.jobStatusChangeHandler}>
            <option value="Casually Looking">Casually Looking</option>
            <option value="Actively Looking">Actively Looking</option>
            <option value="Not Looking">Not Looking</option>
          </select>
        </div>
        <div className="jobPrefField">
          <h3 style={{ fontWeight: 'bold' }}>What type of job are you open to?</h3>
          {jobTitleView}
        </div>
        <div className="jobPrefField">
          <h3 style={{ fontWeight: 'bold' }}>What is your target salary range?</h3>
          {targetSalaryView}
        </div>
        <div className="jobPrefField">
          <h3 style={{ fontWeight: 'bold' }}>Are you open to relocation?</h3>
          <select value={relocation} onChange={this.relocationChangeHandler}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        <div>
          <h3 style={{ fontWeight: 'bold' }}>What type of industry do you prefer?</h3>
          <select value={industry} onChange={this.industryChangeHandler}>
            <option value="All Industries">All Industries</option>
            <option value="Accounting &amp; Legal">Accounting &amp; Legal</option>
            <option value="Aerospace &amp; Defense">Aerospace &amp; Defense</option>
            <option value="Arts, Entertainment &amp; Recreation">Arts, Entertainment &amp; Recreation</option>
            <option value="Biotech &amp; Pharmaceuticals">Biotech &amp; Pharmaceuticals</option>
            <option value="Business Services">Business Services</option>
            <option value="Construction, Repair &amp; Maintenance">Construction, Repair &amp; Maintenance</option>
            <option value="Consumer Services">Consumer Services</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Government">Government</option>
            <option value="Health Care">Health Care</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Insurance">Insurance</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Media">Media</option>
            <option value="Mining &amp; Metals">Mining &amp; Metals</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Oil, Gas, Energy &amp; Utilities">Oil, Gas, Energy &amp; Utilities</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Restaurants, Bars &amp; Food Services">Restaurants, Bars &amp; Food Services</option>
            <option value="Retail">Retail</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Transportation &amp; Logistics">Transportation &amp; Logistics</option>
            <option value="Travel &amp; Tourism">Travel &amp; Tourism</option>
          </select>
        </div>
      </div>
    );
  }
}
