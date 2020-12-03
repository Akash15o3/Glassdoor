import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

// import CompanyOverview from './CompanyOverview';
// import CompanyReviews from './CompanyReviews';
// import CompanyJobs from './CompanyJobs';
// import CompanySalaries from './CompanySalaries';
// import CompanyInterviews from './CompanyInterviews';
// import CompanyPhotos from './CompanyPhotos';

class CompanyHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      reviews: [],
      cphotos: [],
      salaries: [],
      jobs: [],
      tab: 'Overview',
      aapplierid: '',
      stname: '',
      stemail: '',
      stphoto: '',
      stjobpref: '',
      title: '',
      targetsalary: '',
      industry: '',
      relocation: '',
      gender: '',
      disability: '',
      ethnicity: '',
      veteran: '',
      stdemographics: '',
      loading: true,
    };
  }

  componentDidMount() {
    // const { cid } = this.props;
    // let cid;
    const data = {
      aapplierid: this.props.match.params.aapplierid,
    };
    const url = `${process.env.REACT_APP_BACKEND}/students/${data.aapplierid}`;
    axios.get(url).then((response) => {
      if (response.data) {
        // const company = response.data;
        console.log('Student response: ');
        console.log(response.data);
        this.setState({
          stname: response.data.stname,
          stemail: response.data.stemail,
          stphoto: response.data.stphoto,
          stjobpref: { ...response.data.stjobpref },
          stdemographics: { ...response.data.stdemographics },
          loading: false,
          // relocation: response.data.stjobpref.strelocation,
          // title: response.data.title,
          // targetsalary: response.data.targetsalary,
          // industry: response.data.industry,
          // relocation: response.data.relocation,
          // gender: response.data.gender,
          // disability: response.data.disability,
          // ethnicity: response.data.ethnicity,
          // veteran: response.data.veteran,
        });
        console.log('student profile response', response.data);
      }
    });
  }

  tabChangeHandler = (e) => {
    this.setState({
      tab: e.currentTarget.getAttribute('data-label'),
    });
  };

  //   updatePhotos = (cphotos) => {
  //     this.setState({ cphotos });
  //   }

  //   updateSalaries = (salaries) => {
  //     this.setState({ salaries });
  //   }

  render() {
    const { tab } = this.state;
    console.log(tab);
    const companyContent = null;
    // switch (tab) {
    //   case "Overview":
    //     companyContent = <CompanyOverview company={company} />;
    //     break;
    //   case "Reviews":
    //     companyContent = <CompanyReviews company={company} reviews={reviews} />;
    //     break;
    //   case "Jobs":
    //     companyContent = <CompanyJobs jobs={jobs} />;
    //     break;
    //   case "Salaries":
    //     companyContent = (
    //       <CompanySalaries
    //         salaries={salaries}
    //         cname={company.cname}
    //         updateSalaries={this.updateSalaries}
    //       />
    //     );
    //     break;
    //   case "Interview":
    //     companyContent = <CompanyInterviews />;
    //     break;
    //   case "Photos":
    //     companyContent = (
    //       <CompanyPhotos
    //         cphotos={cphotos}
    //         updatePhotos={this.updatePhotos}
    //         stid={this.props.id}
    //         stname={this.props.name}
    //         cid={company._id}
    //         cname={company.cname}
    //       />
    //     );
    //     break;
    //   default:
    //     console.log("D");
    //     companyContent = null;
    // }
    return this.state.loading ? (
      <div className="loader cTab">
        <BeatLoader color="green" />
      </div>
    ) : (
      <div>
        <div
          id="EIHdrModule"
          className="snug module noblur eep sticky"
          style={{
            width: '992px',
            top: '1px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div className="logo cell">
            <span className="sqLogo tighten lgSqLogo logoOverlay">
              <img
                src={this.state.stphoto}
                className
                title
                style={{ width: '120px', height: '120px' }}
              />
            </span>
          </div>
          <div
            id="EmpHeroAndEmpInfo"
            className="gdGrid"
            data-brandviews="MODULE:n=hub-profileImage:eid=432"
          >
            <div
              className="empInfo tbl hideHH "
            >
              <div
                className="header cell info"
              >
                <h1
                  className=" strong tightAll"
                  title
                  data-company="McDonald's"
                >
                  {/* <span
                    id="DivisionsDropdownComponent"
                    className="d-inline-flex align-items-center"
                  > */}
                  <p>
                    Student Name:
                    {' '}
                    {this.state.stname}
                  </p>
                  <h2>JOB PRERERENCES: </h2>
                  <p>
                    Title:
                    {' '}
                    {this.state.stjobpref.title}
                  </p>
                  <p>
                    Target Industry:
                    {' '}
                    {this.state.stjobpref.industry}
                  </p>
                  <p>
                    Search Status:
                    {' '}
                    {this.state.stjobpref.searchstatus}
                  </p>
                  <p>
                    Relocation Preference:
                    {' '}
                    {this.state.stjobpref.relocation}
                  </p>
                  <p>
                    Target Salary:
                    {' '}
                    {this.state.stjobpref.targetsalary}
                  </p>
                  <h2>DEMOGRAPHICS</h2>
                  <p>
                    Gender:
                    {' '}
                    {this.state.stdemographics.gender}
                  </p>
                  <p>
                    Disability status:
                    {' '}
                    {this.state.stdemographics.disability}
                  </p>
                  <p>
                    Ethnicity Status:
                    {' '}
                    {this.state.stdemographics.race_ethnicity}
                  </p>
                  <p>
                    Veteran status:
                    {' '}
                    {this.state.stdemographics.veteran}
                  </p>

                  {/* </span> */}
                </h1>
              </div>
              <div className="cell unlock small showDesk" />
            </div>
          </div>
          {/* <div id="StickyNavWrapper" className="stickyNavWrapper ">
            <div id="SmarterNavContainer" className="initialStick">
              <div id="SmarterBannerContainer" />
              <div id="EmpLinksWrapper" className="empLinksWrapper  sticky">
                <div className="empLinks tbl ">
                  <div id="EIProductHeaders" className="tbl eiProductCells">
                    <div className="row ">
                      <a
                        className="eiCell cell reviews "
                        onClick={this.tabChangeHandler}
                        data-label="Overview"
                      >
                        <span className="subtle"> Overview</span>
                      </a>
                      <div className="vline cell">
                        <i />
                      </div>
                      <a
                        className="eiCell cell reviews "
                        onClick={this.tabChangeHandler}
                        data-label="Reviews"
                      >
                        <span className="num h2"> 43k</span>
                        <span className="subtle"> Reviews</span>
                      </a>
                      <div className="vline cell">
                        <i />
                      </div>
                      <a
                        className="eiCell cell jobs "
                        onClick={this.tabChangeHandler}
                        data-label="Jobs"
                      >
                        <span className="num h2"> 56k</span>
                        <span className="subtle"> Jobs</span>
                      </a>
                      <div className="vline cell">
                        <i />
                      </div>
                      <a
                        className="eiCell cell salaries "
                        onClick={this.tabChangeHandler}
                        data-label="Salaries"
                      >
                        <span className="num h2"> 40k</span>
                        <span className="subtle"> Salaries</span>
                      </a>
                      <div className="vline cell">
                        <i />
                      </div>
                      <a
                        className="eiCell cell interviews "
                        onClick={this.tabChangeHandler}
                        data-label="Interview"
                      >
                        <span className="num h2"> 7.3k</span>
                        <span className="subtle"> Inter­views</span>
                      </a>
                      <div className="vline cell">
                        <i />
                      </div>
                      <div className="vline cell">
                        <i />
                      </div>
                      <a
                        className="eiCell cell photos "
                        onClick={this.tabChangeHandler}
                        data-label="Photos"
                      >
                        <span className="num h2"> 291</span>
                        <span className="subtle"> Photos</span>
                      </a>
                    </div>
                  </div>
                  <div className="buttons cell showDesk padRt alignRt">
                    <div
                      id="EIHeaderFollowButton"
                      style={{ display: 'inline-block', marginRight: '12px' }}
                    />
                    <a
                      href="/mz-survey/employer/collectReview_input.htm?i=432&j=true&y=&c=PAGE_INFOSITE_TOP"
                      className="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med gd-btn-icon padHorz addReview"
                    >
                      <i className="btn-plus margRtSm" />
                      <span>Add a Review</span>
                      <i className="hlpr" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {companyContent}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     cid: state.student.cid,
//     id: state.student.id,
//     name: state.student.user.stname,
//   };
// };

export default CompanyHomePage;
