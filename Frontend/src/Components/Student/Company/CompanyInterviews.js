import React, { Component } from 'react';

export default class CompanyInterview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      interviews: this.props.interviews
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ width: '65%', margin: 'auto', backgroundColor: 'white' }}>
        <h1>{`Interviews at ${this.props.cname}`}</h1>
        <div style={{ borderBottom: '1px solid gray', paddingBottom: '20px' }}>
          <h2>Expereince</h2>
          <span style={{ marginRight: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'lightgreen' }}>Positive</span>
            : 65%
          </span>
          <span style={{ marginRight: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'green' }}>Neutral</span>
            : 25%
          </span>
          <span style={{ marginRight: '15px' }}>
            <span style={{ fontWeight: 'bold', color: 'blue' }}>Negative</span>
            : 20%
          </span>
        </div>
        <ol className="empReviews tightLt">
          {this.props.interviews.map((interview) => {
            const date = new Date(interview.interviewposted);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const posted_on = `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
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
                    <div className="description ">
                      <div className="interviewReviewDetails truncateData" data-animate-after-less="true" data-click-anywhere="true" data-less-str="Show Less" data-more-str="Show More" data-truncate-toggle="true" data-truncate-words={70}>
                        <p className="strong margTopMd tightBot">Interview Questions</p>
                        <div className="interviewQuestions">
                          <ul className="undecorated">
                            <li>
                              <span className="interviewQuestion noPadVert truncateThis wrapToggleStr " data-truncate-words={70}>
                                {' '}
                                What is your availability to work? &nbsp;
                                {' '}
                                <a href="/Interview/What-is-your-availability-to-work-QTN_4027130.htm" className="questionResponse">Answer Question</a>
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
