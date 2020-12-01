import React, { Component } from 'react';
import axios from 'axios';
import Pagination from '../../Pagination';

export default class CompanyPhotos extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      photos: this.props.cphotos,
      upload: false,
      files: [],
      pageIndex: 0
    };
    this.itemsPerPage = 6;
    this.numPages = Math.ceil((this.props.cphotos.length / this.itemsPerPage));
  }

  handleClick = () => {
    this.inputElement.click();
  }

  photoChangeHandler = (e) => {
    console.log(e.target.files);
    this.setState({ files: e.target.files, upload: true });
  }

  uploadPhotos = () => {
    const { files } = this.state;
    const data = new FormData();
    for (const file of files) { data.append('files', file); }
    data.append('cid', this.props.cid);
    data.append('cname', this.props.cname);
    data.append('stid', this.props.stid);
    data.append('stname', this.props.stname);

    const url = `${process.env.REACT_APP_BACKEND}/students/uploadCompanyPhotos`;
    axios
      .post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // then print response status
        console.log(res.data);
        this.setState({ photos: res.data, upload: false });
        this.props.updatePhotos(res.data);
        this.numPages = Math.ceil((res.data.length / this.itemsPerPage));
      });
  }

  setPage = (e) => {
    const { className } = e.currentTarget;
    const { pageIndex } = this.state;
    if (className === 'prev' && pageIndex > 0) {
      this.setState({ pageIndex: pageIndex - 1 });
    } else if (className === 'next' && pageIndex < this.numPages - 1) {
      this.setState({ pageIndex: pageIndex + 1 });
    } else if (className.includes('page')) {
      this.setState({ pageIndex: parseInt(e.currentTarget.getAttribute('pageIndex')) });
    }
  }

  render() {
    const { photos, upload, pageIndex } = this.state;
    const { cname } = this.props;
    const { itemsPerPage, numPages } = this;
    const numPhotos = photos.length;
    const numItems = numPages === pageIndex + 1 && numPhotos % itemsPerPage !== 0 ? numPhotos % itemsPerPage : itemsPerPage;
    return (
      <div id="companyPhotoContainer">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h1 style={{ fontWeight: 'bold' }}>{`${cname} Office Photos`}</h1>
          {/* <button className="btn btn-primary">Add Photos</button> */}
          <div id="EIHeaderFollowButton" />
          <input style={{ display: 'none' }} onChange={this.photoChangeHandler} type="file" name="files" multiple ref={(input) => this.inputElement = input} />
          {this.props.isAuth
            ? (
              <button onClick={upload ? this.uploadPhotos : this.handleClick} style={{ marginTop: '10px', marginRight: '5px', backgroundColor: `${upload ? 'green' : '#1861bf'}` }} className="gd-btn gd-btn-link gradient gd-btn-med gd-btn-icon padHorz addReview">
                <i className="btn-plus margRtSm" />
                <span>
                  {upload ? 'Upload' : 'Add'}
                  {' '}
                  Photos
                </span>
                <i className="hlpr" />
              </button>
            ) : null}
        </div>
        {[...Array(numItems)].map((e, i) => {
          return <img src={photos[i + (pageIndex * itemsPerPage)].url} />;
        })}
        <Pagination setPage={this.setPage} page={this.state.pageIndex} numPages={this.numPages} />
      </div>
    );
  }
}
