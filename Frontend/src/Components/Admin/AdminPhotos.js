import React, { Component } from 'react';
import axios from 'axios';
import PhotoCard from './PhotoCard';

class AdminPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'All',
      filterOptions: ['All', 'Pending', 'Approved', 'Rejected'],
      reviews: [],
      cphotos: [],
      cphotosFiltered: []
    }

    this.filterChangeHandler = this.filterChangeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      cphotos: [...this.props.company.cphotos],
      cphotosFiltered: [...this.props.company.cphotos],
    })
  }

  filterChangeHandler = (event) => {
    if(event.target.value !== 'All'){
      let photos = this.state.cphotos.filter((item) => item.approval === event.target.value)
      this.setState({
        cphotosFiltered: [...photos]
      })
    } else {
      this.setState({
        cphotosFiltered: [...this.state.cphotos],
      })
    }
  }

  render(){
    console.log('props: ', this.props);
    const {company} = this.props;
    return (
      <div>
        <div class="form-inline">
          <br/>
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
        <div id="companyPhotoContainer">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h1 style={{ fontWeight: 'bold' }}>{`${company.cname}'s Photos`}</h1>
            {/* <button className="btn btn-primary">Add Photos</button> */}
            <div id="EIHeaderFollowButton" />
          </div>
          { this.state.cphotosFiltered.map((photo) => (
              <PhotoCard photo={photo} cid={company._id} />
          ))}
        </div>
      </div>
    )
  }
}

export default AdminPhotos;