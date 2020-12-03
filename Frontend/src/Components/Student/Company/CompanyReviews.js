import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateStudent } from '../../../Actions/studentActions';

Modal.setAppElement('#root');
class CompanyReviews extends Component {
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
      reviews: []
    };
  }

  componentDidMount() {
    const { cid } = this.props;
    const url = `${process.env.REACT_APP_BACKEND}/reviews/cid`;
    axios.post(url, { cid })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const reviews = response.data;
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
          arr.push(reviews[0]);
          arr.push(reviews[1]);
          console.log(arr);
          this.setState({
            overallRate: average,
            recommendedRating: recommended,
            ceoRating: approve,
            firstReview: arr[0],
            secondReview: arr[1],
            reviews: response.data
          });
        }
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
          // this.setState({ reviews });
          this.props.updateStudent({ streviews: [...this.props.streviews, response.data] });
          this.toggleAddReview();
        }
      });
  }

  render() {
    const { showAddReview } = this.state;
    const { overallRate, recommendedRating, ceoRating, firstReview, secondReview } = this.state;
    const { cname } = this.props;
    const contents = this.state.reviews.map((item) => (
      <div>
        <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" style={{ float: 'left' }} /></span></div>
        <div>
          <div>
            <div style={{ marginLeft: '50px' }}>
              <h2>
                <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">
                  "
                  {item === undefined ? null : item.rheadline}
                  "
                </a>
              </h2>
              <div>
                <div style={{ marginBottom: '50px' }}>
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
                  <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{item === undefined ? null : item.rwriter}</span>
                </div>
              </div>
              <div className="interviewOutcomes">
                <div className="flex-grid">
                  <div className="tightLt col span-1-3">
                    <div className="middle">
                      <div className="cell"><i className={item.rrecommended === 'Yes' ? 'sqLed middle sm green margRtXs ' : 'sqLed middle sm red margRtXs '} /></div>
                      <div className="cell">
                        <span className="middle">
                          {item.rrecommended === 'Yes' ? 'Recommends' : 'Doesn\'t Recommend'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tightLt col span-1-3">
                    <div className="middle">
                      <div className="cell"><i className={item.routlook === 'Positive' ? 'sqLed middle sm green margRtXs ' : 'sqLed middle sm red margRtXs '} /></div>
                      <div className="cell"><span className="middle">{item.routlook === 'Positive' ? 'Positive Outlook' : 'Positive Outlook'}</span></div>
                    </div>
                  </div>
                  <div className="tightLt col span-1-3">
                    <div className="middle">
                      <div className="cell"><i className={item.rceoapprove === 'Yes' ? 'sqLed middle sm green margRtXs ' : 'sqLed middle sm red margRtXs '} /></div>
                      <div className="cell"><span className="middle">{item.rceoapprove === 'Yes' ? 'Approves of CEO' : 'Doesn\'t Approve CEO'}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-0 mt-xsm strong ">Description</p>
              <p>{item === undefined ? null : item.rdescription}</p>
              <p className="mb-0 mt-xsm strong ">Pros</p>
              <p>{item === undefined ? null : item.rpros}</p>
              <p className="mb-0 mt-xsm strong ">Cons</p>
              <p>
                {item === undefined ? null : item.rcons}
                {' '}
                <button onClick={this.toggleAddReview} className="btn btn-primary" style={{ float: 'right', position: 'relative', right: '5px', textAlign: 'center' }}>
                  <span>Helpful</span>
                </button>
              </p>
            </div>
            <hr style={{ width: '3000px', backgroundColor: 'black' }} />
          </div>
        </div>
      </div>
    ));
    return (
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
        <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
          <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }} className="title css-1bqzjlu">
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
          <div>
            <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" style={{ float: 'left' }} /></span></div>
            <div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2>
                    <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">
                      "
                      {firstReview === undefined ? null : firstReview.rheadline}
                      "
                    </a>
                  </h2>
                  <div>
                    <div style={{ marginBottom: '50px' }}>
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
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{firstReview === undefined ? null : firstReview.rwriter}</span>
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
                    <p>{firstReview === undefined ? null : firstReview.rrecommended}</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>{firstReview === undefined ? null : firstReview.rceoapprove}</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>{firstReview === undefined ? null : firstReview.rdescription}</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>{firstReview === undefined ? null : firstReview.rpros}</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>{firstReview === undefined ? null : firstReview.rcons}</p>
                  <button onClick={this.toggleAddReview} className="btn btn-primary" style={{ float: 'right', position: 'relative', right: '20px', bottom: '20px', textAlign: 'center' }}>
                      <span>Helpful</span>
                    </button>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div>
            <div>
              <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" style={{ float: 'left' }} /></span></div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2>
                    <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">
                      "
                      {secondReview === undefined ? null : secondReview.rheadline}
                      "
                    </a>
                  </h2>
                  <div>
                    <div style={{ marginBottom: '50px' }}>
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
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{secondReview === undefined ? null : secondReview.rwriter}</span>
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
                    <p>{secondReview === undefined ? null : secondReview.rrecommended}</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>{secondReview === undefined ? null : secondReview.rceoapprove}</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>{secondReview === undefined ? null : secondReview.rdescription}</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>{secondReview === undefined ? null : secondReview.rpros}</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>{secondReview === undefined ? null : secondReview.rcons}</p>
                  <button onClick={this.toggleAddReview} className="btn btn-primary" style={{ float: 'right', position: 'relative', right: '20px', bottom: '20px', textAlign: 'center' }}>
                      <span>Helpful</span>
                    </button>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div>
            <div>
              {contents}
            </div>
          </div>
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
