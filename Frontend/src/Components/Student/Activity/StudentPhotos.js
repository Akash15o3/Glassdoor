// import React, { Component } from 'react';

// class StudentPhotos extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pageIndex: 0
//     };
//     this.itemsPerPage = 6;
//     this.numPages = (this.props.photos / this.itemsPerPage) + 1;
//   }

//   render() {
//     const { photos, name } = this.props;
//     const numPhotos = photos.length;
//     return (
//       <div id="companyPhotoContainer">
//         <h1>{`${name}'s Photos`}</h1>
//         {[...Array(this.itemsPerPage)].map((e, i) => {
//           const index = i + (pageIndex * itemsPerPage);
//           if (index >= numPhotos) return;
//           return <img src={photos[i + (pageIndex * itemsPerPage)].url} />;
//         })}
//         <Pagination setPage={this.setPage} page={this.state.pageIndex} numPages={this.numPages} />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     name: state.student.user.stname,
//     photos: state.student.user.cphotos,
//   };
// };

// export default connect(mapStateToProps)(StudentPhotos);
