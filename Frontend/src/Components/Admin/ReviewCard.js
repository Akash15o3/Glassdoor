import React, { Component } from 'react';
import axios from 'axios';


export default function ReviewCard(props) {
  const { review } = props;

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
  })
  let renderHalfStars = halfStar === true ? <span className="fa fa-star-half-o" /> : null;
  let renderEmptyStars = emptyStarsRange.map((number) => {
    return (
      <span className="fa fa-star" />
    )
  })

  return(
    <div>
      <div><span><img src="https://media.glassdoor.com/sql/432/mcdonald-s-squarelogo-1585239308674.png" alt="McDonald's icon" /></span></div>
        <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
          <div>
            <h2>{review.rheadline}</h2>
            <div>
              <div>
                <div>
                  {renderStars}
                  {renderHalfStars}
                  {renderEmptyStars}
                  <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
                    <div className="tooltipContainer">
                      <span className="pointer" />
                      <div className="content">
                        <ul className="pl-0" />
                      </div>
                  </div>
                </aside>
              </div>
              <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{review.rstudent.stname}</span>
            </div>
          </div>
          <p>{review.rdescription}</p>
        </div>
        <hr style={{ width: '3000px', backgroundColor: 'black' }} />
      </div>
    </div>
  )
}