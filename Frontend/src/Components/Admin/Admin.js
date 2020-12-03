import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AdminTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: '',
      companies: [],
      students: [],
      topCEOs: [],
      topCEOsHit: false,
      studentsHit: false,
      reviewsHit: false,
      companiesHit: false,
      display: ''
    };

    this.getNumReviews = this.getNumReviews.bind(this);
    this.topReviewedCompanies = this.topReviewedCompanies.bind(this);
    this.topRatedCompanies = this.topRatedCompanies.bind(this);
    this.topStudents = this.topStudents.bind(this);
    this.topCEOs = this.topCEOs.bind(this);
    this.topViewedCompanies = this.topViewedCompanies.bind(this);
  }

  componentDidMount() {
    this.setState({
      reviews: '',
      companies: [],
      students: [],
      topCEOs: [],
      topCEOsHit: false,
      studentsHit: false,
      reviewsHit: false,
      companiesHit: false,
      display: ''
    });
  }

  getNumReviews = (event) => {
    const url = `${process.env.REACT_APP_BACKEND}/admin/reviewsPerDay`;
    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            reviews: response.data,
            reviewsHit: true,
            companies: [],
            students: [],
            topCEOs: [],
            topCEOsHit: false,
            studentsHit: false,
            companiesHit: false,
            display: 'Showing Reviews Added Today'
          });
        }
      });
  }

  topReviewedCompanies = (event) => {
    const url = `${process.env.REACT_APP_BACKEND}/admin/mostReviewed`;
    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            companies: [...response.data],
            companiesHit: true,
            reviews: '',
            students: [],
            topCEOs: [],
            topCEOsHit: false,
            studentsHit: false,
            reviewsHit: false,
            display: 'Showing 1-5 of 5 Most Reviewed Companies'
          });
        }
      });
  }

  topRatedCompanies = (event) => {
    const url = `${process.env.REACT_APP_BACKEND}/admin/bestAvg`;
    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            companies: [...response.data],
            companiesHit: true,
            reviews: '',
            students: [],
            topCEOs: [],
            topCEOsHit: false,
            studentsHit: false,
            reviewsHit: false,
            display: 'Showing 1-5 of 5 Top Rated Companies'
          });
        }
      });
  }

  topStudents = (event) => {
    const url = `${process.env.REACT_APP_BACKEND}/admin/topStudents`;
    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            students: [...response.data],
            studentsHit: true,
            reviews: '',
            companies: [],
            topCEOs: [],
            topCEOsHit: false,
            reviewsHit: false,
            companiesHit: false,
            display: 'Showing 1-5 of 5 Students with highest accepted reviews'
          });
        }
      });
  }

  topCEOs = (event) => {
    const url = `${process.env.REACT_APP_BACKEND}/admin/topCEO`;
    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            topCEOs: [...response.data],
            topCEOsHit: true,
            reviews: '',
            companies: [],
            students: [],
            studentsHit: false,
            reviewsHit: false,
            companiesHit: false,
            display: 'Showing 1-10 of 10 Top CEOs'
          });
        }
      });
  }

  topViewedCompanies = (event) => {
    const url = `${process.env.REACT_APP_BACKEND}/admin/topViewed`;
    axios.get(url)
      .then((response) => {
        if (response.data) {
          this.setState({
            companies: [...response.data],
            companiesHit: true,
            reviews: '',
            students: [],
            topCEOs: [],
            topCEOsHit: false,
            studentsHit: false,
            reviewsHit: false,
            display: 'Showing 1-10 of 10 Top Viewed Companies in last 24 hours'
          });
        }
      });
  }

  render() {
    let displayElement = (
      <div>
        {' '}
        <br />
        <br />
        <h2>Welcome, Admin</h2>
        {' '}
      </div>
    );

    if (this.state.reviewsHit === true) {
      displayElement = (
        <div>
          {this.state.reviews}
          {' '}
          reviews were added today.
        </div>
      );
    }
    if (this.state.companiesHit === true) {
      displayElement = this.state.companies.map((item) => (
        <div className="single-company-result module ">
          <div className="row justify-content-between">
            <div className="col-lg-7">
              <div className="row justify-content-start">
                <div className="col-3 logo-and-ratings-wrap">
                  <a>
                    <span>
                      <img src={item.cphoto} className="img-thumbnail" alt="photo" width="300" />
                    </span>
                  </a>
                </div>
                <div className="col-9 pr-0">
                  <h2>
                    <Link to={{
                      pathname: '/admin/company',
                      query: {
                        cid: `${item._id}`,
                      },
                    }}
                    >
                      {' '}
                      {item.cname}
                      {' '}
                    </Link>
                    <div>
                      <span>
                        <span className="bigRating strong margRtSm h2">{item.averageRating}</span>
                        <span className="gdStars gdRatings sm ">
                          <i>
                            <i />
                            <i className="star"><span>Star</span></i>
                          </i>
                        </span>
                      </span>
                    </div>
                  </h2>
                  <div>
                    <p className="hqInfo adr m-0">
                      <span>
                        {' '}
                        { item.clocation }
                      </span>
                    </p>
                    <p className="webInfo mb-0 mt-xxsm"><span><a>{ item.cwebsite }</a></span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 ei-contributions-count-wrap mt-std">
              <div className="row justify-content-between">
                <div className="ei-contribution-wrap col-4 pl-lg-0 pr-0">
                  <a className="eiCell cell reviews d-inline-block py-sm">
                    <span className="num h2">
                      {' '}
                      { item.reviewCount }
                    </span>
                    <span className="subtle"> Reviews</span>
                  </a>
                </div>
                <div className="ei-contribution-wrap col-4 p-0">
                  <a className="eiCell cell salaries d-inline-block py-sm">
                    <span className="num h2">
                      {' '}
                      { item.salaryCount }
                    </span>
                    <span className="subtle"> Salaries</span>
                  </a>
                </div>
                <div className="ei-contribution-wrap col-4 pl-0">
                  <a className="eiCell cell interviews d-inline-block py-sm">
                    <span className="num h2">
                      {' '}
                      { item.interviewCount }
                    </span>
                    <span className="subtle"> Inter­views</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    if (this.state.studentsHit === true) {
      displayElement = this.state.students.map((item) => (
        <div className="single-company-result module ">
          <div className="row justify-content-between">
            <div className="col-lg-7">
              <div className="row justify-content-start">
                <div className="col-3 logo-and-ratings-wrap">
                  <a>
                    <span>
                      <img src={item.stphoto} className="img-thumbnail" alt="photo" width="300" />
                    </span>
                  </a>
                </div>
                <div className="col-9 pr-0">
                  <h2>
                    <Link to={{
                      pathname: '/admin/company',
                      query: {
                        cid: `${item._id}`,
                      },
                    }}
                    >
                      {' '}
                      {item.stname}
                      {' '}
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-5 ei-contributions-count-wrap mt-std">
              <div className="row justify-content-between">
                <div className="ei-contribution-wrap col-4 pl-lg-0 pr-0">
                  <a className="eiCell cell reviews d-inline-block py-sm">
                    <span className="num h2">
                      {' '}
                      { item.streviews.length }
                    </span>
                    <span className="subtle"> Reviews Submitted</span>
                  </a>
                </div>
                <div className="ei-contribution-wrap col-4 p-0">
                  <a className="eiCell cell salaries d-inline-block py-sm">
                    <span className="num h2">
                      {' '}
                      { item.streviewsaccepted }
                    </span>
                    <span className="subtle">Reviews Accepted</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    if (this.state.topCEOsHit === true) {
      displayElement = this.state.topCEOs.map((item) => (
        <div className="single-company-result module ">
          <div className="row justify-content-between">
            <div className="col-lg-7">
              <div className="row justify-content-start">
                <div className="col-3 logo-and-ratings-wrap">
                  <a>
                    <span>
                      <img src="https://thumbs.dreamstime.com/z/ceo-looking-city-planning-rear-view-company-large-buildings-his-office-window-d-rendering-mock-up-toned-82642174.jpg" className="img-thumbnail" alt="photo" width="300" />
                    </span>
                  </a>
                </div>
                <div className="col-9 pr-0">
                  <h2>
                    <Link to={{
                      pathname: '/admin/company',
                      query: {
                        cid: `${item._id}`,
                      },
                    }}
                    >
                      {' '}
                      {item.cceo}
                      {' '}
                    </Link>
                  </h2>
                  <h4>
                    <Link to={{
                      pathname: '/admin/company',
                      query: {
                        cid: `${item._id}`,
                      },
                    }}
                    >
                      {' '}
                      {item.cname}
                      {' '}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <>
        <div>
          <button id="adminButton" onClick={this.getNumReviews}>
            <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
              <g fill="none" fillRule="evenodd">
                <path fill="#DFF7E7" d="M10 29h4.465a1 1 0 01.832.445l1.11 1.664A2 2 0 0018.07 32h11.86a2 2 0 001.664-.89l1.11-1.665a1 1 0 01.831-.445H38v7H10v-7z" />
                <path fill="#0CAA41" d="M11 32v3a1 1 0 001 1h24a1 1 0 001-1v-3a1 1 0 012 0v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4a1 1 0 012 0zm5-18v-2a2 2 0 012-2h12a2 2 0 012 2v2h7a2 2 0 012 2v11a2 2 0 01-2 2h-5.465a1 1 0 00-.832.445l-1.11 1.664A2 2 0 0129.93 32H18.07a2 2 0 01-1.664-.89l-1.11-1.665a1 1 0 00-.831-.445H9a2 2 0 01-2-2V16a2 2 0 012-2h7zm2 0h12v-1a1 1 0 00-1-1H19a1 1 0 00-1 1v1zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h5.465a1 1 0 01.832.445l1.406 2.11a1 1 0 00.832.445h10.93a1 1 0 00.832-.445l1.406-2.11a1 1 0 01.832-.445H38a1 1 0 001-1v-9a1 1 0 00-1-1H10zm11 10h6a1 1 0 010 2h-6a1 1 0 010-2z" />
              </g>
            </svg>
            <h3 className="studentTabTitle">Reviews Added Today</h3>
          </button>

          <button id="adminButton" onClick={this.topReviewedCompanies}>
            <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
              <g fill="none" fillRule="evenodd">
                <path fill="#0CAA41" fillRule="nonzero" d="M19.182 10h19.636c1.205 0 2.182.895 2.182 2v27H17V12c0-1.105.977-2 2.182-2zM39 37V13a1 1 0 00-1-1H20a1 1 0 00-1 1v24h20z" />
                <path fill="#DFF7E7" fillRule="nonzero" d="M22 14h14a1 1 0 011 1v20h-4v-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v3h-4V15a1 1 0 011-1z" />
                <path fill="#0CAA41" fillRule="nonzero" d="M16 19v2h-6a1 1 0 00-1 1v15h7v2H7V21c0-1.105.728-2 1.625-2H16z" />
                <rect width="4" height="4" x="23" y="16" fill="#0CAA41" rx="2" />
                <rect width="4" height="4" x="23" y="21" fill="#0CAA41" rx="2" />
                <rect width="4" height="4" x="31" y="16" fill="#0CAA41" rx="2" />
                <rect width="4" height="4" x="31" y="21" fill="#0CAA41" rx="2" />
                <path fill="#0CAA41" stroke="#0CAA41" strokeWidth="2" d="M27 38h4v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6z" />
              </g>
            </svg>
            <h3 className="studentTabTitle">Most Reviewed Companies</h3>
          </button>
          <button id="adminButton" onClick={this.topRatedCompanies}>
            <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
              <g fill="none" fillRule="evenodd">
                <path fill="#0CAA41" d="M12 36h24a2 2 0 01-2 2H14a2 2 0 01-2-2zm-2-4h28a2 2 0 01-2 2H12a2 2 0 01-2-2zM9 10h30a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V12a2 2 0 012-2zm5 2a5 5 0 01-5 5v6a5 5 0 015 5h20a5 5 0 015-5v-6a5 5 0 01-5-5H14zm10 12a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z" />
                <path fill="#DFF7E7" d="M15.71 14h16.58A7.015 7.015 0 0037 18.71v2.58A7.015 7.015 0 0032.29 26H15.71A7.015 7.015 0 0011 21.29v-2.58A7.015 7.015 0 0015.71 14zM24 24a4 4 0 100-8 4 4 0 000 8z" />
              </g>
            </svg>
            <h3 className="studentTabTitle">Top Rated Companies</h3>
          </button>
          <button id="adminButton" onClick={this.topStudents}>
            <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
              <g fill="none" fillRule="evenodd">
                <path fill="#0CAA41" fillRule="nonzero" d="M10 22c0 .295.011.588.033.879C8.755 24.165 8 25.779 8 27.5c0 2.192 1.218 4.267 3.35 5.704l.741.5.122.885c.053.386.089.772.107 1.158.398-.226.765-.457 1.1-.693l.717-.505.859.186c.808.175 1.648.265 2.504.265.853 0 1.676-.089 2.458-.254 1.076.404 2.214.719 3.398.932C21.64 36.518 19.639 37 17.5 37c-1.012 0-1.993-.108-2.928-.31-1.206.849-2.73 1.62-4.572 2.31.345-1.38.422-2.758.232-4.137C7.649 33.12 6 30.469 6 27.5c0-2.934 1.61-5.557 4.14-7.3-.093.59-.14 1.19-.14 1.8z" />
                <path fill="#FFF" stroke="#0CAA41" strokeWidth="2" d="M32.714 37.39a11.828 11.828 0 01.309-3.935l.124-.5.479-.19C38.73 30.748 42 26.586 42 22c0-6.576-6.675-12-15-12s-15 5.424-15 12 6.675 12 14.991 12l.327-.003.667-.016.309.364c.946 1.115 2.418 2.134 4.42 3.044z" />
                <ellipse cx="27" cy="22" fill="#DFF7E7" rx="12" ry="9" />
                <circle cx="21" cy="22" r="2" fill="#0CAA41" />
                <circle cx="27" cy="22" r="2" fill="#0CAA41" />
                <circle cx="33" cy="22" r="2" fill="#0CAA41" />
              </g>
            </svg>
            <h3 className="studentTabTitle">Top Students</h3>
          </button>
          <button id="adminButton" onClick={this.topCEOs}>
            <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
              <g fill="none" fillRule="evenodd">
                <path fill="#0CAA41" d="M12 36h24a2 2 0 01-2 2H14a2 2 0 01-2-2zm-2-4h28a2 2 0 01-2 2H12a2 2 0 01-2-2zM9 10h30a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V12a2 2 0 012-2zm5 2a5 5 0 01-5 5v6a5 5 0 015 5h20a5 5 0 015-5v-6a5 5 0 01-5-5H14zm10 12a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z" />
                <path fill="#DFF7E7" d="M15.71 14h16.58A7.015 7.015 0 0037 18.71v2.58A7.015 7.015 0 0032.29 26H15.71A7.015 7.015 0 0011 21.29v-2.58A7.015 7.015 0 0015.71 14zM24 24a4 4 0 100-8 4 4 0 000 8z" />
              </g>
            </svg>
            <h3 className="studentTabTitle">Top CEOs</h3>
          </button>
          <button id="adminButton" onClick={this.topViewedCompanies}>
            <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
              <g fill="none" fillRule="evenodd">
                <path fill="#0CAA41" fillRule="nonzero" d="M10 22c0 .295.011.588.033.879C8.755 24.165 8 25.779 8 27.5c0 2.192 1.218 4.267 3.35 5.704l.741.5.122.885c.053.386.089.772.107 1.158.398-.226.765-.457 1.1-.693l.717-.505.859.186c.808.175 1.648.265 2.504.265.853 0 1.676-.089 2.458-.254 1.076.404 2.214.719 3.398.932C21.64 36.518 19.639 37 17.5 37c-1.012 0-1.993-.108-2.928-.31-1.206.849-2.73 1.62-4.572 2.31.345-1.38.422-2.758.232-4.137C7.649 33.12 6 30.469 6 27.5c0-2.934 1.61-5.557 4.14-7.3-.093.59-.14 1.19-.14 1.8z" />
                <path fill="#FFF" stroke="#0CAA41" strokeWidth="2" d="M32.714 37.39a11.828 11.828 0 01.309-3.935l.124-.5.479-.19C38.73 30.748 42 26.586 42 22c0-6.576-6.675-12-15-12s-15 5.424-15 12 6.675 12 14.991 12l.327-.003.667-.016.309.364c.946 1.115 2.418 2.134 4.42 3.044z" />
                <ellipse cx="27" cy="22" fill="#DFF7E7" rx="12" ry="9" />
                <circle cx="21" cy="22" r="2" fill="#0CAA41" />
                <circle cx="27" cy="22" r="2" fill="#0CAA41" />
                <circle cx="33" cy="22" r="2" fill="#0CAA41" />
              </g>
            </svg>
            <h3 className="studentTabTitle">Top Viewed Companies</h3>
          </button>
          <div style={{ display: 'flex', justifyContent: 'center' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <div className="flex-aside">
              <article>
                <div className="companySearchHierarchies gdGrid">
                  <header className="px-lg-0 px">
                    <div className="pb-lg-xxl pb-std">
                      <strong>{this.state.display}</strong>
                    </div>
                  </header>
                  <div>
                    {displayElement}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminTabs;
