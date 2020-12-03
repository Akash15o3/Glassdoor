import React, { Component } from 'react';
import axios from 'axios';
import reviewPic from '../../Static/Images/review.jpeg'

class ReviewCard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      change: false,
    }

    this.approveReview = this.approveReview.bind(this);
    this.rejectReview = this.rejectReview.bind(this);
  }

  approveReview = (event) => {
    const { review } = this.props;
    let url = `${process.env.REACT_APP_BACKEND}/admin/reviews/${review._id}/approve`;
    axios.put(url)
      .then((response) => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          this.setState({
            change: true,
          })
        }
      }).catch(err =>{
          console.log("No response")
      });
  }

  rejectReview = (event) => {
    const { review } = this.props;
    let url = `${process.env.REACT_APP_BACKEND}/admin/reviews/${review._id}/reject`;
    axios.put(url)
      .then((response) => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          this.setState({
            change: true,
          })
        }
      }).catch(err =>{
          console.log("No response")
      });
  }


  render() {
    const { review } = this.props;
    console.log('review props', this.props)
    const numStars = Math.trunc(review.overallRating);
    let numStarsRange = [];
    for(let i = 1; i <= numStars; i++) {
        numStarsRange.push(i);
    }

    let halfStar = false;
    if(review.overallRating - numStars !== 0) {
      halfStar = true;
    }

    const emptyStars = 5 - numStars + (halfStar ? 1 : 0);
    let emptyStarsRange = [];
    for(let i = 1; i <= emptyStars; i++) {
      emptyStarsRange.push(i);
    }

    let renderStars = numStarsRange.map((number) => {
      return (
        <span className="fa fa-star checked" />
      )
    });
    let renderHalfStars = halfStar === true ? <span className="fa fa-star-half-o" /> : null;
    let renderEmptyStars = emptyStarsRange.map((number) => {
      return (
        <span className="fa fa-star" />
      )
    });

    let approveButton = null;
    let rejectButton = null;
    if(review.rapproval == 'Pending') {
      approveButton = <button onClick={this.approveReview} className="btn btn-success" style={{ position: 'center', width: '20%'}}>Approve</button>
      rejectButton = <button onClick={this.rejectReview} className="btn btn-success" style={{ position: 'relative', width: '20%'}}>Reject</button>
    } else if (review.rapproval == 'Approved') {
      rejectButton = <button onClick={this.rejectReview} className="btn btn btn-success btn-block" style={{ position: 'relative', width: '20%' }}>Reject</button>
    } else if(review.rapproval == 'Rejected') {
      approveButton = <button onClick={this.approveReview} className="btn btn btn-success btn-block" style={{ position: 'relative', width: '20%' }}>Approve</button>
    }

    return(
      /*
      <div className="container-fluid style={{borderColor: 'gray', height: 100}}">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div className="card-horizontal">
                <div class="left-half">
                  <div className="img-square-wrapper">
                    <img className="img-responsive img-thumbnail" src={reviewPic} alt="reviewPic" width="100" />
                  </div>
                </div>
                <div class="right-half">
                  <h2>{review.rheadline}</h2>
                  {renderStars}
                  {renderHalfStars}
                  {renderEmptyStars} {review.rstudent.stname}
                </div>
              </div>
              <div className="card-footer">
                <small className="text-muted">{review.rdescription}</small>
                <br/>
                {approveButton}  {rejectButton}
              </div>
            </div>
          </div>
        </div>
      </div>

      */


      <div className="single-company-result module ">
        <div className="row justify-content-between">
          <div className="col-lg-7">
            <div className="row justify-content-start">
              <div className="col-3 logo-and-ratings-wrap">
                <img className="img-responsive img-thumbnail" src={reviewPic} alt="reviewPic" width="300" />
                <h3>{review.rapproval}</h3>
              </div>
              <div className="col-9 pr-0">
                <h2>
                    {' '}
                    {review.rstudent.stname}
                    {' '}
                  <div>
                    <span>
                      {renderStars}
                      {renderHalfStars}
                      {renderEmptyStars}
                    </span>
                  </div>
                </h2>
                <div>
                  <p className="hqInfo adr m-0">
                    {review.rdescription}
                  </p>
                  <p className="webInfo mb-0 mt-xxsm">
                  <span>
                    {approveButton}  {rejectButton}
                  </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewCard;
