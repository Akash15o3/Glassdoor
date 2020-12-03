import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { getCid, getCName } from '../../../Actions/studentActions';
import Pagination from '../../Pagination';

class CompanySearchResults extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 10;
    this.state = {
      companies: [],
      loading: true,
      pageIndex: 0,
      numPages: 0,
      numCompanies: 0
    };
  }

  componentDidMount() {
    const { searchQuery } = this.props;
    const cname = searchQuery;
    const Promises = [];
    let url = `${process.env.REACT_APP_BACKEND}/search/companies`;
    Promises.push(axios.post(url, { cname })
      .then((response) => {
        if (response.data) {
          this.setState({
            companies: response.data
          });
        }
      }));
    url = `${process.env.REACT_APP_BACKEND}/search/companies/numPages`;
    Promises.push(axios.post(url, { cname })
      .then((response) => {
        if (response.data) {
          const { numCompanies } = response.data;
          this.setState({
            numCompanies, numPages: Math.ceil(numCompanies / this.itemsPerPage)
          });
        }
      }));
    Promise.all(Promises).then(() => this.setState({ loading: false }));
  }

  handleClick = (e) => {
    this.props.getCid(e.target.id);
    this.props.getCName(e.target.getAttribute('name'));
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
    const url = `${process.env.REACT_APP_BACKEND}/search/companies`;
    axios.post(url, { cname: this.props.searchQuery, skip: pageIndex })
      .then((response) => {
        if (response.data) {
          this.setState({
            companies: response.data, pageIndex, loading: false
          });
        }
      });
  }

  render() {
    const { companies, loading, pageIndex, numCompanies, numPages } = this.state;
    const { itemsPerPage } = this;
    const { credentials } = this.props;
    let numItems = 0;
    if (numCompanies > 0) numItems = numPages === pageIndex + 1 && numCompanies % itemsPerPage !== 0 ? numCompanies % itemsPerPage : itemsPerPage;
    const contents = companies.map((item) => (
      <div className="single-company-result module ">
        <div className="row justify-content-between">
          <div className="col-lg-7">
            <div className="row justify-content-start">
              <div className="col-3 logo-and-ratings-wrap"><a href="/Overview/Working-at-McDonald-s-EI_IE432.11,21.htm"><span><img src="https://media.glassdoor.com/sqls/432/mcdonald-s-squarelogo-1585239308674.png" /></span></a></div>
              <div className="col-9 pr-0">
                <h2>
                  <Link id={item._id} name={item.cname} onClick={this.handleClick} to={`/${credentials.role}/company`}>
                    {' '}
                    {item.cname}
                    {' '}
                  </Link>
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
                  <span className="num h2">
                    {' '}
                    { item.salaryCount }
                  </span>
                  <span className="subtle"> Salaries</span>
                </a>
              </div>
              <div className="ei-contribution-wrap col-4 pl-0">
                <a className="eiCell cell interviews d-inline-block py-sm" href="/Interview/McDonald-s-San-Francisco-Interview-Questions-EI_IE432.0,10_IL.11,24_IM759.htm">
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
    return loading ? <div className="loader"><BeatLoader color="green" /></div> : (
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
                    <strong>{(itemsPerPage * pageIndex) + 1}</strong>
                    –
                    <strong>{(itemsPerPage * pageIndex) + numItems}</strong>
                    {' '}
                    of
                    {' '}
                    <strong>{numCompanies}</strong>
                    {' '}
                    Companies
                  </div>
                </header>
                <div>
                  {contents}
                </div>
                <Pagination setPage={this.setPage} page={pageIndex} numPages={numPages} />
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
    credentials: state.credentials,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    getCid: (cid) => dispatch(getCid(cid)),
    getCName: (cname) => dispatch(getCName(cname))
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(CompanySearchResults);
