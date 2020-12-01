import React from 'react';

export default function Pagination(props) {
  const { page, numPages, setPage } = props;
  return (
    <div id="FooterPageNav" className="pageNavBar tbl fill noMargBot" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="pagingControls cell middle">
        <ul>
          <li onClick={setPage} className="prev">
            {page === 0
              ? <span className="disabled"><i><span>Previous</span></i></span>
              : <a><i><span>Previous</span></i></a>}
          </li>
          {[...Array(numPages)].map((e, i) => {
            return i === page ? <li onClick={setPage} pageIndex={i} className="page current "><span className="disabled">{i + 1}</span></li>
              : <li onClick={setPage} pageIndex={i} className={`page ${numPages - 1 === i ? 'last' : ''}`}><a>{i + 1}</a></li>;
          })}
          <li onClick={setPage} className="next">
            {page === numPages - 1
              ? <span className="disabled"><i><span>Next</span></i></span>
              : <a><i><span>Next</span></i></a>}
          </li>
        </ul>
      </div>
    </div>
  );
}
