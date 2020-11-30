import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CompanyOverview from './AdminCompanyOverview';
import AdminReviews from './AdminReviews';
//Mirror companyhomepage

class AdminCompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      tab: 'Overview'
    };
  }

  componentDidMount() {

    console.log('AdminCompanyPage location query: ', this.props.location.query);

    const url = `${process.env.REACT_APP_BACKEND}/companies/${this.props.location.query.cid}`;

    axios.get(url)
      .then((response) => {
        if (response.status === 200) {

          console.log('response.data: ', response.data)
          this.setState({
            company: response.data,
          });
          const { company } = this.state;
          console.log(company);
        }
      });
  }

  tabChangeHandler = (e) => {
    this.setState({
      tab: e.currentTarget.getAttribute('data-label')
    });
  }

  render() {
    const { company, tab } = this.state;
    console.log('company page state: ', this.state);
    console.log('company page: ', company);
    let companyContent = null;
    
    switch (tab) {
      case 'Overview':
        console.log('O');
        companyContent = <CompanyOverview company={company} />;
        break;
      case 'Reviews':
        companyContent = <AdminReviews company={company} />;
        break;
        /*
      case 'Photos':
        console.log('P');
        companyContent = <CompanyPhotos company={company} stid={this.props.id} stname={this.props.name} />;
        break;
        */
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
 
                        <span className="subtle"> Reviews</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell jobs " onClick={this.tabChangeHandler} data-label="Jobs">

                        <span className="subtle"> Photos</span>
                      </a>
                      <div className="vline cell"><i /></div>
                      <a className="eiCell cell salaries " onClick={this.tabChangeHandler} data-label="Salaries">
                        <span className="subtle"> Job Statistics</span>
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
        </div>
        {companyContent}
      </div>
    );
  }
}

export default AdminCompanyPage;

