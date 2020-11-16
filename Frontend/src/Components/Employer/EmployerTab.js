import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Student extends Component {
  render() {
    return (
      <div id="studentTabs">

        <Link
          to="/employerJobs"
        >
          <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path
                fill="#DFF7E7"
                d="M10 29h4.465a1 1 0 01.832.445l1.11 1.664A2 2 0 0018.07 32h11.86a2 2 0 001.664-.89l1.11-1.665a1 1 0 01.831-.445H38v7H10v-7z"
              />
              <path
                fill="#0CAA41"
                d="M11 32v3a1 1 0 001 1h24a1 1 0 001-1v-3a1 1 0 012 0v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4a1 1 0 012 0zm5-18v-2a2 2 0 012-2h12a2 2 0 012 2v2h7a2 2 0 012 2v11a2 2 0 01-2 2h-5.465a1 1 0 00-.832.445l-1.11 1.664A2 2 0 0129.93 32H18.07a2 2 0 01-1.664-.89l-1.11-1.665a1 1 0 00-.831-.445H9a2 2 0 01-2-2V16a2 2 0 012-2h7zm2 0h12v-1a1 1 0 00-1-1H19a1 1 0 00-1 1v1zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h5.465a1 1 0 01.832.445l1.406 2.11a1 1 0 00.832.445h10.93a1 1 0 00.832-.445l1.406-2.11a1 1 0 01.832-.445H38a1 1 0 001-1v-9a1 1 0 00-1-1H10zm11 10h6a1 1 0 010 2h-6a1 1 0 010-2z"
              />
            </g>
          </svg>
          <h3 className="studentTabTitle">Jobs</h3>
        </Link>
        <Link
          to="/employerReviews"
        >
          <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path
                fill="#0CAA41"
                fillRule="nonzero"
                d="M19.182 10h19.636c1.205 0 2.182.895 2.182 2v27H17V12c0-1.105.977-2 2.182-2zM39 37V13a1 1 0 00-1-1H20a1 1 0 00-1 1v24h20z"
              />
              <path
                fill="#DFF7E7"
                fillRule="nonzero"
                d="M22 14h14a1 1 0 011 1v20h-4v-3a3 3 0 00-3-3h-2a3 3 0 00-3 3v3h-4V15a1 1 0 011-1z"
              />
              <path
                fill="#0CAA41"
                fillRule="nonzero"
                d="M16 19v2h-6a1 1 0 00-1 1v15h7v2H7V21c0-1.105.728-2 1.625-2H16z"
              />
              <rect width="4" height="4" x="23" y="16" fill="#0CAA41" rx="2" />
              <rect width="4" height="4" x="23" y="21" fill="#0CAA41" rx="2" />
              <rect width="4" height="4" x="31" y="16" fill="#0CAA41" rx="2" />
              <rect width="4" height="4" x="31" y="21" fill="#0CAA41" rx="2" />
              <path
                fill="#0CAA41"
                stroke="#0CAA41"
                strokeWidth="2"
                d="M27 38h4v-6a1 1 0 00-1-1h-2a1 1 0 00-1 1v6z"
              />
            </g>
          </svg>
          <h3 className="studentTabTitle">Reviews</h3>
        </Link>
        <Link
          to="/employerDemographics"
        >
          <svg style={{ width: '48px', height: '48px' }} viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path
                fill="#0CAA41"
                d="M12 36h24a2 2 0 01-2 2H14a2 2 0 01-2-2zm-2-4h28a2 2 0 01-2 2H12a2 2 0 01-2-2zM9 10h30a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V12a2 2 0 012-2zm5 2a5 5 0 01-5 5v6a5 5 0 015 5h20a5 5 0 015-5v-6a5 5 0 01-5-5H14zm10 12a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
              />
              <path
                fill="#DFF7E7"
                d="M15.71 14h16.58A7.015 7.015 0 0037 18.71v2.58A7.015 7.015 0 0032.29 26H15.71A7.015 7.015 0 0011 21.29v-2.58A7.015 7.015 0 0015.71 14zM24 24a4 4 0 100-8 4 4 0 000 8z"
              />
            </g>
          </svg>
          <h3 className="studentTabTitle">Demographics</h3>
        </Link>
      </div>
    );
  }
}
