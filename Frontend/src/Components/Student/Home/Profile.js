import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');
export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { stname, stemail, stjobtitle, stlocation } = this.props.student;
    this.state = {
      open: false,
      stname,
      stjobtitle,
      stlocation,
      stemail,
    };
  }

  openModal = () => {
    this.setState({ open: true });
  }

  closeWithoutSaving = () => {
    const { stname, stemail, stjobtitle, stlocation } = this.props.student;
    this.setState({ stname, stemail, stjobtitle, stlocation, open: false });
  }

  nameChangeHandler = (e) => {
    this.setState({
      stname: e.target.value
    });
  }

  titleChangeHandler = (e) => {
    this.setState({
      stjobtitle: e.target.value
    });
  }

  locationChangeHandler = (e) => {
    this.setState({
      stlocation: e.target.value
    });
  }

  emailChangeHandler = (e) => {
    this.setState({
      stemail: e.target.value
    });
  }

  saveUpdates = () => {
    const { id } = this.props;
    const { stname, stemail, stjobtitle, stlocation } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateProfile`;
    axios.post(url, { id, stname, stemail, stjobtitle, stlocation })
      .then((response) => {
        console.log(response);
      });
    this.props.updateStudent({ stname, stemail, stjobtitle, stlocation });
    this.setState({ open: false });
  }

  render() {
    const { streviews, stinterviews, stsalaries, cphotos } = this.props.student;
    const { stname, stjobtitle, stlocation, stemail } = this.state;
    return (
      <div className="studentHomeContent">
        <Modal isOpen={this.state.open} onRequestClose={this.closeWithoutSaving} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black' } }}>
          <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.closeWithoutSaving}>
            <svg className="SVGInline-svg modal_closeIcon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="gray" fillRule="evenodd" />
            </svg>
          </span>
          <h1 style={{ textAlign: 'center' }}>
            Basic Information
          </h1>
          <label className="modalLabel"> Name</label>
          <input onChange={this.nameChangeHandler} value={stname} type="username" name="name" className="modalInput" />
          <label className="modalLabel">Title</label>
          <input onChange={this.titleChangeHandler} value={stjobtitle} className="modalInput" />
          <label className="modalLabel">Location</label>
          <input onChange={this.locationChangeHandler} value={stlocation} className="modalInput" />
          <label className="modalLabel">Email Address</label>
          <input onChange={this.emailChangeHandler} value={stemail} type="email" name="email" className="modalInput" />
          <button className="save" onClick={this.saveUpdates}>Save</button>
        </Modal>
        <div className="profileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>Basic Info</h1>
            <svg className="SVGInline-svg" style={{ width: '24px', height: '24px', marginLeft: '5px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="currentColor" fillRule="evenodd">
                <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={this.openModal} className="home-btn info">{stname === '' ? 'Add Name' : stname}</button>
            <button onClick={this.openModal} className="home-btn info">{stemail === '' ? 'Add email' : stemail}</button>
            <button onClick={this.openModal} className="home-btn info">{!stjobtitle || stjobtitle === '' ? 'Add job title' : stjobtitle}</button>
            <button onClick={this.openModal} className="home-btn info">{!stlocation || stlocation === '' ? 'Add location' : stlocation}</button>
            {/* <button className="home-btn info">Add phone number</button> */}
          </div>
        </div>
        <div className="profileField">
          <h1>User Statistics</h1>
          <div>
            <Link to="/student/reviews" className="userStat">{`Reviews Added: ${streviews.length}`}</Link>
            <Link to="/student/salaries" className="userStat">{`Salaries Added: ${stsalaries.length}`}</Link>
            <Link to="/student/interviews" className="userStat">{`Interviews Added: ${stinterviews.length}`}</Link>
            <Link to="/student/photos" className="userStat">{`Photos Added: ${cphotos.length}`}</Link>
          </div>
        </div>
      </div>
    );
  }
}
