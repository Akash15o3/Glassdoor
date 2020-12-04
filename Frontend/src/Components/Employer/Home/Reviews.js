import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';

Modal.setAppElement('#root');
class EmployerReviews extends Component {
  constructor(props) {
    super(props);
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
      rfeatured: '',
      rreply: '',
      rreplyid: '',
      reviews: [],
      loading: true
    };
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/reviews/cid`;
    const data = { cid: sessionStorage.getItem('cid') };
    axios.post(url, data)
      .then((response) => {
        if (response.data) {
          console.log('Review response: ');
          console.log(response.data);
          //   console.log(response.data._id, '||||', response.data[0]._id);
          this.setState({
            reviews: response.data, loading: false
          });
        }
      });
  }

  toggleAddReview = () => {
    const showAddReview = !this.state.showAddReview;
    this.setState({
      showAddReview
    });
    console.log('review id', this.state.rreplyid);
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

  rreplyHandler = (e) => {
    console.log('srply btn id: ', e.target.id);
    this.setState({ rreply: e.target.value });
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
    const { rreply, rreplyid } = this.state;
    // const { cname, cid, stname, stid } = this.props;
    console.log('rwply to review: ', rreply);
    const url = `${process.env.REACT_APP_BACKEND}/reviews/replyReviews`;
    axios.post(url, { rreplyid, rreply })
      .then((response) => {
        if (response.data) {
          // const reviews = [...this.props.reviews, response.data];
          // this.setState({ reviews });
          // this.props.updateReviews(reviews);
          this.toggleAddReview();
        }
      });
  }

  roleChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      rreplyid: e.target.id,
    });
    console.log('APPLIER ID: ', e.target.id);
  };

  featuredHandler = () => {
    const { rreplyid } = this.state;
    // const { cname, cid, stname, stid } = this.props;
    const data = {
      cid: sessionStorage.getItem('cid'),
      rreplyid: this.state.rreplyid,
    };
    const url = `${process.env.REACT_APP_BACKEND}/companies/addFeaturedReview`;
    axios.post(url, data)
      .then((response) => {
        if (response.data) {
          const url1 = `${process.env.REACT_APP_BACKEND}/reviews/cid`;
          const data1 = { cid: sessionStorage.getItem('cid') };
          axios.post(url1, data1)
            .then((res) => {
              if (res.data) {
                console.log('Review response: ');
                console.log(res.data);
                //   console.log(response.data._id, '||||', response.data[0]._id);
                this.setState({
                  reviews: res.data,
                });
                alert('Marked review as featured!');
              }
            });
          //   const reviews = [...this.props.reviews, response.data];
          // this.setState({ reviews });
          //   this.props.updateReviews(reviews);
          //   this.toggleAddReview();
          console.log(response.data);
        }
      });
  }

  render() {
    const { showAddReview } = this.state;
    const { overallRate, recommendedRating, ceoRating, firstReview, secondReview } = this.state;
    const cname = sessionStorage.getItem('cname');

    const details = this.state.reviews.map(
      (review) => {
        const date = new Date(review.rdate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        return [
          /* <select onChange={this.roleChangeHandler} id={review._id}>
              <option value="Not Selected ">Not Selected</option>
              <option value="Selected Review">Selected</option>
            </select>, */

          /* <div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2>
                    <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">
                      "
                      {rheadline}
                      "
                    </a>
                  </h2>
                  <div>
                    <div style={{ marginBottom: '50px' }}>
                      <div>
                        <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
                          <div className="tooltipContainer">
                            <span className="pointer" />
                            <div className="content">
                              <ul className="pl-0" />
                            </div>
                          </div>
                        </aside>
                      </div>
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{firstReview.rwriter}</span>
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
                    <p>{rrecommended}</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>{rceoapprove}</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>{rdescription}</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>{rpros}</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>{rcons}</p>
                  <p className="mb-0 mt-xsm strong ">Reply to review</p>
                  <p>{rreply}</p>
                  <button onClick={this.featuredHandler} className="gd-ui-button  css-glrvaa">Mark Featured</button>

                  <button onClick={this.toggleAddReview} id={_id} className="btn btn-primary" style={{ float: 'right', position: 'relative', top: '5px', right: '5px' }}>
                    <i className="btn-plus margRtSm" />
                    <span>Reply to this Review</span>
                    <i className="hlpr" />
                  </button>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div> */
          <li style={{ width: '100%' }} className=" empReview cf reviewCard" id="InterviewReview_38660866">
            <input onClick={this.roleChangeHandler} id={review._id} type="checkbox" style={{ marginBottom: '15px' }} />
            <div className="cf">
              <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
              <p className="helpfulReviews small tightVert floatRt">{`${review.rhelpful} found helpful`}</p>
            </div>
            <div className="tbl fill reviewHdr">
              <div className="row">
                <div className="cell sqLogoCell showDesk"><span className="sqLogo tighten smSqLogo logoOverlay"><img src={this.props.cphoto} className="lazy lazy-loaded" data-retina-ok="true" alt=" Logo" title style={{ opacity: 1 }} /></span></div>
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
                  <div style={{ marginTop: '30px', marginBottom: '20px' }} className="description ">
                    <h4 style={{ fontWeight: 'bold' }}>Cons</h4>
                    {review.rcons}
                  </div>
                  {review.rreply
                    ? (
                      <div style={{ borderTop: '1px solid black', backgroundColor: 'aqua' }}>
                        <h3 style={{ fontWeight: 'bold' }}>{`-Reply from ${review.cname}`}</h3>
                        <p>{review.rreply}</p>
                      </div>
                    ) : (
                      <div style={{ marginTop: '30px' }} className="description ">
                        <button onClick={this.toggleAddReview} id={review._id} className="btn btn-primary">
                          <i className="btn-plus margRtSm" />
                          <span>Reply to this Review</span>
                          <i className="hlpr" />
                        </button>
                      </div>
                    )}
                  <div style={{ marginTop: '30px' }} className="description ">
                    <button onClick={this.featuredHandler} className="btn btn-warning  ">Mark Featured</button>
                  </div>
                </div>
              </div>
            </div>
          </li>,
          <br />
        ];
      }
    );

    return this.state.loading ? <div className="loader"><BeatLoader color="green" /></div> : (
      <div id="companyHomeContent" style={{ textAlign: 'left' }}>
        <Modal isOpen={this.state.showAddReview} onRequestClose={this.toggleAddReview} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black' } }}>
          <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.toggleAddReview}>
            <svg className="SVGInline-svg modal_closeIcon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="gray" fillRule="evenodd" />
            </svg>
          </span>
          <h1 style={{ textAlign: 'center' }}>
            Reply to Review
          </h1>
          <label className="modalLabel">Write your reply here</label>
          <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.rreplyHandler} rows="10" cols="50" />
          <button className="save" onClick={this.submitReview}>Submit Reply</button>
        </Modal>
        {/* <Modal isOpen={this.state.showAddReview} onRequestClose={this.toggleAddReview} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black' } }}>
          <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.toggleAddReview} />
          <h1 style={{ textAlign: 'center' }}>
            Reply to Review
          </h1>
          <label className="modalLabel">Write your reply here</label>
          <textarea style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.rreplyHandler} rows="10" cols="50" />
          <button className="save" onClick={this.submitReview}>Submit Reply</button>
        </Modal> */}
        <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }} className="title css-1bqzjlu">
            {cname}
            's Reviews
            {/* <button onClick={this.toggleAddReview} className="btn btn-primary" style={{ float: 'right', position: 'relative', top: '5px', right: '5px' }}>
              <i className="btn-plus margRtSm" />
              <span>Reply to this Review</span>
              <i className="hlpr" />
            </button> */}
          </h2>
          <hr style={{ width: '3000px', backgroundColor: 'black' }} />
          <ol className="empReviews tightLt">
            {details}
          </ol>
          {/* <div>
            <div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2>
                    <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">
                      "
                      {firstReview.rheadline}
                      "
                    </a>
                  </h2>
                  <div>
                    <div style={{ marginBottom: '50px' }}>
                      <div>
                        <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
                          <div className="tooltipContainer">
                            <span className="pointer" />
                            <div className="content">
                              <ul className="pl-0" />
                            </div>
                          </div>
                        </aside>
                      </div>
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{firstReview.rwriter}</span>
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
                    <p>{firstReview.rrecommended}</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>{firstReview.rceoapprove}</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>{firstReview.rdescription}</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>{firstReview.rpros}</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>{firstReview.rcons}</p>

                  <button className="gd-ui-button  css-glrvaa">Helpful</button>

                  <button onClick={this.toggleAddReview} className="btn btn-primary" style={{ float: 'right', position: 'relative', top: '5px', right: '5px' }}>
                    <i className="btn-plus margRtSm" />
                    <span>Reply to this Review</span>
                    <i className="hlpr" />
                  </button>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cphoto: state.employer.user.cphoto,
  };
};

export default connect(mapStateToProps)(EmployerReviews);
