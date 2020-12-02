import React, { Component } from 'react';
import axios from 'axios';

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
            change: !this.state.change,
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
            change: !this.state.change,
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
      approveButton = <button onClick={this.approveReview} className="btn btn-success" style={{ position: 'relative', top: '22px', left: '75px' }}>Approve</button>
      rejectButton = <button onClick={this.rejectReview} className="btn btn-success" style={{ position: 'relative', top: '22px', left: '75px' }}>Reject</button>
    } else if (review.rapproval == 'Approved') {
      rejectButton = <button onClick={this.rejectReview} className="btn btn-sm btn-success btn-block" style={{ position: 'relative', top: '22px', left: '75px' }}>Reject</button>
    } else if(review.rapproval == 'Rejected') {
      approveButton = <button onClick={this.approveReview} className="btn btn-sm btn-success btn-block" style={{ position: 'relative', top: '22px', left: '75px' }}>Approve</button>
    }

    return(
      <div className="container-fluid style={{borderColor: 'gray', height: 100}}">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div className="card-horizontal">
                <div class="left-half">
                  <div className="img-square-wrapper">
                    <img className="img-responsive img-thumbnail" src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" width="100" />
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
    )
  }
}

export default ReviewCard;
