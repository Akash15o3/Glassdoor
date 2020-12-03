import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../Pagination';

export default class CompanyOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallRate: Number,
      recommendedRating: Number,
      ceoRating: Number,
      topReviews: [],
      cFeatured: [],
      showAddReview: false,
      overallRating: 1,
      rheadline: '',
      rdescription: '',
      rpros: '',
      rcons: '',
      radvice: '',
      rrecommended: 'Yes',
      routlook: 'Positive',
      rceoapprove: 'Yes',
      reviews: [],
      loading: true
    };
  }

  componentDidMount() {
    const Promises = [];
    if (this.props.reviews !== null) {
      const { reviews } = this.props;
      if (reviews.length > 0) { this.setPercentages(reviews); }
      this.setState({ reviews, numPages: Math.ceil(reviews.length / this.itemsPerPage) });
    } else {
      const { cid } = this.props;
      const url = `${process.env.REACT_APP_BACKEND}/reviews/cid`;
      Promises.push(axios.post(url, { cid })
        .then((response) => {
          if (response.data) {
            const reviews = response.data;
            this.setPercentages(reviews);
            this.setState({
              reviews,
              numPages: Math.ceil(reviews.length / this.itemsPerPage)
            });
            this.props.updateReviews(reviews);
          }
        }));
    }
    this.props.company.cfeatured.forEach((data) => Promises.push(axios.get(
      `${process.env.REACT_APP_BACKEND}/reviews/getFeatReviews?rid=${data}`
    )
      .then((results) => {
        const { cFeatured } = this.state;
        this.setState({ cFeatured: [...cFeatured, results.data] });
      })));
    Promise.all(Promises).then(() => this.setState({ loading: false }));
  }

  setPercentages = (reviews) => {
    let average = 0;
    let recommended = 0;
    let approve = 0;
    const arr = [];
    console.log(reviews);
    for (let i = 0; i < reviews.length; i++) {
      average += reviews[i].overallRating;
      if (reviews[i].rrecommended === 'Yes') {
        recommended++;
      }
      if (reviews[i].rceoapprove === 'Yes') {
        approve++;
      }
    }
    recommended /= reviews.length;
    recommended *= 100;
    recommended = Math.round(recommended);
    average /= reviews.length;
    average = average.toFixed(1);
    approve /= reviews.length;
    approve *= 100;
    approve = Math.round(approve);
    reviews.sort((a, b) => b.rhelpful - a.rhelpful);
    for (let i = 0; i < reviews.length; i++) {
      arr.push(reviews[i]);
      if (i > 1) { break; }
    }
    console.log(arr);
    this.setState({
      overallRate: average,
      recommendedRating: recommended,
      ceoRating: approve,
      topReviews: arr
    });
  }

  render() {
    const { company } = this.props;
    const { overallRate, recommendedRating, ceoRating, topReviews, loading, cFeatured } = this.state;
    const { cname, cphoto } = this.props;
    return loading ? <div className="loader cTab"><BeatLoader color="green" /></div> : (
      <div id="companyHomeContent">
        <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
          <h2 style={{ marginLeft: '45px' }}>
            { `${company.cname} `}
            Overview
          </h2>
          <ul style={{ listStyleType: 'none' }}>
            <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-xxsm">
              <b><label className="css-1f0lhlt ecl3kjh0">Website:</label></b>
              <div><a href="//www.mcdonalds.com" target="_blank" rel="noopener noreferrer" className="css-1hg9omi">{ company.cwebsite }</a></div>
            </li>
            <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
              <b><label>Headquarters:</label></b>
              <div>{ company.clocation }</div>
            </li>
            <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
              <b><label>Size:</label></b>
              <div>
                { company.csize }
                {' '}
                Employees
              </div>
            </li>
            <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
              <b><label>Founded:</label></b>
              <div>{ company.cfounded }</div>
            </li>
            <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
              <b><label className="css-1f0lhlt ecl3kjh0">Type:</label></b>
              <div>{ company.ctype }</div>
            </li>
            <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
              <b><label>Revenue:</label></b>
              <div>
                $
                {company.crevenue}
              </div>
            </li>
          </ul>
          <div>
            <h2 style={{ marginTop: '50px', position: 'relative', top: '50px', right: '160px' }}>Company Mission</h2>
            <span>
              {company.cmission}
              <br />
              <br />
              <br />
            </span>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
          <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }} className="title css-1bqzjlu">
            {`${cname} `}
            Reviews
          </h2>
          <div style={{ textAlign: 'center', fontSize: '22px', position: 'relative', top: '75px' }}>
            <span style={{ color: 'green' }}>{overallRate}</span>
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
                strokeDasharray={`${recommendedRating}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>
                {recommendedRating}
                %
              </text>
            </svg>
            <div>Recommend to a Friend</div>
          </div>
          <div className="single-chart" style={{ float: 'left', marginLeft: '220px', marginBottom: '20px' }}>
            <svg viewBox="0 0 36 36" className="circular-chart green">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${ceoRating}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>
                {ceoRating}
                %
              </text>
            </svg>
            <div>Approve of CEO</div>
          </div>
          <hr style={{ width: '3000px', backgroundColor: 'black' }} />
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Featured Reviews</h1>
          <ol className="empReviews tightLt">
            {cFeatured.map((review) => {
              const date = new Date(review.rdate);
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
              const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
              return [
                <li style={{ width: '100%', backgroundColor: '#FFFF66' }} className=" empReview cf reviewCard" id="InterviewReview_38660866">
                  <div className="cf">
                    <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
                    <p className="helpfulReviews small tightVert floatRt">{`${review.rhelpful} found helpful`}</p>
                  </div>
                  <div className="tbl fill reviewHdr">
                    <div className="row">
                      <div className="cell sqLogoCell showDesk"><span className="sqLogo tighten smSqLogo logoOverlay"><img src={cphoto} className="lazy lazy-loaded" data-retina-ok="true" alt=" Logo" title style={{ opacity: 1 }} /></span></div>
                      <div className="cell">
                        <h2 className="summary strong noMargTop tightTop margBotXs">{`"${review.rheadline}"`}</h2>
                        <div>
                          <span style={{ color: '#0caa41', marginRight: '5px' }}>{review.overallRating}</span>
                          {[...Array(5)].map((e, i) => {
                            return <span role="button" style={{ color: `${i < review.overallRating ? '#0caa41' : 'lightgray'}` }}>★</span>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tbl fill margTopMd">
                    <div className="row">
                      <div className="cell sqLogoCell showDesk" />
                      <div className="cell reviewBodyCell">
                        <div className="row reviewBodyCell recommends">
                          <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                            <i className={`sqLed middle sm mr-xsm ${review.rrecommended === 'Yes' ? 'green' : 'red'}`} />
                            <span>{`${review.rrecommended === 'Yes' ? 'Recommends' : 'Does Not Recommend'}`}</span>
                          </div>
                          <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                            <i className={`sqLed middle sm mr-xsm ${review.routlook === 'Positive' ? 'green' : 'red'}`} />
                            <span>{`${review.routlook} Outlook`}</span>
                          </div>
                          <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                            <i className={`sqLed middle sm mr-xsm ${review.rceoapprove === 'Yes' ? 'green' : 'red'}`} />
                            <span>{`${review.rceoapprove === 'Yes' ? 'Approves of CEO' : 'Does Not Approve of CEO'}`}</span>
                          </div>
                        </div>
                        <div style={{ marginTop: '40px' }} className="description ">
                          {review.rdescription}
                        </div>
                        <div style={{ marginTop: '30px' }} className="description ">
                          <h4 style={{ fontWeight: 'bold' }}>Pros</h4>
                          {review.rpros}
                        </div>
                        <div style={{ marginTop: '30px' }} className="description ">
                          <h4 style={{ fontWeight: 'bold' }}>Cons</h4>
                          {review.rcons}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>,
                <br />
              ];
            })}
          </ol>
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Top Reviews</h1>
          <ol className="empReviews tightLt">
            {topReviews.map((review) => {
              const date = new Date(review.rdate);
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
              const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
              return [
                <li style={{ width: '100%', backgroundColor: 'powderblue' }} className=" empReview cf reviewCard" id="InterviewReview_38660866">
                  <div className="cf">
                    <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
                    <p className="helpfulReviews small tightVert floatRt">{`${review.rhelpful} found helpful`}</p>
                  </div>
                  <div className="tbl fill reviewHdr">
                    <div className="row">
                      <div className="cell sqLogoCell showDesk"><span className="sqLogo tighten smSqLogo logoOverlay"><img src={cphoto} className="lazy lazy-loaded" data-retina-ok="true" alt=" Logo" title style={{ opacity: 1 }} /></span></div>
                      <div className="cell">
                        <h2 className="summary strong noMargTop tightTop margBotXs">{`"${review.rheadline}"`}</h2>
                        <div>
                          <span style={{ color: '#0caa41', marginRight: '5px' }}>{review.overallRating}</span>
                          {[...Array(5)].map((e, i) => {
                            return <span role="button" style={{ color: `${i < review.overallRating ? '#0caa41' : 'lightgray'}` }}>★</span>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tbl fill margTopMd">
                    <div className="row">
                      <div className="cell sqLogoCell showDesk" />
                      <div className="cell reviewBodyCell">
                        <div className="row reviewBodyCell recommends">
                          <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                            <i className={`sqLed middle sm mr-xsm ${review.rrecommended === 'Yes' ? 'green' : 'red'}`} />
                            <span>{`${review.rrecommended === 'Yes' ? 'Recommends' : 'Does Not Recommend'}`}</span>
                          </div>
                          <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                            <i className={`sqLed middle sm mr-xsm ${review.routlook === 'Positive' ? 'green' : 'red'}`} />
                            <span>{`${review.routlook} Outlook`}</span>
                          </div>
                          <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                            <i className={`sqLed middle sm mr-xsm ${review.rceoapprove === 'Yes' ? 'green' : 'red'}`} />
                            <span>{`${review.rceoapprove === 'Yes' ? 'Approves of CEO' : 'Does Not Approve of CEO'}`}</span>
                          </div>
                        </div>
                        <div style={{ marginTop: '40px' }} className="description ">
                          {review.rdescription}
                        </div>
                        <div style={{ marginTop: '30px' }} className="description ">
                          <h4 style={{ fontWeight: 'bold' }}>Pros</h4>
                          {review.rpros}
                        </div>
                        <div style={{ marginTop: '30px' }} className="description ">
                          <h4 style={{ fontWeight: 'bold' }}>Cons</h4>
                          {review.rcons}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>,
                <br />
              ];
            })}
          </ol>
        </div>
      </div>
    );
  }
}
