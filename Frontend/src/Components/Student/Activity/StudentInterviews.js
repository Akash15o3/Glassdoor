import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentInterviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 6;
    this.numPages = 3;
  }

  render() {
    const { name, interviews } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{`${name}'s Interviews`}</h1>
        <ol className="empReviews tightLt">
          {interviews.map((interview) => {
            const date = new Date(interview.interviewposted);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            return [<li style={{ margin: 'auto' }} className=" empReview cf reviewCard" id="InterviewReview_38660866">
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
                    <div className="description ">
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
                    <div className="description ">
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
    name: state.student.user.stname,
    interviews: state.student.user.stinterviews,
  };
};

export default connect(mapStateToProps)(StudentInterviews);
