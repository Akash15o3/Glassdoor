// import React, { Component } from "react";
// import { Col, Card, FormGroup, Form } from "react-bootstrap";
// import { connect } from "react-redux";
// // import Navbar from '../Navbar.js';
// // import DatePicker from 'react-bootstrap-date-picker';
// // import Dropdown from 'react-dropdown';

// import Modal from "react-modal";
// import axios from "axios";

// Modal.setAppElement("#root");
// class Jobs extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       postingDate: new Date(),
//       deadline: new Date(),
//       city: "",
//       cstate: "",
//       country: "",
//       salary: "",
//       description: "",
//     };

//     this.onChangePostingDateHandler = this.onChangePostingDateHandler.bind(
//       this
//     );
//     // this.onPostSubmit = this.onPostSubmit.bind(this);
//     this.onChangeHandler = this.onChangeHandler.bind(this);
//   }

//   componentWillMount() {
//     document.title = "Jobs Page";
//   }

//   onChangeHandler(e) {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }

//   onChangePostingDateHandler(date) {
//     this.setState({
//       postingDate: date,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <div>{/* <Navbar /> */}</div>
//         <div className="container">
//           <div>
//             <div className="main-div-createJobPost">
//               <div className="login-form">
//                 <h2>Job Details</h2>
//               </div>
//               <form onSubmit={this.onPostSubmit}>
//                 <FormGroup row>
//                   <Col sm={12}>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="title"
//                         placeholder="Job Title"
//                         pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
//                         title="Book Title can only contain letters, digits and single space character. It must start with alphanumeric characters only."
//                         onChange={this.onChangeHandler}
//                         required
//                         autoFocus
//                       />
//                     </div>
//                   </Col>
//                 </FormGroup>
//                 {/* <FormGroup row>
//                   <Form.Label sm={2}>Posting Date: </Form.Label>
//                   <Col sm={4}>
//                     <div className="form-group">
//                       <DatePicker
//                         className="form-control"
//                         selected={this.state.postingDate}
//                         onChange={this.onChangePostingDateHandler}
//                         required
//                       />
//                     </div>
//                   </Col>

//                 </FormGroup> */}
//                 <FormGroup row>
//                   <Col sm={4}>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="city"
//                         placeholder="Job City"
//                         pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
//                         title="It can only contain letters, single space character and period. It must start with letter only."
//                         onChange={this.onChangeHandler}
//                         required
//                       />
//                     </div>
//                   </Col>
//                   <Col sm={4}>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="cstate"
//                         placeholder="Job State"
//                         pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
//                         title="It can only contain letters, single space character and period. It must start with letter only."
//                         onChange={this.onChangeHandler}
//                         required
//                       />
//                     </div>
//                   </Col>
//                   <Col sm={4}>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="country"
//                         placeholder="Job Country"
//                         pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
//                         title="It can only contain letters, single space character and period. It must start with letter only."
//                         onChange={this.onChangeHandler}
//                         required
//                       />
//                     </div>
//                   </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Col sm={5}>
//                     <div className="form-group">
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="salary"
//                         placeholder="Annual Salary in USD"
//                         title="Please enter only digits."
//                         onChange={this.onChangeHandler}
//                         required
//                       />
//                     </div>
//                   </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                   <Form.Label sm={2}>Job description: </Form.Label>
//                   <Col sm={8}>
//                     <textarea
//                       rows="8"
//                       cols="80"
//                       name="description"
//                       placeholder="Job Description"
//                       onChange={this.onChangeHandler}
//                       required
//                     />
//                   </Col>
//                 </FormGroup>

//                 <FormGroup check row>
//                   <Col sm={{ offset: 5 }}>
//                     <button type="submit" className="btn btn-primary">
//                       Post Job Opening
//                     </button>
//                   </Col>
//                 </FormGroup>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Jobs;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import Modal from 'react-modal';

Modal.setAppElement('#root');
class JobSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      selectedIndex: 0,
      jobInfoState: 'jdescription',
      resume: null,
      coverLetter: '',
      showJobApplication: false,
      address: ''
    };
  }

  componentDidMount() {
    const { searchQuery } = this.props;
    const url = `${process.env.REACT_APP_BACKEND}/search/jobs`;

    axios.post(url, { jtitle: searchQuery })
      .then((response) => {
        if (response.data) {
          this.setState({
            jobs: response.data,
          });
          console.log(response.data);
        }
      });
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  // handleSelect = (address) => {
  //   geocodeByAddress(address)
  //     .then((results) => getLatLng(results[0]))
  //     .then((latLng) => console.log('Success', latLng))
  //     .catch((error) => console.error('Error', error));
  // };

  selectJob = (e) => {
    this.setState({
      selectedIndex: parseInt(e.currentTarget.getAttribute('index'))
    });
  }

  jobInfoStateChangeHandler = (e) => {
    console.log(e.currentTarget.value);
    this.setState({
      jobInfoState: e.currentTarget.getAttribute('value')
    });
  }

  resumeChangeHandler = (e) => {
    this.setState({
      resume: e.target.value
    });
  }

  coverLetterChangeHandler = (e) => {
    this.setState({
      coverLetter: e.target.value
    });
  }

  toggleCoverLetter = () => {
    const showCoverLetter = !this.state.showCoverLetter;
    this.setState({
      showCoverLetter
    });
  }

  toggleJobApplication = () => {
    const showJobApplication = !this.state.showJobApplication;
    this.setState({
      showJobApplication
    });
  }

  filter

  render() {
    const { jobs, selectedIndex, jobInfoState, coverLetter, showJobApplication } = this.state;
    const selectedJob = jobs[selectedIndex];
    const jobSearchResults = jobs.map((job, i) => {
      const date = new Date(job.jposted);
      const posted_on = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return (
        <li className={`jl react-job-listing gdGrid ${selectedIndex === i ? 'selected' : ''}`} index={i} onClick={this.selectJob}>
          <div className="d-flex flex-column css-fbt9gv e1rrn5ka2">
            <a target="_blank" className="jobLink" style={{ pointerEvents: 'all' }}><span className=" css-9ujsbx euyrj9o1"><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's Logo" title="McDonald's Logo" /></span></a>
            <span className="compactStars ">
              3.5
              <i className="star" />
            </span>
          </div>
          <div className="d-flex flex-column pl-sm css-nq3w9f">
            <div className="jobHeader d-flex justify-content-between align-items-start">
              <a rel="nofollow noopener noreferrer" target="_blank" className=" css-10l5u4p e1n63ojh0 jobLink" style={{ pointerEvents: 'all', marginBottom: '5px' }}><span>{job.cname}</span></a>
            </div>
            <a rel="nofollow noopener noreferrer" target="_blank" className="jobInfoItem jobTitle css-13w0lq6 eigr9kq1 jobLink" style={{ pointerEvents: 'all', textAlign: 'left', marginBottom: '5px' }}><span>{job.jtitle}</span></a>
            <div style={{ marginBottom: '10px' }} className="d-flex flex-wrap css-yytu5e e1rrn5ka1">
              <span className="loc css-nq3w9f pr-xxsm">{`${job.jcity}, ${job.jstate}`}</span>
            </div>
            <div className="d-flex flex-wrap css-yytu5e e1rrn5ka1">
              <span className="loc css-nq3w9f pr-xxsm">{posted_on}</span>
            </div>
          </div>
        </li>
      );
    });

    return (
      <div style={{ marginTop: '15px' }}>
        <Modal isOpen={showJobApplication} onRequestClose={this.toggleJobApplication} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black', padding: 0, textAlign: 'center' } }}>
          <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.toggleJobApplication}>
            <svg className="SVGInline-svg modal_closeIcon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="gray" fillRule="evenodd" />
            </svg>
          </span>
          <div style={{ borderBottom: '1px solid gray', paddingBottom: '5px' }}>
            <h1>Apply for Job</h1>
            <h2 style={{ fontStyle: 'italic' }}>{selectedJob ? selectedJob.jtitle : ''}</h2>
            {/* <h2 style={{ fontStyle: 'italic' }}>Software Development Engineer</h2> */}
          </div>
          <div style={{ marginTop: '45px', marginBottom: '25px' }}>
            <label style={{ marginRight: '10px' }}>Resume: </label>
            {/* <select onChange={this.resumeChangeHandler} className="filter">
              {this.props.resumes.map((resume, i) => {
                return <option value={resume.stresume}>{`Resume #${i + 1}`}</option>;
              })}
            </select> */}
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', }}>Cover Letter </label>
            <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none' }} value={coverLetter} onChange={this.coverLetterChangeHandler} rows="10" cols="50" />
          </div>
          <button className="save" onClick={this.saveUpdates}>Apply</button>
        </Modal>
        <div id="HzFiltersWrap" style={{ zIndex: 0 }}>
          <header id="DKFilters" className="wide">
            <div className="selectContainer">
              <select className="filter">
                <option>Recent</option>
                <option>Highest Rated</option>
              </select>
              <input className="filter" placeholder="Minimum Salary" />
              <input className="filter" placeholder="Maximum Salary" />
              {/* <input className="filter" placeholder="Location" /> */}
              <PlacesAutocomplete
                className="filter"
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input filter',
                      })}
                    />
                    <div className="autocomplete-dropdown-container" style={{ width: '218px', border: '1px solid gray' }}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: '5px' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer', padding: '5px' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <input className="filter" placeholder="Job Type" />
            </div>
          </header>
        </div>
        <div id="jobSearchResults">
          <ul style={{ flex: 7, overflowY: 'scroll', height: '65%' }} className="jlGrid hover p-0 ">
            {jobSearchResults}
          </ul>
          <div id="JDCol" className="noPad opened transformNone">
            <div id="JDWrapper" className>
              <article className="jobDetails scrollable active" data-id={3698330974}>
                <div className="jobViewMinimal">
                  <div className="intersection-visible-wrapper">
                    <div id="HeroHeaderModule" data-brandviews="BRAND:n=jsearch-hero-header:eid=432:jlid=3698330974">
                      <div className="empWrapper ctasTest">
                        <div className="empInfo newDetails">
                          <div className="employerName">
                            {selectedJob ? selectedJob.cname : ''}
                            <span className="rating">
                              3.5
                              <span className="ratingStar" />
                            </span>
                          </div>
                          <div className="title">{selectedJob ? selectedJob.jtitle : ''}</div>
                          <div className="location">{`${selectedJob ? selectedJob.jcity : ''}, ${selectedJob ? selectedJob.jstate : ''}`}</div>
                        </div>
                        <button onClick={this.toggleJobApplication} className="btn btn-primary">
                          <i className="icon-bolt margRtSm" />
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id="Details">
                    <div className="jobDetailsInfoWrap">
                      <div className="jobDetailsHeader jobDetailsTabs">
                        <div className="scrollableTabContainer">
                          <div className="scrollableTabs">
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jdescription' ? 'active' : ''}`} data-test="tab" value="jdescription"><span>Description</span></div>
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jresponsibilities' ? 'active' : ''}`} data-test="tab" value="jresponsibilities"><span>Responsibilites</span></div>
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jqualifications' ? 'active' : ''}`} data-test="tab" value="jqualifications"><span>Qualifications</span></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div id="JobDescriptionContainer" className="p-std css-1k5huso e856ufb0">
                          <div className="jobDescriptionContent desc" />
                          {selectedJob ? selectedJob[jobInfoState] : (
                            null
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchQuery: state.student.searchQuery,
    // resumes: state.student.user.stresumes
  };
};

export default connect(mapStateToProps)(JobSearchResults);
