import React, { Component } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

class AdminReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
      filterOptions: ['All', 'Pending', 'Approved', 'Rejected'],
      reviews: [],
    }
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
  }

  filterChangeHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      filter: event.target.value
    })
  }

  componentWillMount() {
    let url = `${process.env.REACT_APP_BACKEND}/admin/reviews/cid`;
    console.log('props adminreviews: ', this.props)
    const data = {
      cid: this.props.company._id,
      skip: 0,
      limit: 5,
      filter: this.state.filter,
    }
    axios.post(url, data)
      .then((response) => {
        console.log("Status Code : ",response.data);
        if(response.status === 200){
          let temp = JSON.parse(JSON.stringify(response.data));
          console.log('=>', temp)
          this.setState({
            reviews: [...temp]
          })
        }
      }).catch(err =>{
          console.log("No response")
      });
  }

  render() {
    const { company } = this.props;
    console.log('reviews page props: ', this.props)
    console.log('reviews page: ', company)
    return(
      <div>
        <div class="form-inline">
          <label for="ooption">Filter Reviews: </label>
          <select class="form-control" id="ooption" onChange = {this.filterChangeHandler}>>
            <option value = {this.state.filter}> Choose...</option>
            {this.state.filterOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div style={{ backgroundColor: 'white', width: '700px', height: 'auto', borderColor: 'gray', marginTop: '40px' }}>
          <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }} className="title css-1bqzjlu">
            { company.cname }
            's Reviews
          </h2>
            {this.state.reviews.map (review => (
              <div>
                <ReviewCard review = {review} />
              </div>
            ))}
        </div>
      </div>

    )
  }

}

export default AdminReviews;