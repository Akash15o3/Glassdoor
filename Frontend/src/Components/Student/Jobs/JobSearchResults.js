import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import PlacesAutocomplete from 'react-places-autocomplete';
import Modal from 'react-modal';
import Pagination from '../../Pagination';

Modal.setAppElement('#root');
class JobSearchResults extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 10;
    this.state = {
      jobs: [],
      selectedIndex: 0,
      jobInfoState: 'jdescription',
      resume: null,
      coverLetter: '',
      showJobApplication: false,
      address: '',
      minSalary: 0,
      maxSalary: Infinity,
      loading: true,
      pageIndex: 0,
      numPages: 0,
      numJobs: 0
    };
  }

  componentDidMount() {
    const { searchQuery } = this.props;
    const Promises = [];
    let url = `${process.env.REACT_APP_BACKEND}/search/jobs`;
    Promises.push(axios.post(url, { jtitle: searchQuery })
      .then((response) => {
        if (response.data) {
          this.allJobs = response.data;
          this.setState({
            jobs: response.data
          });
        }
      }));
    url = `${process.env.REACT_APP_BACKEND}/search/jobs/numPages`;
    Promises.push(axios.post(url, { jtitle: searchQuery })
      .then((response) => {
        if (response.data) {
          const { numJobs } = response.data;
          this.setState({
            numJobs, numPages: Math.ceil(numJobs / this.itemsPerPage)
          });
        }
      }));
    Promise.all(Promises).then(() => this.setState({ loading: false }));
  }

  handleAddressChange = (address) => {
    this.setState({ address });
  };

  handleAddressSelect = (address) => {
    const { jobs } = this.state;
    /* global google */
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [address],
        destinations: jobs.map((job) => `${job.jcity}, ${job.jstate}`),
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          const { elements } = response.rows[0];
          elements.forEach((item, i) => {
            jobs[i].distance = item.distance;
          });
          jobs.sort((a, b) => {
            return a.distance.value - b.distance.value;
          });
          this.setState({ address, jobs });
        }
      }
    );
  };

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

  sortTypeChangeHandler = (e) => {
    const sortType = e.target.value;
    const { jobs } = this.state;
    if (sortType === 'Date') jobs.sort((a, b) => Date.parse(a.jposted) - Date.parse(b.jposted));
    else if (sortType === 'Rating') jobs.sort((a, b) => b.crating - a.crating);
    this.setState({ jobs });
  }

  jobTypeFilterChangeHandler = (e) => {
    const jobs = this.allJobs.filter((job) => job.jtype === e.target.value);
    this.setState({ jobs });
  }

  salaryFilterChangeHandler = (e) => {
    const salaryType = e.target.getAttribute('salaryType');
    let{ minSalary, maxSalary } = this.state;
    if (salaryType === 'min') minSalary = parseInt(e.target.value);
    else if (salaryType === 'max') maxSalary = parseInt(e.target.value);
    if (Number.isNaN(minSalary)) minSalary = 0;
    else if (Number.isNaN(maxSalary)) maxSalary = Infinity;
    if (minSalary === 0 && maxSalary === Infinity) {
      this.setState({ jobs: this.allJobs });
      return;
    }
    console.log(`Min Salary: ${minSalary}, Max Salary: ${maxSalary}`);
    const jobs = this.allJobs.filter((job) => job.jsalary >= minSalary && job.jsalary <= maxSalary);
    this.setState({ jobs, minSalary, maxSalary });
  }

  submitApplication = () => {
    const url = `${process.env.REACT_APP_BACKEND}/students/submitApplication`;
    const { jobs, selectedIndex, resume, coverLetter } = this.state;
    const { _id, cname, jtitle } = jobs[selectedIndex];
    const data = { ajobid: _id, aapplierid: this.props.id, aresume: resume, acoverletter: coverLetter, cname, jtitle, aname: this.props.name };
    console.log(data);
    axios.post(url, data)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.toggleJobApplication();
        }
      });
  }

  setPage = (e) => {
    this.setState({
      loading: true
    });
    const { className } = e.currentTarget;
    const { numPages } = this.state;
    let { pageIndex } = this.state;
    if (className === 'prev' && pageIndex > 0) {
      pageIndex -= 1;
    } else if (className === 'next' && pageIndex < numPages - 1) {
      pageIndex += 1;
    } else if (className.includes('page')) {
      pageIndex = parseInt(e.currentTarget.getAttribute('pageIndex'));
    }
    const url = `${process.env.REACT_APP_BACKEND}/search/jobs`;
    axios.post(url, { jtitle: this.props.searchQuery, skip: pageIndex })
      .then((response) => {
        if (response.data) {
          this.setState({
            jobs: response.data, pageIndex, loading: false
          });
        }
      });
  }

  render() {
    const { jobs, selectedIndex, jobInfoState, coverLetter, showJobApplication, loading, numJobs, numPages, pageIndex } = this.state;
    const { itemsPerPage } = this;
    let numItems = 0;
    if (numJobs > 0) numItems = numPages === pageIndex + 1 && numJobs % itemsPerPage !== 0 ? numJobs % itemsPerPage : itemsPerPage;
    const selectedJob = jobs[selectedIndex];

    const jobSearchResults = jobs.map((job, i) => {
      const date = new Date(job.jposted);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      return (
        <li className={`jl react-job-listing gdGrid ${selectedIndex === i ? 'selected' : ''}`} index={i} onClick={this.selectJob}>
          <div className="d-flex flex-column css-fbt9gv e1rrn5ka2">
            <a target="_blank" className="jobLink" style={{ pointerEvents: 'all' }}><span className=" css-9ujsbx euyrj9o1"><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's Logo" title="McDonald's Logo" /></span></a>
            <span className="compactStars ">
              {job.crating}
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
            <div style={{ marginBottom: '10px' }} className="d-flex flex-wrap css-yytu5e e1rrn5ka1">
              <span className="loc css-nq3w9f pr-xxsm">{posted_on}</span>
            </div>
            {job.jsalary
              ? (
                <div className="d-flex flex-wrap css-yytu5e e1rrn5ka1">
                  <span className="loc css-nq3w9f pr-xxsm">{`$${job.jsalary}/hour`}</span>
                </div>
              ) : null}
          </div>
        </li>
      );
    });

    return loading ? <div className="loader"><BeatLoader color="green" /></div> : (
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
            <select onChange={this.resumeChangeHandler} className="filter">
              {this.props.resumes.map((resume, i) => {
                return <option selected={resume.stselect === 'Primary'} value={resume.stresume}>{`Resume #${i + 1}`}</option>;
              })}
            </select>
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', }}>Cover Letter </label>
            <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none' }} value={coverLetter} onChange={this.coverLetterChangeHandler} rows="10" cols="50" />
          </div>
          {this.props.isAuth ? <button onClick={this.submitApplication} className="save">Apply</button> : null}
        </Modal>
        <div id="HzFiltersWrap">
          <header id="DKFilters" className="wide">
            <div className="selectContainer">
              <select onChange={this.sortTypeChangeHandler} on className="filter">
                <option value="Date">Recent</option>
                <option value="Rating">Highest Rated</option>
              </select>
              {/* <input className="filter" placeholder="Location" /> */}
              <select onChange={this.jobTypeFilterChangeHandler} className="filter" style={{ fontSize: 'medium' }}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
              </select>
              <PlacesAutocomplete
                className="filter"
                value={this.state.address}
                onChange={this.handleAddressChange}
                onSelect={this.handleAddressSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input filter',
                      })}
                    />
                    <div className="autocomplete-dropdown-container" style={{ width: '218px', borderRight: '1px solid gray', borderLeft: '1px solid gray' }}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer', borderBottom: '1px solid gray', padding: '5px', zIndex: 1000 }
                          : { backgroundColor: '#ffffff', cursor: 'pointer', borderBottom: '1px solid gray', padding: '5px', zIndex: 1000 };
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

              <input type="number" onChange={this.salaryFilterChangeHandler} salaryType="min" className="filter" placeholder="Minimum Salary" />
              <input type="number" onChange={this.salaryFilterChangeHandler} salaryType="max" className="filter" placeholder="Maximum Salary" />
            </div>
          </header>
        </div>
        <div id="jobSearchResults">
          <ul style={{ flex: 7, overflowY: 'scroll', height: '65%' }} className="jlGrid hover p-0 ">
            {jobSearchResults}
            <Pagination setPage={this.setPage} page={pageIndex} numPages={numPages} />
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
                              {selectedJob ? selectedJob.crating : ''}
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
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jdescription' ? 'active' : ''}`} value="jdescription"><span>Description</span></div>
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jresponsibilities' ? 'active' : ''}`} value="jresponsibilities"><span>Responsibilites</span></div>
                            <div onClick={this.jobInfoStateChangeHandler} className={`tab ${jobInfoState === 'jqualifications' ? 'active' : ''}`} value="jqualifications"><span>Qualifications</span></div>
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
  if (state.credentials.isAuth) {
    return {
      isAuth: state.credentials.isAuth,
      searchQuery: state.student.searchQuery,
      resumes: state.student.user.stresumes,
      name: state.student.user.stname,
      id: state.student.id
    };
  }

  return {
    searchQuery: state.student.searchQuery,
    resumes: []
  };
};

export default connect(mapStateToProps)(JobSearchResults);
