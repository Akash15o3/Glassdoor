import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateProfile } from '../../../Actions/studentActions';
import Profile from './Profile';
import Resume from './Resume';
import JobPreferences from './JobPreferences';
import Demographics from './Demographics';

class Home extends Component {
  constructor(props) {
    super(props);
    const { stphoto } = this.props.student;
    this.state = {
      tab: 'Profile',
      stphoto,
      selectedFile: null
    };
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

  changeTab = (e) => {
    console.log(e.target);
    const tab = e.target.getAttribute('tab');
    console.log(tab);
    this.setState({ tab });
  }

  render() {
    const { tab } = this.state;
    let homeView = null;
    switch (tab) {
      case 'Profile':
        homeView = <Profile id={this.props.id} student={this.props.student} updateProfile={this.props.updateProfile} />;
        break;
      case 'Resume':
        homeView = <Resume id={this.props.id} student={this.props.student} updateProfile={this.props.updateProfile} />;
        break;
      case 'Job Preferences':
        homeView = <JobPreferences id={this.props.id} stjobpref={this.props.student.stjobpref} updateProfile={this.props.updateProfile} />;
        break;
      case 'Demographics':
        homeView = <Demographics id={this.props.id} stdemographics={this.props.student.stdemographics} updateProfile={this.props.updateProfile} />;
        break;
      default:
        homeView = null;
    }
    return (
      <div id="studentProfile">
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
            <li className={`tab ${tab === 'Profile' ? 'activeTab' : ''}`} onClick={this.changeTab} tab="Profile">Profile</li>
            <li className={`tab ${tab === 'Resume' ? 'activeTab' : ''}`} onClick={this.changeTab} tab="Resume">Resume</li>
            <li className={`tab ${tab === 'Job Preferences' ? 'activeTab' : ''}`} onClick={this.changeTab} tab="Job Preferences">Job Preferences</li>
            <li className={`tab ${tab === 'Demographics' ? 'activeTab' : ''}`} onClick={this.changeTab} tab="Demographics">Demographics</li>
          </ul>
        </div>
        {homeView}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
