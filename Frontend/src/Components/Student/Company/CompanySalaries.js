import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../Pagination';
import { updateStudent } from '../../../Actions/studentActions';

Modal.setAppElement('#root');
class CompanySalaries extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 5;
    this.state = {
      open: false,
      jtitle: '',
      salbase: '',
      salexperience: '',
      sallocation: '',
      salbonus: '',
      salaries: [],
      pageIndex: 0,
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.salaries !== null) {
      this.setState({ salaries: this.props.salaries, loading: false, numPages: Math.ceil(this.props.salaries.length / this.itemsPerPage) });
    } else {
      const url = `${process.env.REACT_APP_BACKEND}/salaries/getSalaries?cid=${this.props.cid}`;
      axios.get(url)
        .then((response) => {
          if (response.data) {
            this.props.updateSalaries(response.data);
            this.setState({
              salaries: response.data, loading: false, numPages: Math.ceil(response.data.length / this.itemsPerPage),
            });
          }
        });
    }
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
    const { stid, cid, cname } = this.props;
    const url = `${process.env.REACT_APP_BACKEND}/salaries/createSalary`;
    axios.post(url, { jtitle, salbase, salexperience, sallocation, salbonus, stid, cid, cname })
      .then((response) => {
        if (response.data) {
          const salaries = [...this.state.salaries, response.data];
          this.setState({ salaries, numPages: Math.ceil((salaries.length / this.itemsPerPage)) });
          this.props.updateSalaries(salaries);
          this.props.updateStudent({ stsalaries: [...this.props.stsalaries, response.data] });
          this.closeSalaryModal();
        }
      });
  }

  setPage = (e) => {
    const { className } = e.currentTarget;
    const { pageIndex, numPages } = this.state;
    if (className === 'prev' && pageIndex > 0) {
      this.setState({ pageIndex: pageIndex - 1 });
    } else if (className === 'next' && pageIndex < numPages - 1) {
      this.setState({ pageIndex: pageIndex + 1 });
    } else if (className.includes('page')) {
      this.setState({ pageIndex: parseInt(e.currentTarget.getAttribute('pageIndex')) });
    }
  }

  render() {
    const { cname } = this.props;
    const { salaries, pageIndex, numPages, loading } = this.state;
    const { itemsPerPage } = this;
    const numSalaries = salaries.length;
    let numItems = 0;
    if (numSalaries > 0) numItems = numPages === pageIndex + 1 && numSalaries % itemsPerPage !== 0 ? numSalaries % itemsPerPage : itemsPerPage;
    return loading ? <div className="loader cTab"><BeatLoader color="green" /></div> : (
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
            {this.props.isAuth ? (
              <button onClick={this.openSalaryModal} style={{ backgroundColor: '#1861bf', position: 'relative', left: '-25px', top: '-5px', float: 'right' }} className="gd-btn gd-btn-link gradient gd-btn-med gd-btn-icon padHorz addReview">
                <i className="btn-plus margRtSm" />
                <span>  Add Salary </span>
                <i className="hlpr" />
              </button>
            ) : null}
          </h1>
          {/* <button className="btn btn-primary">Add Photos</button> */}
        </div>
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
    stsalaries: state.student.user.stsalaries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (updateInfo) => dispatch(updateStudent(updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySalaries);
