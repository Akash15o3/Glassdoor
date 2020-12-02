import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 6;
    this.numPages = 3;
  }

  render() {
    const { name, reviews } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{`${name}'s Reviews`}</h1>
        <ol className="empReviews tightLt">
          {reviews.map((review) => {
            const date = new Date(review.rdate);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            const posted_on = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            return [
              <li style={{ margin: 'auto' }} className=" empReview cf reviewCard" id="InterviewReview_38660866">
                <div className="cf">
                  <div className="floatLt"><time className="date subtle small">{posted_on}</time></div>
                  <p className="helpfulReviews small tightVert floatRt"> &nbsp; </p>
                </div>
                <div className="tbl fill reviewHdr">
                  <div className="row">
                    <div className="cell sqLogoCell showDesk"><span className="sqLogo tighten smSqLogo logoOverlay"><img data-original="https://media.glassdoor.com/sqls/7201/burger-king-squarelogo-1576633767546.png" data-original-2x="https://media.glassdoor.com/sqlm/7201/burger-king-squarelogo-1576633767546.png" src="https://media.glassdoor.com/sqls/7201/burger-king-squarelogo-1576633767546.png" className="lazy lazy-loaded" data-retina-ok="true" alt=" Logo" title style={{ opacity: 1 }} /></span></div>
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
              <div className="hr">
                <hr />
              </div>
            ];
          })}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.student.user.stname,
    reviews: state.student.user.streviews,
  };
};

export default connect(mapStateToProps)(StudentReviews);
