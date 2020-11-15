import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="studentProfile">
        <div id="profileTabs">
          <div id="addStudentPicture">
            <svg style={{ width: '55px', height: '55px' }} viewBox="0 0 24 24">
              <path d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z" fill="grey" fillRule="evenodd" />
            </svg>
            <a style={{ position: 'relative', top: '-2vh', left: '0.25vw' }}>Add a photo</a>
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
              <button className="prof-btn info">Add name</button>
              <button className="prof-btn info">Add job title</button>
              <button className="prof-btn info">Add location</button>
              <br />
              <button className="prof-btn info">Add email address</button>
              <button className="prof-btn info">Add website</button>
              <button className="prof-btn info">Add phone number</button>
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
