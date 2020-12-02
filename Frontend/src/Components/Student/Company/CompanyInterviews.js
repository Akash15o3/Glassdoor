import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { updateStudent } from '../../../Actions/studentActions';

Modal.setAppElement('#root');
class CompanyInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      interviews: [],
      positivePercent: 0,
      neutralPercent: 0,
      negativePercent: 0,
      overallexp: 'Positive',
      jobtitle: '',
      description: '',
      difficulty: 'Easy',
      offerstatus: 'Rejected',
      question: '',
      answer: '',
      loading: true
    };
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/interviews/getInterviews?cname=${this.props.cname}`;
    axios.get(url)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const interviews = response.data;
          let negative = 0;
          let neutral = 0;
          let positive = 0;
          const total = interviews.length;
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
          this.setState({ interviews, positivePercent, neutralPercent, negativePercent });
        }
        this.setState({ loading: false });
      });
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
          this.setState({ interviews });
          this.props.updateStudent({ stinterviews: [...this.props.stinterviews, response.data] });
          this.closeInterviewModal();
        }
      });
  }

  render() {
    const { overallexp, jobtitle, description, difficulty, offerstatus, question, answer, loading } = this.state;
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
        <div style={{ borderBottom: '2px solid gray', paddingBottom: '20px' }}>
          <h2>Expereince</h2>
          <span style={{ marginRight: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'lightgreen' }}>Positive</span>
            :
            {' '}
            {this.state.positivePercent}
            %
          </span>
          <span style={{ marginRight: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'green' }}>Neutral</span>
            :
            {' '}
            {this.state.neutralPercent}
            %
          </span>
          <span style={{ marginRight: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Negative</span>
            :
            {' '}
            {this.state.negativePercent}
            %
          </span>
        </div>
        <ol className="empReviews tightLt">
          {this.state.interviews.map((interview) => {
            const date = new Date(interview.interviewposted);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            return [<li className=" empReview cf " id="InterviewReview_38660866">
              <div className="cf">
                <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
                <p className="helpfulReviews small tightVert floatRt"> &nbsp; </p>
              </div>
              <div className="tbl fill reviewHdr">
                <div className="row">
                  <div className="cell sqLogoCell showDesk"><span className="sqLogo tighten smSqLogo logoOverlay"><img data-original="https://media.glassdoor.com/sqls/7201/burger-king-squarelogo-1576633767546.png" data-original-2x="https://media.glassdoor.com/sqlm/7201/burger-king-squarelogo-1576633767546.png" src="https://media.glassdoor.com/sqls/7201/burger-king-squarelogo-1576633767546.png" className="lazy lazy-loaded" data-retina-ok="true" alt=" Logo" title style={{ opacity: 1 }} /></span></div>
                  <div className="cell">
                    <h2 className="summary strong noMargTop tightTop margBotXs">
                      <a href="/Interview/Burger-King-Interview-RVW38660866.htm">
                        <span className="reviewer">{interview.jobtitle}</span>
                        {' '}
                        Interview
                      </a>
                    </h2>
                    <div className="tbl reviewMeta">
                      <div className="cell">
                        <div className="author minor">
                          {`Anonymous ${interview.offerstatus === 'Accepted' ? 'Employee' : 'Interview Candidate'}`}
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
                                {`${interview.offerstatus} Offer`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className="sqLed middle sm green margRtXs " /></div>
                            <div className="cell"><span className="middle">{`${interview.overallexp} Experience`}</span></div>
                          </div>
                        </div>
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className="sqLed middle sm green margRtXs " /></div>
                            <div className="cell"><span className="middle">{`${interview.difficulty} Interview`}</span></div>
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
                                {interview.interviewqna[0].question}
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
                                {interview.interviewqna[0].answers[0]}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stinterviews: state.student.user.stinterviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (updateInfo) => dispatch(updateStudent(updateInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInterview);
