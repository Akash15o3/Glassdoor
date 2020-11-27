import React from 'react';

export default function CompanyOverview(props) {
  const { company } = props;
  return (
    <div id="companyHomeContent">
      <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
        <h2 style={{ marginLeft: '45px' }}>
          { company.cname }
          's Overview
        </h2>
        <ul style={{ listStyleType: 'none' }}>
          <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-xxsm">
            <b><label className="css-1f0lhlt ecl3kjh0">Website:</label></b>
            <div><a href="//www.mcdonalds.com" target="_blank" rel="noopener noreferrer" className="css-1hg9omi">{ company.cwebsite }</a></div>
          </li>
          <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
            <b><label>Headquarters:</label></b>
            <div>{ company.clocation }</div>
          </li>
          <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
            <b><label>Size:</label></b>
            <div>
              { company.csize }
              {' '}
              Employees
            </div>
          </li>
          <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pl-sm-xxsm">
            <b><label>Founded:</label></b>
            <div>{ company.cfounded }</div>
          </li>
          <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
            <b><label className="css-1f0lhlt ecl3kjh0">Type:</label></b>
            <div>{ company.ctype }</div>
          </li>
          <li className="d-flex align-items-center col-12 col-sm-6 p-0 m-0 pb-sm pr-sm-xxsm">
            <b><label>Revenue:</label></b>
            <div>
              $
              {company.crevenue}
            </div>
          </li>
        </ul>
        <div style={{ marginLeft: '20px', marginRight: '20px' }}>
          <span>
            In 1955, an enterprising salesman named Ray Kroc discovered a small burger restaurant in California, and wrote the first page of McDonald’s® history. In 1967, the first McDonald’s Canada opened in Richmond, B.C. We’ve been growing with our communities and serving quality food at great value ever since. Today, McDonald’s Canada is proud to be one of the world’s leading foodservice retailers. From coast to coast, we serve delicious choices to more than 2.5 million people in over 1,400 locations every day. We’re also more than just your local restaurant. We’re hardworking small-business men and women, students working part-time, seniors getting the most out of life, and volunteers lending time to make a difference in the communities we live and work in.
            <br />
            <br />
            <br />
          </span>
        </div>
      </div>
      <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginLeft: '223px', marginTop: '40px' }}>
        <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }} className="title css-1bqzjlu">
          { company.cname }
          's Reviews
        </h2>
        <div style={{ textAlign: 'center', fontSize: '22px', position: 'relative', top: '75px' }}>
          <span style={{ color: 'green' }}>2.5</span>
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
              strokeDasharray="60, 100"
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>60%</text>
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
              strokeDasharray="60, 100"
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x={18} y="20.35" className="percentage" style={{ backgroundColor: 'green' }}>60%</text>
          </svg>
          <div>Approve of CEO</div>
        </div>
        <hr style={{ width: '3000px', backgroundColor: 'black' }} />
        <div>
          <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" /></span></div>
          <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
            <div>
              <h2><a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">"Customer service"</a></h2>
              <div>
                <div>
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
              <p>I worked at McDonald's full-time it was terrible and i hated it alot it was rlly bad.</p>
            </div>
            <hr style={{ width: '3000px', backgroundColor: 'black' }} />
          </div>
          <div>
            <div style={{ marginLeft: '20px' }}><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" /></span></div>
            <div>
              <div style={{ marginLeft: '20px' }}>
                <h2><a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm">"Customer service"</a></h2>
                <div>
                  <div>
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
                <p>I worked at McDonald's full-time it was terrible and i hated it alot it was rlly bad.</p>
              </div>
              <hr style={{ width: '3000px', backgroundColor: 'black' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
