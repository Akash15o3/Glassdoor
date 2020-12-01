import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import CompanyOverview from './CompanyOverview';
import CompanyReviews from './CompanyReviews';
import CompanyJobs from './CompanyJobs';
import CompanySalaries from './CompanySalaries';
import CompanyInterviews from './CompanyInterviews';
import CompanyPhotos from './CompanyPhotos';

Modal.setAppElement('#root');
class CompanyHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      cphotos: [],
      tab: 'Overview',
    };
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/companies/specificCompany`;
    const { cid } = this.props;
    // let cid;
    axios.post(url, { cid })
      .then((response) => {
        if (response.data) {
          const company = response.data;
          this.setState({ company, cphotos: company.cphotos });
        }
      });
  }

  tabChangeHandler = (e) => {
    this.setState({
      tab: e.currentTarget.getAttribute('data-label')
    });
  }

  updatePhotos = (cphotos) => {
    this.setState({ cphotos });
  }

  updateSalaries = (salaries) => {
    this.setState({ salaries });
  }

  updateInterviews = (interviews) => {
    this.setState({ interviews });
  }

  updateReviews = (reviews) => {
    this.setState({ reviews });
  }

  render() {
    const { company, tab, cphotos } = this.state;
    console.log(tab);
    let companyContent = null;
    switch (tab) {
      case 'Overview':
        companyContent = <CompanyOverview company={company} />;
        break;
      case 'Reviews':
        companyContent = <CompanyReviews cname={company.cname} cid={company._id} updateReviews={this.updateReviews} stname={this.props.name} stid={this.props.id} />;
        break;
      case 'Jobs':
        companyContent = <CompanyJobs cname={company.cname} isAuth={this.props.isAuth} />;
        break;
      case 'Salaries':
        companyContent = <CompanySalaries stid={this.props.id} cname={company.cname} cid={company._id} isAuth={this.props.isAuth} />;
        break;
      case 'Interview':
        companyContent = <CompanyInterviews stid={this.props.id} cname={company.cname} isAuth={this.props.isAuth} />;
        break;
      case 'Photos':
        companyContent = <CompanyPhotos cphotos={cphotos} stid={this.props.id} stname={this.props.name} cid={company._id} cname={company.cname} isAuth={this.props.isAuth} />;
        break;
      default:
        console.log('D');
        companyContent = null;
    }
    return (
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
              <div className="logo cell"><a href="/Overview/Working-at-McDonald-s-EI_IE432.11,21.htm" data-ajax="true" className="sqLogoLink"><span className="sqLogo tighten lgSqLogo logoOverlay" style={{ position: 'relative', top: '58px', right: '17px' }}><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" className alt=" Logo" title /></span></a></div>
              <div className="header cell info">
                <h1 className=" strong tightAll" title data-company="McDonald's">
                  <span id="DivisionsDropdownComponent" className="d-inline-flex align-items-center">
                    <p>{ company.cname }</p>
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
                      <a className="eiCell cell reviews " onClick={this.tabChangeHandler} data-label="Overview">
                        <span className="subtle"> Overview</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell reviews " onClick={this.tabChangeHandler} data-label="Reviews">
                        <span className="num h2"> 43k</span>
                        <span className="subtle"> Reviews</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell jobs " onClick={this.tabChangeHandler} data-label="Jobs">
                        <span className="num h2"> 56k</span>
                        <span className="subtle"> Jobs</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell salaries " onClick={this.tabChangeHandler} data-label="Salaries">
                        <span className="num h2"> 40k</span>
                        <span className="subtle"> Salaries</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell interviews " onClick={this.tabChangeHandler} data-label="Interview">
                        <span className="num h2"> 7.3k</span>
                        <span className="subtle"> Inter­views</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell photos " onClick={this.tabChangeHandler} data-label="Photos">
                        <span className="num h2"> 291</span>
                        <span className="subtle"> Photos</span>
                      </a>
                    </div>
                  </div>
                  <div className="buttons cell showDesk padRt alignRt">
                    <div id="EIHeaderFollowButton" style={{ display: 'inline-block', marginRight: '12px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {companyContent}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cname: state.student.cname,
    cid: state.student.cid,
    id: state.student.id,
    name: state.credentials.isAuth ? state.student.user.stname : '',
    isAuth: state.credentials.isAuth
  };
};

export default connect(mapStateToProps)(CompanyHomePage);
