import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Row, Col, NavLink } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import Modal from 'react-modal';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { updateProfileEm } from '../../Actions/employerActions';

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
      address: '',
      ajobid: '',
      jobapplicants: [],
      role: 'Applied',

      totalCountOfJobs: 0,
      applicantsApplied: 0,
      applicantsSelected: 0,
      applicantsRejected: 0,

      applicantDetails: [],

      dgenderBinaryCount: 0,
      dgenderMaleCount: 0,
      dgenderFemaleCount: 0,
      dgenderNotDisclosedCount: 0,

      draceAmericanCount: 0,
      draceAlaskanCount: 0,
      draceAsianCount: 0,
      draceBlackCount: 0,
      draceHawaiiCount: 0,
      dracePacificCount: 0,
      draceWhiteCount: 0,
      draceNotDisclosedCount: 0,

      dveteranCount: 0,
      dnotVeteranCount: 0,
      dveteranNotDisclosedCount: 0,

      ddisabledCount: 0,
      dnotdisabledCount: 0,
      ddisabledNotDisclosedCount: 0,

    };
    // this.getApplierDemographics = this.getApplierDemographics.bind(this);
  }

  componentDidMount() {
    const { searchQuery } = this.props;
    const url = `${process.env.REACT_APP_BACKEND}/jobs/getJob?cname=${sessionStorage.getItem('cname')}`;

    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            jobs: response.data,
            totalCountOfJobs: response.data.length
          });
          console.log('Jobs response fe');
          console.log(response.data);
          console.log('total jobs: ', this.state.totalCountOfJobs);
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
    console.log('job id i: ', parseInt(e.currentTarget.getAttribute('index')));
    sessionStorage.setItem('ajobid', this.state.jobs[this.state.selectedIndex]._id);
  }

  // getApplierDemographics(aapplierid) {
  //   const { searchQuery } = this.props;
  //   const url = `${process.env.REACT_APP_BACKEND}/jobs/getApplierDemographics?aapplierid=${aapplierid}`;

  //   axios.get(url)
  //     .then((response) => {
  //       if (response.data) {
  //         this.setState({
  //           applicantDetails: response.data,
  //         });
  //         console.log('applicantDetails response fe');
  //         console.log(response.data);
  //         console.log(' applicantDetails: ', this.state.applicantDetails);
  //       }
  //     });
  // }

  jobInfoStateChangeHandler = (e) => {
    console.log('Inside jobInfoStateChangeHandler', e.currentTarget.getAttribute('value'));
    this.setState({
      jobInfoState: e.currentTarget.getAttribute('value')
    });

    if (e.currentTarget.getAttribute('value') === 'japplicants' || e.currentTarget.getAttribute('value') === 'jreport') {
      axios.defaults.withCredentials = true;
      const url = `${process.env.REACT_APP_BACKEND}/jobs/getJobApplicants?ajobid=${sessionStorage.getItem('ajobid')}`;
      axios.get(url)
        .then((response, err) => {
          if (response.data) {
            this.setState({
              jobapplicants: response.data,
              // jobInfoState: e.currentTarget.getAttribute('value')
              applicantsApplied: response.data.length,

            });
            console.log('Jobs applicants response fe');
            console.log(response.data);
            console.log('job applicants: ');
            console.log(this.state.jobapplicants);
            console.log('All applicants count: ', response.data.length);
            let tempCountSelected = 0;
            let tempCountRejected = 0;
            const tempDetails = [];
            for (let i = 0; i < response.data.length; ++i) {
              if (this.state.jobapplicants[i].astatus === 'Hired') { ++tempCountSelected; } else if (this.state.jobapplicants[i].astatus === 'Withdrawn') { ++tempCountRejected; }

              // this.state.getApplierDemographics(this.state.jobapplicants[i].aapplierid);

              const url = `${process.env.REACT_APP_BACKEND}/jobs/getApplierDemographics?aapplierid=${this.state.jobapplicants[i].aapplierid}`;

              axios.get(url)
                .then((response) => {
                  if (response.data) {
                    tempDetails.push(response.data);
                    // this.setState({
                    //   applicantDetails: response.data,
                    // });
                    // console.log('applicantDetails response fe');
                    // console.log(response.data);
                    // console.log(' applicantDetails: ', this.state.applicantDetails);
                  }
                });
            }

            this.setState({
              applicantsSelected: tempCountSelected,
              applicantsRejected: tempCountRejected,
              applicantDetails: tempDetails
            });

            const genderBinaryCount = 0;
            const genderMaleCount = 0;
            const genderFemaleCount = 0;
            const genderNotDisclosedCount = 0;

            const raceAmericanCount = 0;
            const raceAlaskanCount = 0;
            const raceAsianCount = 0;
            const raceBlackCount = 0;
            const raceHawaiiCount = 0;
            const racePacificCount = 0;
            const raceWhiteCount = 0;
            const raceNotDisclosedCount = 0;

            const veteranCount = 0;
            const notVeteranCount = 0;
            const veteranNotDisclosedCount = 0;

            const disabledCount = 0;
            const notdisabledCount = 0;
            const disabledNotDisclosedCount = 0;

            for (let i = 0; i < this.state.applicantDetails.length; ++i) {
              switch (this.state.applicantDetails[i].stdemographics.disablity) {
                case 'Disabled': ++disabledCount;
                  break;

                case 'Not Disabled': ++notdisabledCount;
                  break;

                case 'Refuse to disclose': ++veteranNotDisclosedCount;
                  break;

                default:
                  console.log('D');
              }

              switch (this.state.applicantDetails[i].stdemographics.veteran) {
                case 'Protected Veteran': ++veteranCount;
                  break;

                case 'Not a Veteran': ++notVeteranCount;
                  break;

                case 'Refuse to disclose': ++veteranNotDisclosedCount;
                  break;

                default:
                  console.log('D');
              }

              switch (this.state.applicantDetails[i].stdemographics.gender) {
                case 'Male': ++genderMaleCount;
                  break;

                case 'Female': ++genderFemaleCount;
                  break;

                case 'Non-binary': ++genderBinaryCount;
                  break;

                case 'Refuse to disclose': ++genderNotDisclosedCount;
                  break;

                default:
                  console.log('D');
              }

              switch (this.state.applicantDetails[i].stdemographics.race_ethnicity) {
                case 'Alaska Native': ++raceAlaskanCount;
                  break;

                case 'Asian': ++raceAsianCount;
                  break;

                case 'Black or African American': ++raceBlackCount;
                  break;

                case 'Native Hawaiian': ++raceHawaiiCount;
                  break;

                case 'Other Pacific Islander': ++racePacificCount;
                  break;

                case 'White': ++raceWhiteCount;
                  break;

                case 'American Indian': ++raceAmericanCount;
                  break;

                case 'Refuse to disclose': ++raceNotDisclosedCount;
                  break;

                default:
                  console.log('D');
              }
            }

            this.setState({
              dgenderBinaryCount: genderBinaryCount,
              dgenderMaleCount: genderMaleCount,
              dgenderFemaleCount: genderFemaleCount,
              dgenderNotDisclosedCount: genderNotDisclosedCount,
              draceAmericanCount: raceAmericanCount,
              draceAlaskanCount: raceAlaskanCount,
              draceAsianCount: raceAsianCount,
              draceBlackCount: raceBlackCount,
              draceHawaiiCount: raceHawaiiCount,
              dracePacificCount: racePacificCount,
              draceWhiteCount: raceWhiteCount,
              draceNotDisclosedCount: raceNotDisclosedCount,
              deteranCount: veteranCount,
              dnotVeteranCount: notVeteranCount,
              dveteranNotDisclosedCount: veteranNotDisclosedCount,
              ddisabledCount: disabledCount,
              dnotdisabledCount: notdisabledCount,
              ddisabledNotDisclosedCount: disabledNotDisclosedCount,
            });

            console.log(' applicantDetails: ', this.state.applicantDetails);
            console.log('SELECTED APPLICANTS: ', this.state.applicantsSelected);
            console.log('APPLICANTS REJECTED: ', this.state.applicantsRejected);
          } else {
            console.log('ERROR IN RES! ', err);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    // console.log('jobinfo state: ', this.state.jobInfoState);
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

  roleChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      role: e.target.value,
    });
    console.log('APPLIER ID: ', e.target.id);
    const data = {
      ajobid: sessionStorage.getItem('ajobid'),
      aapplierid: e.target.id,
      astatus: e.target.value,
    };
    axios.defaults.withCredentials = true;
    const url = `${process.env.REACT_APP_BACKEND}/jobs/updateApplicantStatus`;
    axios.post(url, data)
      .then((response, err) => {
        if (response) {
          console.log(response);
        } else {
          console.log('ERROR IN UPDATE APP STATUS! ', err);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { jobs, selectedIndex, jobInfoState, coverLetter, showJobApplication } = this.state;
    console.log('jobs frontend jobs', jobs);
    console.log('selected index: ', selectedIndex);
    const selectedJob = jobs[selectedIndex];
    const jobSearchResults = jobs.map((job, i) => {
      const date = new Date(job.jposted);
      const posted_on = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return (
        <li className={`jl react-job-listing gdGrid ${selectedIndex === i ? 'selected' : ''}`} index={i} onClick={this.selectJob}>
          <div className="d-flex flex-column css-fbt9gv e1rrn5ka2">
            <a target="_blank" className="jobLink" style={{ pointerEvents: 'all' }}><span className=" css-9ujsbx euyrj9o1" /></a>
            {/* <span className="compactStars ">
              3.5
              <i className="star" />
            </span> */}
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

    // sessionStorage.setItem('ajobid', this.state.jobs[this.state.selectedIndex]._id);

    const details = this.state.jobapplicants.map(
      ({
        acoverletter,
        aresume,
        aname,
        astatus,
        aapplierid,
      }) => {
        return (
          <tr>
            <td>
              {' '}
              <a href={aname}>
                {' '}
                {aname}
              </a>
              {' '}
            </td>
            <td>{acoverletter}</td>
            <td>
              {' '}
              <a href={aresume}> Resume</a>
            </td>
            <td>
              {astatus}
            </td>
            <td>
              <select onChange={this.roleChangeHandler} id={aapplierid}>
                <option value="Applied">Applied</option>
                <option value="Initial_Screening">Initial_Screening</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </td>
          </tr>
        );
      }
    );

    // const { company, tab } = this.state;
    const tab = this.state.jobInfoState;
    console.log(jobInfoState);
    console.log(typeof (jobInfoState));
    let applicantContent = null;
    switch (tab) {
      // case 'jdescription':
      //   applicantContent = selectedJob;
      //   break;
      // case 'jresponsibilities':
      //   applicantContent = selectedJob;
      //   break;
      // case 'jqualifications':
      //   applicantContent = selectedJob;
      //   break;
      case 'japplicants':
        applicantContent = (
          <div>
            {' '}
            {details}
          </div>
        );
        break;

      case 'jreport':
        applicantContent = (
          <div>
            {' '}
            <h3>
              Total Jobs:
              {' '}
              {this.state.totalCountOfJobs}
            </h3>
            <h3>
              Total Applicants applied:
              {' '}
              {this.state.applicantsApplied}
            </h3>
            <h3>
              Total Applicants selected:
              {' '}
              {this.state.applicantsSelected}
            </h3>
            <h3>
              Total Applicants rejected:
              {' '}
              {this.state.applicantsRejected}
            </h3>

            <h3>
              {' '}
              Total Male Count:
              {' '}
              {this.state.dgenderMaleCount}
            </h3>

            <h3>
              {' '}
              Total Female Count:
              {' '}
              {this.state.dgenderFemaleCount}
            </h3>
          </div>
        );
        break;

      default:
        console.log('D');
        applicantContent = null;
    }

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
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'japplicants' ? 'active' : ''}`} data-test="tab" value="japplicants">
                              <span>
                                Applicants
                              </span>
                            </div>
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jreport' ? 'active' : ''}`} data-test="tab" value="jreport"><span>Report</span></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div id="JobDescriptionContainer" className="p-std css-1k5huso e856ufb0">
                          <div className="jobDescriptionContent desc" />
                          {selectedJob ? selectedJob[jobInfoState] : (
                            null
                          )}
                          {applicantContent}
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
