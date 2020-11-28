import React, { Component } from 'react';
import axios from 'axios';

export default class CompanyPhotos extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      photos: this.props.cphotos,
      upload: false,
      files: []
    };
  }

  componentDidMount() {
    // const url = `${process.env.REACT_APP_BACKEND}/companies/specificCompany`;
    // const { cname } = this.props;
    // const { clocation } = this.props;

    // axios.post(url, { cname, clocation })
    //   .then((response) => {
    //     if (response.data) {
    //       this.setState({
    //         company: response.data,
    //       });
    //       const { company } = this.state;
    //       console.log(company);
    //     }
    //   });
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
        this.props.updatePhotos(res.data)
      });
  }

  render() {
    const { photos, upload } = this.state;
    const { cphotos, cname } = this.props;
    return (
      <div id="companyPhotoContainer">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '*px' }}>
          <h1 style={{ fontWeight: 'bold' }}>{`${cname} Office Photos`}</h1>
          {/* <button className="btn btn-primary">Add Photos</button> */}
          <div id="EIHeaderFollowButton" />
          <input style={{ display: 'none' }} onChange={this.photoChangeHandler} type="file" name="files" multiple ref={(input) => this.inputElement = input} />
          <button onClick={upload ? this.uploadPhotos : this.handleClick} style={{ marginTop: '10px', marginRight: '5px', backgroundColor: `${upload ? 'green' : '#1861bf'}` }} className="gd-btn gd-btn-link gradient gd-btn-med gd-btn-icon padHorz addReview">
            <i className="btn-plus margRtSm" />
            <span>
              {upload ? 'Upload' : 'Add'}
              {' '}
              Photos
            </span>
            <i className="hlpr" />
          </button>
        </div>
        {photos.map((photo) => {
          return <img src={photo.url} />;
        })}
      </div>
    );
  }
}
