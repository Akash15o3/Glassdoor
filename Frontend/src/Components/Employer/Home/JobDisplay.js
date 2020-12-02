import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

export default class Job extends Component {
  constructor(props) {
    super(props);
    const { cname, cemail, averageRating } = this.props.employer;
    this.state = {
      open: false,
      cname,
      averageRating,
      jtitle: '',
      jindustry: '',
      jposted: new Date(),
      //   deadline: new Date(),
      jaddress: '',
      jcity: '',
      jstate: '',
      jcountry: '',
      jzip: '',
      jwork: '',
      jsalary: '',
      jdescription: '',
      jresponsibilities: '',
      cemail,
      jqualifications: '',
    };
  }

  updateProfileEm = () => {
    this.setState({ open: true });
  };

  closeWithoutSaving = () => {
    const { cname, cemail } = this.props.employer;
    this.setState({ cname, cemail, open: false });
  };

  nameChangeHandler = (e) => {
    this.setState({
      cname: e.target.value,
    });
  };

  titleChangeHandler = (e) => {
    this.setState({
      jtitle: e.target.value,
    });
  };

  addressChangeHandler = (e) => {
    this.setState({
      jaddress: e.target.value,
    });
  };

  workChangeHandler = (e) => {
    this.setState({
      jwork: e.target.value,
    });
  };

  cityChangeHandler = (e) => {
    this.setState({
      jcity: e.target.value,
    });
  };

  stateChangeHandler = (e) => {
    this.setState({
      jstate: e.target.value,
    });
  };

  countryChangeHandler = (e) => {
    this.setState({
      jcountry: e.target.value,
    });
  };

  zipChangeHandler = (e) => {
    this.setState({
      jzip: e.target.value,
    });
  };

  industryChangeHandler = (e) => {
    this.setState({
      jindustry: e.target.value,
    });
  };

  descriptionChangeHandler = (e) => {
    this.setState({
      jdescription: e.target.value,
    });
  };

  responsibilityChangeHandler = (e) => {
    this.setState({
      jresponsibilities: e.target.value,
    });
  };

  salaryChangeHandler = (e) => {
    this.setState({
      jsalary: e.target.value,
    });
  };

  qualificationChangeHandler = (e) => {
    this.setState({
      jqualifications: e.target.value,
    });
  };

  saveUpdates = () => {
    const { id } = this.props;
    const { cname, cemail, averageRating } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/jobs/createNewJob`;
    const data = {
      cname,
      cemail,
      averageRating,
      id,
      jtitle: this.state.jtitle,
      jindustry: this.state.jindustry,
      jposted: new Date(),
      //   deadline: new Date(),
      jaddress: this.state.jaddress,
      jcity: this.state.jcity,
      jstate: this.state.jstate,
      jcountry: this.state.jcountry,
      jzip: this.state.jzip,
      jwork: this.state.jwork,
      jsalary: this.state.jsalary,
      jdescription: this.state.jdescription,
      jresponsibilities: this.state.jresponsibilities,
      jqualifications: this.state.jqualifications,
    };
    axios.post(url, data).then((response) => {
      console.log(response);
    });
    this.props.updateProfileEm({ cname, cemail });
    this.setState({ open: false });
  };

  render() {
    const {
      cname,
      jtitle,
      jindustry,
      jposted,
      jaddress,
      jcity,
      jstate,
      jcountry,
      jwork,
      jzip,
      jdescription,
      jresponsibilities,
      jsalary,
      jqualifications,
    } = this.state;
    return (
      <div className="studentHomeContent">
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closeWithoutSaving}
          style={{
            content: {
              width: '55%',
              margin: 'auto',
              border: '2px solid black',
            },
          }}
        >
          <span
            alt="Close"
            className="SVGInline modal_closeIcon"
            onClick={this.closeWithoutSaving}
          >
            <svg
              className="SVGInline-svg modal_closeIcon-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z"
                fill="gray"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <h1 style={{ textAlign: 'center' }}>Change Job Information</h1>
          <label className="modalLabel"> Job Title</label>
          <input
            onChange={this.titleChangeHandler}
            value={jtitle}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Street Address</label>
          <input
            onChange={this.addressChangeHandler}
            value={jaddress}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> Type of Work (Remote/In person)</label>
          <input
            onChange={this.workChangeHandler}
            value={jwork}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">City</label>
          <input
            onChange={this.cityChangeHandler}
            value={jcity}
            className="modalInput"
          />
          <label className="modalLabel">State</label>
          <input
            onChange={this.stateChangeHandler}
            value={jstate}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel">Country</label>
          <input
            onChange={this.countryChangeHandler}
            value={jcountry}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">ZIP</label>
          <input
            onChange={this.zipChangeHandler}
            value={jzip}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Industry</label>
          <input
            onChange={this.industryChangeHandler}
            value={jindustry}
            className="modalInput"
          />
          <label className="modalLabel">Description </label>
          <input
            onChange={this.descriptionChangeHandler}
            value={jdescription}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel">Responsibilities</label>
          <input
            onChange={this.responsibilityChangeHandler}
            value={jresponsibilities}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Qualifications</label>
          <input
            onChange={this.qualificationChangeHandler}
            value={jqualifications}
            type="qualification"
            name="qualification"
            className="modalInput"
          />
          <label className="modalLabel">Salary</label>
          <input
            onChange={this.salaryChangeHandler}
            value={jsalary}
            type="salary"
            name="salary"
            className="modalInput"
          />

          <button className="save" onClick={this.saveUpdates}>
            Save
          </button>
        </Modal>
        <div className="profileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>Create Jobs</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={this.updateProfileEm} className="home-btn info">
              +++
            </button>

            {/* <button className="home-btn info">Add phone number</button> */}
          </div>
        </div>
        {/* <div className="profileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>About Company</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }} />
        </div> */}

        {/* <div className="profileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>Posted Jobs</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div> */}
        {/* <div style={{ textAlign: 'center' }}>
            <button className="home-btn info">
              <strong>ALL JOBS</strong>
            </button>
          </div>
        </div> */}
      </div>
    );
  }
}
