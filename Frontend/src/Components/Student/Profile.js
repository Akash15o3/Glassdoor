import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateProfile } from '../../Actions/studentActions';

Modal.setAppElement('#root');
class Profile extends Component {
  constructor(props) {
    super(props);
    const { stname, stemail, stphoto } = this.props.student;
    this.state = {
      open: false,
      stname,
      title: '',
      location: '',
      stemail,
      stphoto,
      selectedFile: null
    };
  }

  updateProfile = () => {
    this.setState({ open: true });
  }

  closeWithoutSaving = () => {
    const { stname, stemail } = this.props.student;
    this.setState({ stname, stemail, open: false });
  }

  nameChangeHandler = (e) => {
    this.setState({
      stname: e.target.value
    });
  }

  titleChangeHandler = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  emailChangeHandler = (e) => {
    this.setState({
      stemail: e.target.value
    });
  }

  saveUpdates = () => {
    const { id } = this.props;
    const { stname, stemail } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateProfile`;
    axios.post(url, { id, stname, stemail })
      .then((response) => {
        console.log(response);
      });
    this.props.updateProfile({ stname, stemail });
    this.setState({ open: false });
  }

  selectPhoto = () => {
    this.inputElement.click();
  }

  pictureChangeHandler = (e) => {
    console.log(e.target.files[0]);
    // this.setState({ selectedFile: e.target.files[0], upload: true });
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('id', this.props.id);
    const url = `${process.env.REACT_APP_BACKEND}/students/uploadProfilePicture`;
    axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      } })
      .then((res) => { // then print response status
        console.log(res.data);
        this.setState({ stphoto: res.data });
        this.props.updateProfile({ stphoto: res.data });
      });
  }

  // handleUpload = () => {
  //   const data = new FormData();
  //   data.append('file', this.state.selectedFile);
  //   data.append('id', this.props.id);
  //   const url = `${process.env.REACT_APP_BACKEND}/students/uploadProfilePicture`;
  //   axios.post(url, data, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     } })
  //     .then((res) => { // then print response status
  //       console.log(res.data);
  //       this.setState({ stphoto: res.data });
  //       this.props.updateProfile({ stphoto: res.data });
  //     });
  // }

  render() {
    const { stname, title, location, stemail } = this.state;
    console.log(this.props.student);
    return (
      <div id="studentProfile">
        <Modal isOpen={this.state.open} onRequestClose={this.closeWithoutSaving} style={{ content: { width: '55%', margin: 'auto' } }}>
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
          <input onChange={this.titleChangeHandler} value={title} className="modalInput" />
          <label className="modalLabel">Location</label>
          <input onChange={this.locationChangeHandler} value={location} className="modalInput" />
          <label className="modalLabel">Email Address</label>
          <input onChange={this.emailChangeHandler} value={stemail} type="email" name="email" className="modalInput" />
          <button className="save" onClick={this.saveUpdates}>Save</button>

        </Modal>
        <div id="profileTabs">
          <div id="addStudentPicture">
            <svg style={{ width: '55px', height: '55px', marginRight: '10px' }}>
              {/* <path d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z" fill="grey" fillRule="evenodd" /> */}
              <image style={{ width: '55px', height: '55px' }} href={this.state.stphoto} />
            </svg>
            <a style={{ position: 'relative', top: '-2vh', left: '0.25vw' }} onClick={this.selectPhoto}>Add a photo</a>
            <input name="profilePicture" onChange={this.pictureChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
          </div>
          <ul id="studentTabList" role="tablist">
            <li>Profile</li>
            <li>Resume</li>
            <li>Job Preferences</li>
            <li>Demographics</li>
          </ul>
        </div>
        <div id="profileView">
          <div className="profileField">
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ display: 'inline-block' }}>Info</h1>
              <svg className="SVGInline-svg" style={{ width: '24px', height: '24px', marginLeft: '5px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="currentColor" fillRule="evenodd">
                  <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
                </g>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button onClick={this.updateProfile} className="prof-btn info">{stname === '' ? 'Add Name' : stname}</button>
              <button onClick={this.updateProfile} className="prof-btn info">{stemail === '' ? 'Add email' : stemail}</button>
              <button onClick={this.updateProfile} className="prof-btn info">{title === '' ? 'Add job title' : title}</button>
              <button onClick={this.updateProfile} className="prof-btn info">{location === '' ? 'Add location' : location}</button>
              {/* <button className="prof-btn info">Add phone number</button> */}
            </div>
          </div>
          <div className="profileField">
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ display: 'inline-block' }}>About Me</h1>
              <svg className="SVGInline-svg" style={{ width: '24px', height: '24px', marginLeft: '5px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="currentColor" fillRule="evenodd">
                  <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
                </g>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="prof-btn info">
                <strong>Add an introduction</strong>
                {' '}
                about yourself with a brief summary of your experience.
              </button>
            </div>
          </div>
          <div className="profileField">
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ display: 'inline-block' }}>Experience</h1>
              <svg className="SVGInline-svg" style={{ width: '24px', height: '24px', marginLeft: '5px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="currentColor" fillRule="evenodd">
                  <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
                </g>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="prof-btn info">
                <strong>Add your work history</strong>
                {' '}
                including any internships or contract work and qualifications.
              </button>
            </div>
          </div>
          <div className="profileField">
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ display: 'inline-block' }}>Education</h1>
              <svg className="SVGInline-svg" style={{ width: '24px', height: '24px', marginLeft: '5px' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="currentColor" fillRule="evenodd">
                  <path id="prefix__icon-edit" d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z" />
                </g>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="prof-btn info">
                <strong>Add your most recent education</strong>
                {' '}
                Since many jobs require a certain level of education, it’s important to mention your academic credentials on your resume.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student.user,
    id: state.student.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (updateInfo) => dispatch(updateProfile(updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
