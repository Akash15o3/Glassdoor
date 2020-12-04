import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { updateStudent } from '../../../Actions/studentActions';
import Pagination from '../../Pagination';

Modal.setAppElement('#root');
class CompanyInterview extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 3;
    this.state = {
      open: false,
      interviews: [],
      positivePercent: 0,
      neutralPercent: 0,
      negativePercent: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      overallexp: 'Positive',
      jobtitle: '',
      description: '',
      difficulty: 'Easy',
      offerstatus: 'Rejected',
      question: '',
      answer: '',
      pageIndex: 0,
      numPages: 0,
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.interviews !== null) {
      this.setPercentages(this.props.interviews);
      this.setState({ interviews: this.props.interviews, loading: false, numPages: Math.ceil(this.props.interviews.length / this.itemsPerPage) });
    } else {
      const url = `${process.env.REACT_APP_BACKEND}/interviews/getInterviews?cname=${this.props.cname}`;
      axios.get(url)
        .then((response) => {
          const interviews = response.data;
          this.props.updateInterviews(interviews);
          this.setPercentages(interviews);
          this.setState({ interviews, loading: false, numPages: Math.ceil(interviews.length / this.itemsPerPage) });
        });
    }
  }

  setPercentages = (interviews) => {
    const total = interviews.length;
    if (total === 0) return;
    let { positive, neutral, negative } = this.state;
    interviews.forEach(
      (interview) => {
        if (interview.overallexp === 'Positive') positive++;
        else if (interview.overallexp === 'Negative') negative++;
        else if (interview.overallexp === 'Neutral') neutral++;
      }
    );
    const positivePercent = Math.round((positive / total) * 100);
    const neutralPercent = Math.round((neutral / total) * 100);
    const negativePercent = Math.round((negative / total) * 100);
    this.setState({ positivePercent, neutralPercent, negativePercent, positive, negative, neutral });
  }

  openInterviewModal = () => {
    this.setState({ open: true });
  }

  closeInterviewModal = () => {
    this.setState({ open: false });
  }

  experienceChangeHandler = (e) => {
    this.setState({ overallexp: e.target.value });
  }

  jobTitleChangeHandler = (e) => {
    this.setState({ jobtitle: e.target.value });
  }

  descriptionChangeHandler = (e) => {
    this.setState({ description: e.target.value });
  }

  difficultyChangeHandler = (e) => {
    this.setState({ difficulty: e.target.value });
  }

  offerStatusChangeHandler = (e) => {
    this.setState({ offerstatus: e.target.value });
  }

  questionChangeHandler = (e) => {
    this.setState({ question: e.target.value });
  }

  answerChangeHandler = (e) => {
    this.setState({ answer: e.target.value });
  }

  submitInterview = () => {
    const { overallexp, jobtitle, description, difficulty, offerstatus, question, answer } = this.state;
    const { cname, stid } = this.props;
    const interviewqna = { question, answers: [answer] };
    const url = `${process.env.REACT_APP_BACKEND}/interviews`;
    axios.post(url, { cname, overallexp, jobtitle, description, difficulty, offerstatus, interviewqna, stid })
      .then((response) => {
        if (response.data) {
          const interviews = [...this.state.interviews, response.data];
          this.setState({ interviews, numPages: Math.ceil((interviews.length / this.itemsPerPage)) });
          this.props.updateInterviews(interviews);
          this.setPercentages(interviews);
          this.props.updateStudent({ stinterviews: [...this.props.stinterviews, response.data] });
          this.closeInterviewModal();
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
    const { overallexp, jobtitle, description, difficulty, offerstatus, question, answer, pageIndex, numPages, interviews, negativePercent, neutralPercent, positivePercent, loading } = this.state;
    const { itemsPerPage } = this;
    const numInterviews = interviews.length;
    let numItems = 0;
    if (numInterviews > 0) numItems = numPages === pageIndex + 1 && numInterviews % itemsPerPage !== 0 ? numInterviews % itemsPerPage : itemsPerPage;
    return loading ? <div className="loader cTab"><BeatLoader color="green" /></div> : (
      <div style={{ width: '65%', margin: 'auto', backgroundColor: 'white' }}>
        <Modal isOpen={this.state.open} onRequestClose={this.closeInterviewModal} style={{ content: { width: '55%', margin: 'auto', border: '2px solid black' } }}>
          <span alt="Close" className="SVGInline modal_closeIcon" onClick={this.closeInterviewModal}>
            <svg className="SVGInline-svg modal_closeIcon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z" fill="gray" fillRule="evenodd" />
            </svg>
          </span>
          <h1 style={{ textAlign: 'center' }}>
            Add an Interview
          </h1>
          <label className="modalLabel">Rate your Expereince</label>
          <select value={overallexp} className="modalInput" onChange={this.experienceChangeHandler}>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
          <label className="modalLabel">Job Title</label>
          <input value={jobtitle} onChange={this.jobTitleChangeHandler} className="modalInput" />
          <label className="modalLabel">Description</label>
          <textarea value={description} style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.descriptionChangeHandler} rows="10" cols="50" />
          <label className="modalLabel">Difficulty</label>
          <select value={difficulty} className="modalInput" onChange={this.difficultyChangeHandler}>
            <option value="Easy">Easy</option>
            <option value="Average">Average</option>
            <option value="Difficult">Difficult</option>
          </select>
          <label className="modalLabel">Offer Status</label>
          <select value={offerstatus} className="modalInput" onChange={this.offerStatusChangeHandler}>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
          <label className="modalLabel">Interview Question</label>
          <textarea value={question} style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.questionChangeHandler} rows="10" cols="30" />
          <label className="modalLabel">Interview Answer</label>
          <textarea value={answer} style={{ resize: 'none', padding: '5px', fontSize: 'medium', outline: 'none', width: '95%', marginBottom: '20px' }} onChange={this.answerChangeHandler} rows="10" cols="30" />
          <button className="save" onClick={this.submitInterview}>Submit</button>
        </Modal>
        <h1 style={{ fontWeight: 'bold', marginLeft: '150px' }}>
          {`Interviews at ${this.props.cname}`}
          {this.props.isAuth ? (
            <button onClick={this.openInterviewModal} style={{ backgroundColor: '#1861bf', position: 'relative', left: '-15px', top: '5px', float: 'right' }} className="gd-btn gd-btn-link gradient gd-btn-med gd-btn-icon padHorz addReview">
              <i className="btn-plus margRtSm" />
              <span>Add Interview </span>
              <i className="hlpr" />
            </button>
          ) : null}
        </h1>
        <div>
          <h2>Expereince</h2>
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
                strokeDasharray={`${positivePercent}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>
                {positivePercent}
                %
              </text>
            </svg>
            <div style={{ marginLeft: '25px' }}>Positive</div>
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
                strokeDasharray={`${neutralPercent}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>
                {neutralPercent}
                %
              </text>
            </svg>
            <div style={{ marginLeft: '25px' }}>Neutral</div>
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
                strokeDasharray={`${negativePercent}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>
                {negativePercent}
                %
              </text>
            </svg>
            <div style={{ marginLeft: '25px' }}>Negative</div>
          </div>
        </div>
        <ol className="empReviews tightLt">
          {[...Array(numItems)].map((e, i) => {
            const index = i + (pageIndex * itemsPerPage);
            const date = new Date(interviews[index].interviewposted);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            return [<li className=" empReview cf " id="InterviewReview_38660866">
              <div className="cf">
                <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
                <p className="helpfulReviews small tightVert floatRt"> &nbsp; </p>
              </div>
              <div className="tbl fill reviewHdr">
                <div className="row">
                  <div className="cell">
                    <h2 className="summary strong noMargTop tightTop margBotXs">
                      <a href="/Interview/Burger-King-Interview-RVW38660866.htm">
                        <span className="reviewer">{interviews[index].jobtitle}</span>
                        {' '}
                        Interview
                      </a>
                    </h2>
                    <div className="tbl reviewMeta">
                      <div className="cell">
                        <div className="author minor">
                          {`Anonymous ${interviews[index].offerstatus === 'Accepted' ? 'Employee' : 'Interview Candidate'}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tbl fill margTopMd">
                <div className="row">
                  <div className="cell sqLogoCell showDesk" />
                  <div className="cell reviewBodyCell">
                    <div className="interviewOutcomes">
                      <div className="flex-grid">
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className="sqLed middle sm green margRtXs " /></div>
                            <div className="cell">
                              <span className="middle">
                                {`${interviews[index].offerstatus} Offer`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className="sqLed middle sm green margRtXs " /></div>
                            <div className="cell"><span className="middle">{`${interviews[index].overallexp} Experience`}</span></div>
                          </div>
                        </div>
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className="sqLed middle sm green margRtXs " /></div>
                            <div className="cell"><span className="middle">{`${interviews[index].difficulty} Interview`}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'left' }} className="description ">
                      <div className="interviewReviewDetails truncateData" data-animate-after-less="true" data-click-anywhere="true" data-less-str="Show Less" data-more-str="Show More" data-truncate-toggle="true" data-truncate-words={70}>
                        <p className="strong margTopMd tightBot">Interview Question</p>
                        <div className="interviewQuestions">
                          <ul className="undecorated">
                            <li>
                              <span className="interviewQuestion noPadVert truncateThis wrapToggleStr " data-truncate-words={70}>
                                {interviews[index].interviewqna[0].question}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'left' }} className="description ">
                      <div className="interviewReviewDetails truncateData" data-animate-after-less="true" data-click-anywhere="true" data-less-str="Show Less" data-more-str="Show More" data-truncate-toggle="true" data-truncate-words={70}>
                        <p className="strong margTopMd tightBot">Answer</p>
                        <div className="interviewQuestions">
                          <ul className="undecorated">
                            <li>
                              <span className="interviewQuestion noPadVert truncateThis wrapToggleStr " data-truncate-words={70}>
                                {interviews[index].interviewqna[0].answers[0]}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>,
              <div className="hr">
                <hr />
              </div>];
          })}
        </ol>
        <Pagination setPage={this.setPage} page={pageIndex} numPages={numPages} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stinterviews: state.credentials.isAuth ? state.student.user.stinterviews : null,
    isAuth: state.credentials.isAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (updateInfo) => dispatch(updateStudent(updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInterview);
