import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { cname, cemail } = this.props.employer;
    this.state = {
      open: false,
      cname,
      cwebsite: "",
      csize: "",
      ctype: "",
      crevenue: "",
      cheadquarters: "",
      cindustry: "",
      cfounded: "",
      cmission: "",
      cceo: "",
      clocation: "",
      cemail,
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

  websiteChangeHandler = (e) => {
    this.setState({
      cwebsite: e.target.value,
    });
  };

  locationChangeHandler = (e) => {
    this.setState({
      clocation: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      cemail: e.target.value,
    });
  };

  sizeChangeHandler = (e) => {
    this.setState({
      csize: e.target.value,
    });
  };

  typeChangeHandler = (e) => {
    this.setState({
      ctype: e.target.value,
    });
  };

  revenueChangeHandler = (e) => {
    this.setState({
      crevenue: e.target.value,
    });
  };

  headquartersChangeHandler = (e) => {
    this.setState({
      cheadquarters: e.target.value,
    });
  };

  industryChangeHandler = (e) => {
    this.setState({
      cindustry: e.target.value,
    });
  };

  foundedChangeHandler = (e) => {
    this.setState({
      cfounded: e.target.value,
    });
  };

  missionChangeHandler = (e) => {
    this.setState({
      cmission: e.target.value,
    });
  };

  ceoChangeHandler = (e) => {
    this.setState({
      cceo: e.target.value,
    });
  };

  saveUpdates = () => {
    const { id } = this.props;
    const { cname, cemail } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/companies/updateProfile`;
    axios.post(url, { id, cname, cemail }).then((response) => {
      console.log(response);
    });
    this.props.updateProfileEm({ cname, cemail });
    this.setState({ open: false });
  };

  render() {
    const {
      cname,
      cwebsite,
      clocation,
      cemail,
      csize,
      cceo,
      cfounded,
      cheadquarters,
      cindustry,
      cmission,
      crevenue,
      ctype,
    } = this.state;
    return (
      <div className="studentHomeContent">
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closeWithoutSaving}
          style={{
            content: {
              width: "55%",
              margin: "auto",
              border: "2px solid black",
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
          <h1 style={{ textAlign: "center" }}>Company Information</h1>
          <label className="modalLabel"> Name</label>
          <input
            onChange={this.nameChangeHandler}
            value={cname}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Location</label>
          <input
            onChange={this.locationChangeHandler}
            value={clocation}
            className="modalInput"
          />
          <label className="modalLabel">Email Address</label>
          <input
            onChange={this.emailChangeHandler}
            value={cemail}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> Website</label>
          <input
            onChange={this.websiteChangeHandler}
            value={cwebsite}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Company Size</label>
          <input
            onChange={this.sizeChangeHandler}
            value={csize}
            className="modalInput"
          />
          <label className="modalLabel">Company Type</label>
          <input
            onChange={this.typeChangeHandler}
            value={ctype}
            className="modalInput"
          />
          <label className="modalLabel">Revenue</label>
          <input
            onChange={this.revenueChangeHandler}
            value={crevenue}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> Headquarters</label>
          <input
            onChange={this.headquartersChangeHandler}
            value={cheadquarters}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Industry</label>
          <input
            onChange={this.industryChangeHandler}
            value={cindustry}
            className="modalInput"
          />
          <label className="modalLabel">Founded </label>
          <input
            onChange={this.foundedChangeHandler}
            value={cfounded}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> CEO</label>
          <input
            onChange={this.ceoChangeHandler}
            value={cceo}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Mission</label>
          <input
            onChange={this.missionChangeHandler}
            value={cmission}
            className="modalInput"
          />
          <button className="save" onClick={this.saveUpdates}>
            Save
          </button>
        </Modal>
        <div className="profileField">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ display: "inline-block" }}>Info</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: "24px", height: "24px", marginLeft: "5px" }}
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
          <div style={{ textAlign: "center" }}>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cname === "" ? "Add Name" : cname}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cemail === "" ? "Add email" : cemail}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {csize === "" ? "Add Company Size" : csize}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {clocation === "" ? "Add location" : clocation}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {ctype === "" ? "Add Type" : ctype}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {crevenue === "" ? "Add Revenue" : crevenue}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cheadquarters === "" ? "Add Headquarters" : cheadquarters}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cwebsite === "" ? "Add Webssite" : cwebsite}
            </button>
            {/* <button className="home-btn info">Add phone number</button> */}
          </div>
        </div>
        <div className="profileField">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ display: "inline-block" }}>About Me</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: "24px", height: "24px", marginLeft: "5px" }}
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
          <div style={{ textAlign: "center" }}>
            <button className="home-btn info">
              <strong>Add an introduction</strong> about yourself with a brief
              summary of your experience.
            </button>
          </div>
        </div>
        <div className="profileField">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ display: "inline-block" }}>Experience</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: "24px", height: "24px", marginLeft: "5px" }}
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
          <div style={{ textAlign: "center" }}>
            <button className="home-btn info">
              <strong>Add your work history</strong> including any internships
              or contract work and qualifications.
            </button>
          </div>
        </div>
        <div className="profileField">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ display: "inline-block" }}>Education</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: "24px", height: "24px", marginLeft: "5px" }}
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
          <div style={{ textAlign: "center" }}>
            <button className="home-btn info">
              <strong>Add your most recent education</strong> Since many jobs
              require a certain level of education, it’s important to mention
              your academic credentials on your resume.
            </button>
          </div>
        </div>
      </div>
    );
  }
}
