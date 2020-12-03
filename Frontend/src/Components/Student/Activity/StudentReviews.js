import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 5;
    this.numPages = Math.ceil(this.props.reviews.length / this.itemsPerPage);
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
    const { name, reviews } = this.props;
    const { pageIndex } = this.state;
    const { numPages, itemsPerPage } = this;
    const numReviews = reviews.length;
    let numItems = 0;
    if (numReviews > 0) numItems = numPages === pageIndex + 1 && numReviews % itemsPerPage !== 0 ? numReviews % itemsPerPage : itemsPerPage;
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>{`${name}'s Reviews`}</h1>
        <ol className="empReviews tightLt">
          {[...Array(numItems)].map((e, i) => {
            const index = i + (pageIndex * itemsPerPage);
            const date = new Date(reviews[index].rdate);
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
