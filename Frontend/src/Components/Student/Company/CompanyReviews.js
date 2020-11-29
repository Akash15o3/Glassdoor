import React, { Component } from 'react';
import axios from 'axios';

export default class CompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallRating: Number,
      recommendedRating: Number,
      ceoRating: Number,
      reviewArr: [],
    };
  }

  componentDidMount() {
    let average = 0;
    let recommended = 0;
    let approve = 0;
    const { reviews } = this.props;
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
    average /= reviews.length;
    approve /= reviews.length;
    approve *= 100;
    reviews.sort((a, b) => b.rhelpful - a.rhelpful);

    console.log(reviews);
    this.setState({
      overallRating: average,
      recommendedRating: recommended,
      ceoRating: approve,
    });
  }

  render() {
    const { overallRating, recommendedRating, ceoRating } = this.state;
    const { company } = this.props;
    return (
      <div id="companyHomeContent" style={{ textAlign: 'left' }}>
        <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
          <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }} className="title css-1bqzjlu">
            {company.cname}
            's Reviews
          </h2>
          <div style={{ textAlign: 'center', fontSize: '22px', position: 'relative', top: '75px' }}>
            <span style={{ color: 'green' }}>{overallRating}</span>
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
            <div>Recommend to a Friend</div>
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
            <div>Approve of CEO</div>
          </div>
          <hr style={{ width: '3000px', backgroundColor: 'black' }} />
          <div>
            <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" style={{ float: 'left' }} /></span></div>
            <div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2><a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">"Customer service"</a></h2>
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
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">Bill Jones - Customer</span>
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
                    <p>Yes</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>No</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>Worked for a few years.</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>Got free fries.</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>I worked at McDonald's full-time it was terrible and i hated it alot it was rlly bad.</p>
                  <button className="gd-ui-button  css-glrvaa">Helpful</button>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div>
            <div>
              <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" style={{ float: 'left' }} /></span></div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2><a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">"Customer service"</a></h2>
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
                      <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">Bill Jones - Customer</span>
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
                    <p>Yes</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>No</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>Worked for a few years.</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>Got free fries.</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>I worked at McDonald's full-time it was terrible and i hated it alot it was rlly bad.</p>
                  <button className="gd-ui-button  css-glrvaa">Helpful</button>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
