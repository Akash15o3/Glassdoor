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
            {company.cdescription}
            In 1955, an enterprising salesman named Ray Kroc discovered a small burger restaurant in California, and wrote the first page of McDonald’s® history. In 1967, the first McDonald’s Canada opened in Richmond, B.C. We’ve been growing with our communities and serving quality food at great value ever since. Today, McDonald’s Canada is proud to be one of the world’s leading foodservice retailers. From coast to coast, we serve delicious choices to more than 2.5 million people in over 1,400 locations every day. We’re also more than just your local restaurant. We’re hardworking small-business men and women, students working part-time, seniors getting the most out of life, and volunteers lending time to make a difference in the communities we live and work in.
            <br />
            <br />
            <br />
          </span>
        </div>
      </div>
    </div>
  );
}
