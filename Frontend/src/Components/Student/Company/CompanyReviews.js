import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { updateStudent } from '../../../Actions/studentActions';
import Pagination from '../../Pagination';

Modal.setAppElement('#root');
class CompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 5;
    this.state = {
      overallRate: Number,
      recommendedRating: Number,
      ceoRating: Number,
      firstReview: [],
      secondReview: [],
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
      topReviews: [],
      loading: true,
      pageIndex: 0,
      numPages: 0,
    };
  }

  componentDidMount() {
    if (this.props.reviews !== null) {
      const { reviews } = this.props;
      if (reviews.length > 0) { this.setPercentages(reviews); }
      this.setState({ reviews, loading: false, numPages: Math.ceil(reviews.length / this.itemsPerPage) });
    } else {
      const { cid } = this.props;
      const url = `${process.env.REACT_APP_BACKEND}/reviews/cid`;
      axios.post(url, { cid })
        .then((response) => {
          if (response.data) {
            const reviews = response.data;
            this.setPercentages(reviews);
            this.setState({
              reviews,
              loading: false,
              numPages: Math.ceil(reviews.length / this.itemsPerPage)
            });
            this.props.updateReviews(reviews);
          }
        });
    }
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

  toggleAddReview = () => {
    const showAddReview = !this.state.showAddReview;
    this.setState({
      showAddReview
    });
  }

  overallRatingHandler = (e) => {
    this.setState({ overallRating: e.target.value });
  }

  rheadlineHandler = (e) => {
    this.setState({ rheadline: e.target.value });
  }

  rdescriptionHandler = (e) => {
    this.setState({ rdescription: e.target.value });
  }

  rprosHandler = (e) => {
    this.setState({ rpros: e.target.value });
  }

  rconsHandler = (e) => {
    this.setState({ rcons: e.target.value });
  }

  radviceHandler = (e) => {
    this.setState({ radvice: e.target.value });
  }

  rrecommendedHandler = (e) => {
    this.setState({ rrecommended: e.target.value });
  }

  routlookHandler = (e) => {
    this.setState({ routlook: e.target.value });
  }

  rceoapproveHandler = (e) => {
    this.setState({ rceoapprove: e.target.value });
  }

  submitReview = () => {
    const { overallRating, rheadline, rdescription, rpros, rcons, radvice, rrecommended, routlook, rceoapprove } = this.state;
    const { cname, cid, stname, stid } = this.props;
    const url = `${process.env.REACT_APP_BACKEND}/reviews`;
    axios.post(url, { cname, cid, overallRating, rheadline, rdescription, rpros, rcons, radvice, rrecommended, routlook, rceoapprove, stname, stid })
      .then((response) => {
        if (response.data) {
          const reviews = [...this.state.reviews, response.data];
          this.props.updateReviews(reviews);
          this.setState({ reviews, numPages: Math.ceil((reviews.length / this.itemsPerPage)) });
          this.setPercentages(reviews);
          this.props.updateStudent({ streviews: [...this.props.streviews, response.data] });
          this.toggleAddReview();
        }
      });
  }

  helpfulReview = (e) => {
    const index = parseInt(e.currentTarget.getAttribute('index'));
    const { reviews } = this.state;
    console.log(reviews, index);
    const url = `${process.env.REACT_APP_BACKEND}/reviews/helpfulReview`;
    axios.post(url, { rid: reviews[index]._id })
      .then((response) => {
        if (response.data) {
          reviews[index] = response.data;
          reviews[index].helpful_vote = true;
          this.props.updateReviews(reviews);
          this.setPercentages(reviews);
          this.setState({ reviews });
        }
      });
  }

  setPage = (e) => {
    const { className } = e.currentTarget;
    const { pageIndex, numPages } = this.state;
    if (className === 'prev' && pageIndex > 0) {
      this.setState({ pageIndex: pageIndex - 1 });
    } else if (className === 'next' && pageIndex < numPages - 1) {
      this.setState({ pageIndex: pageIndex + 1 });
    } else if (className.includes('page')) {
      this.setState({ pageIndex: parseInt(e.currentTarget.getAttribute('pageIndex')) });
    }
  }

  render() {
    const { showAddReview } = this.state;
    const { overallRate, recommendedRating, ceoRating, loading, reviews, topReviews, pageIndex, numPages } = this.state;
    const { cname, cphoto } = this.props;
    const { itemsPerPage } = this;
    const numReviews = reviews.length;
    let numItems = 0;
    if (numReviews > 0) numItems = numPages === pageIndex + 1 && numReviews % itemsPerPage !== 0 ? numReviews % itemsPerPage : itemsPerPage;
    return loading ? <div className="loader cTab"><BeatLoader color="green" /></div>
      : (
        <div id="companyHomeContent" style={{ textAlign: 'left' }}>
          <Modal isOpen={this.state.showAddReview} onRequestClose={this.toggleAddReview} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black' } }}>
            <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.toggleAddReview}>
              <svg className="SVGInline-svg modal_closeIcon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="gray" fillRule="evenodd" />
              </svg>
            </span>
            <h1 style={{ textAlign: 'center' }}>
              Add a Review
            </h1>
            <label className="modalLabel">Rate a Company</label>
            <select className="modalInput" onChange={this.overallRatingHandler}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label className="modalLabel">Headline</label>
            <input onChange={this.rheadlineHandler} className="modalInput" />
            <label className="modalLabel">Description</label>
            <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.rdescriptionHandler} rows="10" cols="50" />
            <label className="modalLabel">Pros</label>
            <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.rprosHandler} rows="10" cols="30" />
            <label className="modalLabel">Cons</label>
            <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.rconsHandler} rows="10" cols="30" />
            <label className="modalLabel">Advice to Management</label>
            <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.radviceHandler} rows="10" cols="30" />
            <label className="modalLabel">Recommend to a Friend</label>
            <select className="modalInput" onChange={this.rrecommendedHandler}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label className="modalLabel">Approve CEO</label>
            <select className="modalInput" onChange={this.rceoapproveHandler}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label className="modalLabel">Outlook</label>
            <select className="modalInput" onChange={this.routlookHandler}>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
            <button className="save" onClick={this.submitReview}>Submit</button>
          </Modal>
          <div style={{ width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }} className="title css-1bqzjlu">
              {`${cname} `}
              Reviews
              <button onClick={this.toggleAddReview} className="btn btn-primary" style={{ float: 'right', position: 'relative', top: '5px', right: '5px' }}>
                <i className="btn-plus margRtSm" />
                <span>+ Add a Review</span>
                <i className="hlpr" />
              </button>
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
              <div style={{ marginLeft: '25px' }}>Recommend to a Friend</div>
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
              <div style={{ marginLeft: '55px' }}>Approve of CEO</div>
            </div>
            <hr style={{ width: '3000px', backgroundColor: 'black' }} />
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Top 2 Reviews</h1>
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
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>All Reviews</h1>
            <ol className="empReviews tightLt">
              {[...Array(numItems)].map((e, i) => {
                const index = i + (pageIndex * itemsPerPage);
                const date = new Date(reviews[index].rdate);
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
                return [
                  <li style={{ width: '100%' }} className=" empReview cf reviewCard" id="InterviewReview_38660866">
                    <div className="cf">
                      <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
                      <p className="helpfulReviews small tightVert floatRt">
                        {`${reviews[index].rhelpful} found helpful`}
                      </p>
                    </div>
                    <div className="tbl fill reviewHdr">
                      <div className="row">
                        <div className="cell sqLogoCell showDesk"><span className="sqLogo tighten smSqLogo logoOverlay"><img src={cphoto} className="lazy lazy-loaded" data-retina-ok="true" alt=" Logo" title style={{ opacity: 1 }} /></span></div>
                        <div className="cell">
                          <h2 className="summary strong noMargTop tightTop margBotXs">{`"${reviews[index].rheadline}"`}</h2>
                          <div>
                            <span style={{ color: '#0caa41', marginRight: '5px' }}>{reviews[index].overallRating}</span>
                            {[...Array(5)].map((e, i) => {
                              return <span role="button" style={{ color: `${i < reviews[index].overallRating ? '#0caa41' : 'lightgray'}` }}>★</span>;
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
                              <i className={`sqLed middle sm mr-xsm ${reviews[index].rrecommended === 'Yes' ? 'green' : 'red'}`} />
                              <span>{`${reviews[index].rrecommended === 'Yes' ? 'Recommends' : 'Does Not Recommend'}`}</span>
                            </div>
                            <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                              <i className={`sqLed middle sm mr-xsm ${reviews[index].routlook === 'Positive' ? 'green' : 'red'}`} />
                              <span>{`${reviews[index].routlook} Outlook`}</span>
                            </div>
                            <div style={{ width: 'auto', paddingLeft: 0 }} className="col-sm-4 d-flex align-items-center">
                              <i className={`sqLed middle sm mr-xsm ${reviews[index].rceoapprove === 'Yes' ? 'green' : 'red'}`} />
                              <span>{`${reviews[index].rceoapprove === 'Yes' ? 'Approves of CEO' : 'Does Not Approve of CEO'}`}</span>
                            </div>
                          </div>
                          <div style={{ marginTop: '40px' }} className="description ">
                            {reviews[index].rdescription}
                          </div>
                          <div style={{ marginTop: '30px' }} className="description ">
                            <h4 style={{ fontWeight: 'bold' }}>Pros</h4>
                            {reviews[index].rpros}
                          </div>
                          <div style={{ marginTop: '30px' }} className="description ">
                            <h4 style={{ fontWeight: 'bold' }}>Cons</h4>
                            {reviews[index].rcons}
                          </div>
                          {reviews[index].helpful_vote ? null
                            : (
                              <button index={index} onClick={this.helpfulReview} className="btn btn-primary clicked" style={{ float: 'right', position: 'relative', top: '10px', left: '5px', textAlign: 'center' }}>
                                <span>Helpful</span>
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </li>,
                  <div className="hr">
                    <hr />
                  </div>
                ];
              })}
            </ol>
            <Pagination setPage={this.setPage} page={pageIndex} numPages={numPages} />
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    streviews: state.student.user.streviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (updateInfo) => dispatch(updateStudent(updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReviews);
