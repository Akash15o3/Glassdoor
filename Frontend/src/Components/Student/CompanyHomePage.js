import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class CompanyHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/companies/specificCompany`;
    const { cname } = this.props;
    const { clocation } = this.props;

    axios.post(url, { cname, clocation })
      .then((response) => {
        if (response.data) {
          this.setState({
            companies: response.data,
          });
          const { companies } = this.state;
          console.log(companies);
        }
      });
  }

  render() {
    const { companies } = this.state;
    return (
      <div>
        <div>
          <div id="EIHdrModule" className="snug module noblur eep sticky" style={{ width: '992px', top: '1px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div id="EmpHeroAndEmpInfo" className="gdGrid" data-brandviews="MODULE:n=hub-profileImage:eid=432">
              <div id="HeroLbFrame-432" className="hidden">
                <div className="lbSlideFrame">
                  <div className="titleBar">
                    <span className="viewAll">
                      <a href="/Photos/McDonald-s-Office-Photos-E432.htm">
                        <i />
                        <span>View All</span>
                      </a>
                    </span>
                    <span className="counter">
                      <span className="current">num</span>
                      {' '}
                      of
                      {' '}
                      <span className="total">num</span>
                    </span>
                    <span className="close"><button type="button" title="Close (Esc)"><span className="offScreen">Close (Esc)</span></button></span>
                  </div>
                  <div className="slides" />
                </div>
              </div>
              <div className="empInfo tbl hideHH ">
                <div className="logo cell"><a href="/Overview/Working-at-McDonald-s-EI_IE432.11,21.htm" data-ajax="true" className="sqLogoLink"><span className="sqLogo tighten lgSqLogo logoOverlay" style={{ position: 'relative', top: '20px' }}><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" className alt=" Logo" title /></span></a></div>
                <div className="header cell info">
                  <h1 className=" strong tightAll" title data-company="McDonald's">
                    <span id="DivisionsDropdownComponent" className="d-inline-flex align-items-center">
                      <p>{ companies.cname }</p>
                    </span>
                  </h1>
                </div>
                <div className="cell unlock small showDesk" />
              </div>
            </div>
            <div id="StickyNavWrapper" className="stickyNavWrapper ">
              <div id="SmarterNavContainer" className="initialStick">
                <div id="SmarterBannerContainer" />
                <div id="EmpLinksWrapper" className="empLinksWrapper  sticky">
                  <div className="empLinks tbl ">
                    <div id="EIProductHeaders" className="tbl eiProductCells">
                      <div className="row ">
                        <span className="eiCell cell overviews switchLogo active" data-selector="orgStructureOverviewDropdown">
                          <div id="HierarchiesDropdown">
                            <div className="hierarchiesDropdownInnerContent">
                              <a href="/Overview/Working-at-McDonald-s-EI_IE432.11,21.htm" className=" active pad" data-selector="orgStructureCompanyOverviewOption"> Company Overview</a>
                              <a href="/Affiliated/McDonald-s-Companies-E432.htm" className=" pad" data-selector="orgStructureOrgStructureOption"> Organization Structure</a>
                              <a href="/Location/All-McDonald-s-Office-Locations-E432.htm" className=" pad"> Locations</a>
                              <a href="/FAQ/McDonald-s-Questions-E432.htm" className=" pad"> FAQ</a>
                            </div>
                          </div>
                          <span className="num h2"><i className="icon-bullseye-select"><span>Overview</span></i></span>
                          <span className="subtle">
                            Overview
                            <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.001 6.446l4.503 5.003a.667.667 0 0 0 .991 0l4.503-5.003" stroke="#69717A" strokeWidth={2} fill="none" fillRule="evenodd" strokeLinecap="round" />
                            </svg>
                          </span>
                        </span>
                        <div className="vline cell"><i /></div>
                        <a className="eiCell cell reviews " href="/Reviews/McDonald-s-Reviews-E432.htm" data-label="Reviews">
                          <span className="num h2"> 43k</span>
                          <span className="subtle"> Reviews</span>
                        </a>
                        <div className="vline cell"><i /></div>
                        <a className="eiCell cell jobs " href="/Jobs/McDonald-s-Jobs-E432.htm" data-label="Jobs">
                          <span className="num h2"> 56k</span>
                          <span className="subtle"> Jobs</span>
                        </a>
                        <div className="vline cell"><i /></div>
                        <a className="eiCell cell salaries " href="/Salary/McDonald-s-Salaries-E432.htm" data-label="Salaries">
                          <span className="num h2"> 40k</span>
                          <span className="subtle"> Salaries</span>
                        </a>
                        <div className="vline cell"><i /></div>
                        <a className="eiCell cell interviews " href="/Interview/McDonald-s-Interview-Questions-E432.htm" data-label="Inter­views">
                          <span className="num h2"> 7.3k</span>
                          <span className="subtle"> Inter­views</span>
                        </a>
                        <div className="vline cell"><i /></div>
                        <div className="vline cell"><i /></div>
                        <a className="eiCell cell photos " href="/Photos/McDonald-s-Office-Photos-E432.htm" data-label="Photos">
                          <span className="num h2"> 291</span>
                          <span className="subtle"> Photos</span>
                        </a>
                      </div>
                    </div>
                    <div className="buttons cell showDesk padRt alignRt">
                      <div id="EIHeaderFollowButton" style={{ display: 'inline-block', marginRight: '12px' }} />
                      <a href="/mz-survey/employer/collectReview_input.htm?i=432&j=true&y=&c=PAGE_INFOSITE_TOP" className="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med gd-btn-icon padHorz addReview">
                        <i className="btn-plus margRtSm" />
                        <span>Add a Review</span>
                        <i className="hlpr" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons tbl fill hideDesk center">
              <a href="/Jobs/McDonald-s-Jobs-E432.htm" className="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med gd-btn-mkt stickyNavViewJobsBtn">
                <span>View Jobs at McDonald's</span>
                <i className="hlpr" />
              </a>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
            <h2 style={{ marginLeft: '45px' }}>McDonald's Overview</h2>
            <ul style={{ listStyleType: 'none' }}>
              <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-xxsm">
                <b><label className="css-1f0lhlt ecl3kjh0">Website:</label></b>
                <div><a href="//www.mcdonalds.com" target="_blank" rel="noopener noreferrer" className="css-1hg9omi">www.mcdonalds.com</a></div>
              </li>
              <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                <b><label>Headquarters:</label></b>
                <div>North York, Canada</div>
              </li>
              <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                <b><label>Size:</label></b>
                <div>10000+ Employees</div>
              </li>
              <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
                <b><label>Founded:</label></b>
                <div>1955</div>
              </li>
              <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                <b><label className="css-1f0lhlt ecl3kjh0">Type:</label></b>
                <div>Company - Public</div>
              </li>
              <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
                <b><label>Revenue:</label></b>
                <div>$10+ billion (USD)</div>
              </li>
            </ul>
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
              <span>
                In 1955, an enterprising salesman named Ray Kroc discovered a small burger restaurant in California, and wrote the first page of McDonald’s® history. In 1967, the first McDonald’s Canada opened in Richmond, B.C. We’ve been growing with our communities and serving quality food at great value ever since. Today, McDonald’s Canada is proud to be one of the world’s leading foodservice retailers. From coast to coast, we serve delicious choices to more than 2.5 million people in over 1,400 locations every day. We’re also more than just your local restaurant. We’re hardworking small-business men and women, students working part-time, seniors getting the most out of life, and volunteers lending time to make a difference in the communities we live and work in.
                <br />
                <br />
                <br />
              </span>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
            <h2 style={{ marginLeft: '45px' }} className="title css-1bqzjlu">McDonald's Reviews</h2>
            <div style={{ textAlign: 'center', fontSize: '22px' }}>
              <span style={{ color: 'green' }}>2.5</span>
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star-half-o" />
              <span className="fa fa-star" />
              <span className="fa fa-star" />
            </div>
            <div className="single-chart" style={{ float: 'left' }}>
              <svg viewBox="0 0 36 36" className="circular-chart green">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="60, 100"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>60%</text>
              </svg>
              <div style={{ marginLeft: '30px' }}>Recommend to a Friend</div>
            </div>
            <div className="single-chart" style={{ float: 'left', marginLeft: '150px', marginBottom: '20px' }}>
              <svg viewBox="0 0 36 36" className="circular-chart green">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="60, 100"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>60%</text>
              </svg>
              <div style={{ marginLeft: '60px' }}>Approve of CEO</div>
            </div>
            <hr style={{ width: '3000px', backgroundColor: 'black' }} />
            <div>
              <div style={{ marginLeft: '20px' }}><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" /></span></div>
              <div>
                <div style={{ marginLeft: '20px' }}>
                  <h2><a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">"Customer service"</a></h2>
                  <div>
                    <div>
                      <div>
                        <div>
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star checked" />
                          <span className="fa fa-star-half-o" />
                          <span className="fa fa-star" />
                          <span className="fa fa-star" />
                        </div>
                        <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
                          <div className="tooltipContainer">
                            <span className="pointer" />
                            <div className="content">
                              <ul className="pl-0" />
                            </div>
                          </div>
                        </aside>
                      </div>
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">Bill Jones - Customer</span>
                    </div>
                  </div>
                  <p>I worked at McDonald's full-time it was terrible and i hated it alot it was rlly bad.</p>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
              <div>
                <div style={{ marginLeft: '20px' }}><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" /></span></div>
                <div>
                  <div style={{ marginLeft: '20px' }}>
                    <h2><a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">"Customer service"</a></h2>
                    <div>
                      <div>
                        <div>
                          <div>
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star-half-o" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                          </div>
                          <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
                            <div className="tooltipContainer">
                              <span className="pointer" />
                              <div className="content">
                                <ul className="pl-0" />
                              </div>
                            </div>
                          </aside>
                        </div>
                        <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">Bill Jones - Customer</span>
                      </div>
                    </div>
                    <p>I worked at McDonald's full-time it was terrible and i hated it alot it was rlly bad.</p>
                  </div>
                  <hr style={{ width: '3000px', backgroundColor: 'black' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cname: state.student.cname,
    clocation: state.student.clocation,
  };
};

export default connect(mapStateToProps)(CompanyHomePage);
