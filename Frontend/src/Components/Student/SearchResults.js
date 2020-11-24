import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
  }

  componentDidMount() {
    const { searchQuery } = this.props;
    const cname = searchQuery;
    const url = `${process.env.REACT_APP_BACKEND}/search/companies`;

    axios.post(url, { cname })
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
    const contents = companies.map((item) => (
      <div className="single-company-result module ">
        <div className="row justify-content-between">
          <div className="col-lg-7">
            <div className="row justify-content-start">
              <div className="col-3 logo-and-ratings-wrap"><a href="/Overview/Working-at-McDonald-s-EI_IE432.11,21.htm"><span><img src="https://media.glassdoor.com/sqls/432/mcdonald-s-squarelogo-1585239308674.png" /></span></a></div>
              <div className="col-9 pr-0">
                <h2>
                  <a href="/Overview/Working-at-McDonald-s-EI_IE432.11,21.htm">
                    {' '}
                    {item.cname}
                    {' '}
                  </a>
                  <div>
                    <span>
                      <span className="bigRating strong margRtSm h2">3.5</span>
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
                  <p className="webInfo mb-0 mt-xxsm"><span><a href="www.mcdonalds.com">{ item.cwebsite }</a></span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 ei-contributions-count-wrap mt-std">
            <div className="row justify-content-between">
              <div className="ei-contribution-wrap col-4 pl-lg-0 pr-0">
                <a className="eiCell cell reviews d-inline-block py-sm" href="/Reviews/McDonald-s-San-Francisco-Reviews-EI_IE432.0,10_IL.11,24_IM759.htm">
                  <span className="num h2">
                    {' '}
                    { item.reviewCount }
                  </span>
                  <span className="subtle"> Reviews</span>
                </a>
              </div>
              <div className="ei-contribution-wrap col-4 p-0">
                <a className="eiCell cell salaries d-inline-block py-sm" href="/Salary/McDonald-s-San-Francisco-Salaries-EI_IE432.0,10_IL.11,24_IM759.htm">
                  <span className="num h2"> { item.salaryCount }</span>
                  <span className="subtle"> Salaries</span>
                </a>
              </div>
              <div className="ei-contribution-wrap col-4 pl-0">
                <a className="eiCell cell interviews d-inline-block py-sm" href="/Interview/McDonald-s-San-Francisco-Interview-Questions-EI_IE432.0,10_IL.11,24_IM759.htm">
                  <span className="num h2"> { item.interviewCount }</span>
                  <span className="subtle"> Inter­views</span>
                </a>
              </div>
              <div className="col-12 mt">
                <div className="row justify-content-center justify-content-lg-end">
                  <div className="col-11 col-lg-auto cta-wrap">
                    <a href="/mz-survey/employer/collectReview_input.htm?c=PAGE_SRCH_COMPANIES&amp;i=432" className="gd-btn gd-btn-link gradient gd-btn-1 gd-btn-med gd-btn-icon pr-md">
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
      </div>
    ));
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <div className="flex-aside">
            <article>
              <div className="companySearchHierarchies gdGrid">
                <header className="px-lg-0 px">
                  <h1 className="pt-lg-std py-sm m-0">
                    {' '}
                    Showing results for
                    {' '}
                    <strong>{this.props.searchQuery}</strong>
                  </h1>
                  <div className="pb-lg-xxl pb-std">
                    {' '}
                    Showing
                    {' '}
                    <strong>1</strong>
                    –
                    <strong>10</strong>
                    {' '}
                    of
                    {' '}
                    <strong>53</strong>
                    {' '}
                    Companies
                  </div>
                </header>
                <div>
                  {contents}
                </div>
                <div className="module pt-xxsm">
                  <div className="breadcrumbList margTop minor">
                    <div className="breadcrumb ib " itemScope="" itemType="http://data-vocabulary.org/Breadcrumb">
                      <a itemProp="url" href="/Reviews/index.htm" data-ga-lbl="">
                        <span itemProp="title">Reviews</span>
                        {' '}
&nbsp;&gt;&nbsp;
                        {' '}
                      </a>
                    </div>
                    <div className="breadcrumb ib " itemProp="child" itemScope="" itemType="http://data-vocabulary.org/Breadcrumb">
                      <a itemProp="url" href="/Explore/top-companies-san-francisco_IL.14,27_IM759.htm" data-ga-lbl="">
                        <span itemProp="title">San Francisco</span>
                        {' '}
&nbsp;&gt;&nbsp;
                        {' '}
                      </a>
                    </div>
                    <div className="breadcrumb ib " itemProp="child" itemScope="" itemType="http://data-vocabulary.org/Breadcrumb"><a itemProp="url" href="/Reviews/san-francisco-mcdonalds-reviews-SRCH_IL.0,13_IM759_KE14,23.htm" data-ga-lbl=""><span itemProp="title">mcdonalds</span></a></div>
                  </div>
                  <div id="FooterPageNav" className="pageNavBar tbl fill noMargBot">
                    <div className="pagingControls cell middle">
                      <ul>
                        <li className="prev"><span className="disabled"><i><span>Previous</span></i></span></li>
                        <li className="page current "><span className="disabled">1</span></li>
                        <li className="page "><a href="/Reviews/san-francisco-mcdonalds-reviews-SRCH_IL.0,13_IM759_KE14,23_IP2.htm">2</a></li>
                        <li className="page "><a href="/Reviews/san-francisco-mcdonalds-reviews-SRCH_IL.0,13_IM759_KE14,23_IP3.htm">3</a></li>
                        <li className="page "><a href="/Reviews/san-francisco-mcdonalds-reviews-SRCH_IL.0,13_IM759_KE14,23_IP4.htm">4</a></li>
                        <li className="page last"><a href="/Reviews/san-francisco-mcdonalds-reviews-SRCH_IL.0,13_IM759_KE14,23_IP5.htm">5</a></li>
                        <li className="next"><a href="/Reviews/san-francisco-mcdonalds-reviews-SRCH_IL.0,13_IM759_KE14,23_IP2.htm"><i><span>Next</span></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <aside id="ZCol" className="zCol" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchQuery: state.student.searchQuery,
  };
};

export default connect(mapStateToProps)(SearchResults);
