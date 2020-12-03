import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentInterviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 3;
    this.numPages = Math.ceil(this.props.interviews.length / this.itemsPerPage);
  }

  setPage = (e) => {
    const { className } = e.currentTarget;
    const { pageIndex } = this.state;
    const { numPages } = this;
    if (className === 'prev' && pageIndex > 0) {
      this.setState({ pageIndex: pageIndex - 1 });
    } else if (className === 'next' && pageIndex < numPages - 1) {
      this.setState({ pageIndex: pageIndex + 1 });
    } else if (className.includes('page')) {
      this.setState({ pageIndex: parseInt(e.currentTarget.getAttribute('pageIndex')) });
    }
  }

  render() {
    const { name, interviews } = this.props;
    const { pageIndex } = this.state;
    const { numPages, itemsPerPage } = this;
    const numInterviews = interviews.length;
    let numItems = 0;
    if (numInterviews > 0) numItems = numPages === pageIndex + 1 && numInterviews % itemsPerPage !== 0 ? numInterviews % itemsPerPage : itemsPerPage;
    return (
      <div style={{ width: '65%', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>{`${name}'s Interviews`}</h1>
        <ol style={{ backgroundColor: 'white' }} className="empReviews tightLt">
          {[...Array(numItems)].map((e, i) => {
            const index = i + (pageIndex * itemsPerPage);
            const date = new Date(interviews[index].interviewposted);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            let expColor = null;
            let diffColor = null;
            switch (interviews[index].overallexp) {
              case 'Positive':
                expColor = 'green';
                break;
              case 'Neutral':
                expColor = 'yellow';
                break;
              case 'Negative':
                expColor = 'red';
                break;
              default:
                break;
            }
            switch (interviews[index].difficulty) {
              case 'Easy':
                diffColor = 'green';
                break;
              case 'Average':
                diffColor = 'yellow';
                break;
              case 'Difficult':
                diffColor = 'red';
                break;
              default:
                break;
            }
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
                        <span className="reviewer">{interviews[index].jobtitle}</span>
                        {' '}
                        Interview
                      </a>
                    </h2>
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
                            <div className="cell"><i className={`sqLed middle sm ${interviews[index].offerstatus === 'Accepted' ? 'green' : 'red'} margRtXs `} /></div>
                            <div className="cell">
                              <span className="middle">
                                {`${interviews[index].offerstatus} Offer`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className={`sqLed middle sm ${expColor} margRtXs `} /></div>
                            <div className="cell"><span className="middle">{`${interviews[index].overallexp} Experience`}</span></div>
                          </div>
                        </div>
                        <div className="tightLt col span-1-3">
                          <div className="middle">
                            <div className="cell"><i className={`sqLed middle sm ${diffColor} margRtXs `} /></div>
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
                                {interviews[index].interviewqna.question}
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
                                {interviews[index].interviewqna.answers[0]}
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
    name: state.student.user.stname,
    interviews: state.student.user.stinterviews,
  };
};

export default connect(mapStateToProps)(StudentInterviews);
