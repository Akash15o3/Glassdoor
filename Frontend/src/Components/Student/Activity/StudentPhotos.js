import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Pagination';

class StudentPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
    this.itemsPerPage = 6;
    this.numPages = Math.ceil((this.props.photos.length / this.itemsPerPage));
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
    const { photos, name } = this.props;
    const { pageIndex } = this.state;
    const { itemsPerPage, numPages } = this;
    const numPhotos = photos.length;
    const numItems = numPages === pageIndex + 1 && numPhotos % itemsPerPage !== 0 ? numPhotos % itemsPerPage : itemsPerPage;
    return (
      <div id="companyPhotoContainer">
        <h1 style={{ textAlign: 'center' }}>{`${name}'s Photos`}</h1>
        {[...Array(numItems)].map((e, i) => {
          return <img className="student-img" src={photos[i + (pageIndex * itemsPerPage)].url} />;
        })}
        <Pagination setPage={this.setPage} page={pageIndex} numPages={numPages} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.student.user.stname,
    photos: state.student.user.cphotos,
  };
};

export default connect(mapStateToProps)(StudentPhotos);
