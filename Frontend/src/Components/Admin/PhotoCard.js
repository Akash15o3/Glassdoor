import React, { Component } from 'react';
import axios from 'axios';

class PhotoCard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      change: false,
    }

    this.approvePhoto = this.approvePhoto.bind(this);
    this.rejectPhoto = this.rejectPhoto.bind(this);
  }

  approvePhoto = (event) => {
    const { photo, cid } = this.props;
    let url = `${process.env.REACT_APP_BACKEND}/admin/photo/approve`;
    const data = {
      cid,
      pid: photo._id,
    }
    axios.put(url, data)
      .then((response) => {
        console.log("Status Code : ", response.data);
        if(response.status === 200){
          this.setState({
            change: !this.state.change,
          })
        }
      }).catch(err =>{
          console.log("No response")
      });
  }

  rejectPhoto = (event) => {
    const { photo, cid } = this.props;
    let url = `${process.env.REACT_APP_BACKEND}/admin/photo/reject`;
    const data = {
      cid,
      pid: photo._id,
    }
    axios.put(url, data)
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
    const { photo } = this.props;
    console.log('review props', this.props)

    let approveButton = null;
    let rejectButton = null;
    if(photo.approval == 'Pending') {
      approveButton = <button onClick={this.approvePhoto} className="btn btn-success" style={{ width: 100, position: 'relative' }}>Approve</button>
      rejectButton = <button onClick={this.rejectPhoto} className="btn btn-success" style={{ width: 100, position: 'relative' }}>Reject</button>
    } else if (photo.approval == 'Approved') {
      rejectButton = <button onClick={this.rejectPhoto} className="btn btn-sm btn-success btn-block" style={{ width: 100, position: 'relative' }}>Reject</button>
    } else if(photo.approval == 'Rejected') {
      approveButton = <button onClick={this.approvePhoto} className="btn btn-sm btn-success btn-block" style={{ width: 100, position: 'relative' }}>Approve</button>
    }

    if(this.state.change == true)
      alert('Updated photo')


    return(
      <React.Fragment>
          <img src={photo.url} alt="cphoto" />
          <br/>
          {approveButton} {rejectButton}
          <br/>
          <br/>
          <br/>
      </React.Fragment>
     
    )
  }
}

export default PhotoCard;
