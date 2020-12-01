import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateProfileEm } from '../../../Actions/employerActions';
import Profile from './Profile';
import JobDisplay from './JobDisplay';

class Home extends Component {
  constructor(props) {
    super(props);
    const { cphoto } = this.props.employer;
    this.state = {
      tab: 'Profile',
      cphoto,
      selectedFile: null,
    };
  }

  selectPhoto = () => {
    this.inputElement.click();
  };

  pictureChangeHandler = (e) => {
    console.log(e.target.files[0]);
    // this.setState({ selectedFile: e.target.files[0], upload: true });
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('id', this.props.id);
    const url = `${process.env.REACT_APP_BACKEND}/companies/uploadProfilePicture`;
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // then print response status
        console.log(res.data);
        this.setState({ cphoto: res.data });
        this.props.updateProfileEm({ cphoto: res.data });
      });
  };

  changeTab = (e) => {
    console.log(e.target);
    const tab = e.target.getAttribute('tab');
    console.log(tab);
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    let homeView = null;
    console.log('CID: ', this.props.id);
    sessionStorage.setItem('cid', this.props.id);
    switch (tab) {
      case 'Profile':
        homeView = (
          <Profile
            id={this.props.id}
            employer={this.props.employer}
            updateProfileEm={this.props.updateProfileEm}
          />
        );
        break;
      case 'Create Jobs':
        homeView = (
          <JobDisplay
            id={this.props.id}
            employer={this.props.employer}
            updateProfileEm={this.props.updateProfileEm}
          />
        );
        break;
      default:
        homeView = null;
    }
    return (
      <div id="studentProfile">
        <div id="profileTabs">
          <div id="addStudentPicture">
            <svg
              style={{
                width: '55px',
                height: '55px',
                marginTop: '10px',
                marginRight: '10px',
              }}
            >
              {/* <path d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z" fill="grey" fillRule="evenodd" /> */}
              <image
                style={{ width: '55px', height: '55px' }}
                href={this.state.cphoto}
              />
            </svg>
            <a
              style={{ position: 'relative', top: '-2vh', left: '0.25vw' }}
              onClick={this.selectPhoto}
            >
              Add a photo
            </a>
            <input
              name="profilePicture"
              onChange={this.pictureChangeHandler}
              type="file"
              style={{ display: 'none' }}
              ref={(input) => (this.inputElement = input)}
            />
          </div>
          <ul id="studentTabList" role="tablist">
            <li
              className={`tab ${tab === 'Profile' ? 'activeTab' : ''}`}
              onClick={this.changeTab}
              tab="Profile"
            >
              Profile
            </li>
            <li
              className={`tab ${tab === 'Create Jobs' ? 'activeTab' : ''}`}
              onClick={this.changeTab}
              tab="Create Jobs"
            >
              Create Jobs
            </li>
            <li
              className={`tab ${tab === 'Job Preferences' ? 'activeTab' : ''}`}
              onClick={this.changeTab}
              tab="Job Preferences"
            >
              Job Preferences
            </li>
            <li
              className={`tab ${tab === 'Demographics' ? 'activeTab' : ''}`}
              onClick={this.changeTab}
              tab="Demographics"
            >
              Demographics
            </li>
          </ul>
        </div>
        {homeView}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employer: state.employer.user,
    id: state.employer.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileEm: (updateInfo) => dispatch(updateProfileEm(updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
