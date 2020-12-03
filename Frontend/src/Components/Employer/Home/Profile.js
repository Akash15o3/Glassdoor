import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { cname, cemail } = this.props.employer;
    this.state = {
      open: false,
      cname,
      cwebsite: '',
      csize: '',
      ctype: '',
      crevenue: '',
      cheadquarters: '',
      cindustry: '',
      cfounded: '',
      cmission: '',
      cceo: '',
      clocation: '',
      cemail,
      reviews: [],
      companydetails: [],
      cfeat: [],
    };
    sessionStorage.setItem('cname', cname);
  }

  componentWillMount() {
    const url = `${
      process.env.REACT_APP_BACKEND
    }/companies/${sessionStorage.getItem('cid')}`;
    console.log('Inside for loop reviews feat');
    // const data = { cid: sessionStorage.getItem('cid') };
    axios
      .get(url)
      .then((response) => {
        if (response.data) {
          console.log('company response: ');
          console.log(response.data);

          const cfeatarray = [...response.data.cfeatured];
          this.setState({
            companydetails: response.data,
          });
          const promiseArray = cfeatarray.map((dataarr) => axios.get(
            `${process.env.REACT_APP_BACKEND}/reviews/getFeatReviews?rid=${dataarr}`
          ));

          Promise.all(promiseArray)
            .then((results) => {
              // let responses = results.filter(entry =>
              //   entry.status === 200
              // )
              const responses = results;

              const restaurants = [];
              responses.forEach((response) => {
                restaurants.push(response.data);
              });
              if (restaurants.length > 0) {
                this.setState({
                  reviews: restaurants,
                });
              }
            })
            .catch(console.log);
        }
      })
      .catch((err) => {
        console.log('No response');
      });
  }

  openModal = () => {
    this.setState({ open: true });
  };

  closeWithoutSaving = () => {
    const { cname, cemail } = this.props.employer;
    this.setState({ cname, cemail, open: false });
  };

  nameChangeHandler = (e) => {
    this.setState({
      cname: e.target.value,
    });
  };

  websiteChangeHandler = (e) => {
    this.setState({
      cwebsite: e.target.value,
    });
  };

  locationChangeHandler = (e) => {
    this.setState({
      clocation: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      cemail: e.target.value,
    });
  };

  sizeChangeHandler = (e) => {
    this.setState({
      csize: e.target.value,
    });
  };

  typeChangeHandler = (e) => {
    this.setState({
      ctype: e.target.value,
    });
  };

  revenueChangeHandler = (e) => {
    this.setState({
      crevenue: e.target.value,
    });
  };

  headquartersChangeHandler = (e) => {
    this.setState({
      cheadquarters: e.target.value,
    });
  };

  industryChangeHandler = (e) => {
    this.setState({
      cindustry: e.target.value,
    });
  };

  foundedChangeHandler = (e) => {
    this.setState({
      cfounded: e.target.value,
    });
  };

  missionChangeHandler = (e) => {
    this.setState({
      cmission: e.target.value,
    });
  };

  ceoChangeHandler = (e) => {
    this.setState({
      cceo: e.target.value,
    });
  };

  saveUpdates = () => {
    const { id } = this.props;
    const {
      cname,
      cemail,
      cceo,
      csize,
      ctype,
      crevenue,
      cheadquarters,
      cindustry,
      cfounded,
      cmission,
      clocation,
      cwebsite,
    } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/companies/updateProfile`;
    const data = {
      id,
      cwebsite: this.state.cwebsite,
      csize: this.state.csize,
      ctype: this.state.ctype,
      crevenue: this.state.crevenue,
      cheadquarters: this.state.cheadquarters,
      cindustry: this.state.cindustry,
      cfounded: this.state.cfounded,
      cmission: this.state.cmission,
      cceo: this.state.cceo,
      clocation: this.state.clocation,
      cemail,
    };
    axios.post(url, data).then((response) => {
      if (response) {
        const url1 = `${
          process.env.REACT_APP_BACKEND
        }/companies/${sessionStorage.getItem('cid')}`;
        console.log('Inside for loop reviews feat');
        // const data = { cid: sessionStorage.getItem('cid') };
        axios
          .get(url1)
          .then((response) => {
            if (response.data) {
              console.log('company response: ');
              console.log(response.data);

              const cfeatarray = [...response.data.cfeatured];
              this.setState({
                companydetails: response.data,
              });
              const promiseArray = cfeatarray.map((dataarr) => axios.get(
                `${process.env.REACT_APP_BACKEND}/reviews/getFeatReviews?rid=${dataarr}`
              ));

              Promise.all(promiseArray)
                .then((results) => {
                  // let responses = results.filter(entry =>
                  //   entry.status === 200
                  // )
                  const responses = results;

                  const restaurants = [];
                  responses.forEach((response) => {
                    restaurants.push(response.data);
                  });
                  if (restaurants.length > 0) {
                    this.setState({
                      reviews: restaurants,
                    });
                  }
                })
                .catch(console.log);
            }
          })
          .catch((err) => {
            console.log('No response');
          });
      }
      console.log(response);
    });
    this.props.updateProfileEm({
      cname,
      cemail,
      cceo,
      cwebsite,
      csize,
      ctype,
      crevenue,
      cheadquarters,
      cindustry,
      cfounded,
      cmission,
      clocation,
    });
    this.setState({ open: false });

    // const url1 = `${
    //   process.env.REACT_APP_BACKEND
    // }/companies/${sessionStorage.getItem("cid")}`;
    // console.log("Inside for loop reviews feat");
    // // const data = { cid: sessionStorage.getItem('cid') };
    // axios
    //   .get(url1)
    //   .then((response) => {
    //     if (response.data) {
    //       console.log("company response: ");
    //       console.log(response.data);

    //       const cfeatarray = [...response.data.cfeatured];
    //       this.setState({
    //         companydetails: response.data,
    //       });
    //       const promiseArray = cfeatarray.map((dataarr) =>
    //         axios.get(
    //           `${process.env.REACT_APP_BACKEND}/reviews/getFeatReviews?rid=${dataarr}`
    //         )
    //       );

    //       Promise.all(promiseArray)
    //         .then((results) => {
    //           // let responses = results.filter(entry =>
    //           //   entry.status === 200
    //           // )
    //           const responses = results;

    //           const restaurants = [];
    //           responses.forEach((response) => {
    //             restaurants.push(response.data);
    //           });
    //           if (restaurants.length > 0) {
    //             this.setState({
    //               reviews: restaurants,
    //             });
    //           }
    //         })
    //         .catch(console.log);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("No response");
    //   });
  };

  // <h1>Photos Added</h1>
  // {this.props.student.cphotos.map((photo) => {
  //   return <img className="student-img" src={photo.url} />;
  // })}

  render() {
    console.log('all reviews using promise', this.state.reviews);
    const { reviews } = this.state;
    const details = reviews.map(
      ({
        rheadline,
        rrecommended,
        rceoapprove,
        rdescription,
        rpros,
        rcons,
        rreply,
      }) => {
        return (
          <div>
            <div>
              <div>
                <div style={{ marginLeft: '50px' }}>
                  <h2>
                    {/* <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm"> */}
                    "
                    {rheadline}
                    "
                    {/* </a> */}
                  </h2>
                  <div>
                    <div>
                      <div>
                        <aside
                          className="gd-ui-tooltip-info toolTip tooltip css-1xincmn"
                          width="initial"
                        >
                          <div className="tooltipContainer">
                            <span className="pointer" />
                            <div className="content">
                              <ul className="pl-0" />
                            </div>
                          </div>
                        </aside>
                      </div>
                      {/* <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{firstReview.rwriter}</span> */}
                    </div>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <p className="mb-0 mt-xsm strong ">
                      Recommended to a Friend
                    </p>
                    <p>{rrecommended}</p>
                  </div>
                  <div style={{ display: 'inline-block', marginLeft: '50px' }}>
                    <p className="mb-0 mt-xsm strong ">CEO Approval</p>
                    <p>{rceoapprove}</p>
                  </div>
                  <p className="mb-0 mt-xsm strong ">Description</p>
                  <p>{rdescription}</p>
                  <p className="mb-0 mt-xsm strong ">Pros</p>
                  <p>{rpros}</p>
                  <p className="mb-0 mt-xsm strong ">Cons</p>
                  <p>{rcons}</p>
                </div>
                <hr style={{ backgroundColor: 'black' }} />
              </div>
            </div>
          </div>
        );
      }
    );
    console.log('*****ALL FEAT REVIEWS*****');
    const templist = [];
    templist.push(this.state.reviews);
    console.log(templist[0]);
    const {
      cname,
      cwebsite,
      clocation,
      cemail,
      csize,
      cceo,
      cfounded,
      cheadquarters,
      cindustry,
      cmission,
      crevenue,
      ctype,
    } = this.state;
    return (
      <div className="studentHomeContent">
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.closeWithoutSaving}
          style={{
            content: {
              width: '55%',
              margin: 'auto',
              border: '2px solid black',
            },
          }}
        >
          <span
            alt="Close"
            className="SVGInline modal_closeIcon"
            onClick={this.closeWithoutSaving}
          >
            <svg
              className="SVGInline-svg modal_closeIcon-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z"
                fill="gray"
                fillRule="evenodd"
              />
            </svg>
          </span>
          <h1 style={{ textAlign: 'center' }}>Company Information</h1>
          <label className="modalLabel"> Name</label>
          <input
            onChange={this.nameChangeHandler}
            value={cname}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Location</label>
          <input
            onChange={this.locationChangeHandler}
            value={clocation}
            className="modalInput"
          />
          <label className="modalLabel">Email Address</label>
          <input
            onChange={this.emailChangeHandler}
            value={cemail}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> Website</label>
          <input
            onChange={this.websiteChangeHandler}
            value={cwebsite}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Company Size</label>
          <input
            onChange={this.sizeChangeHandler}
            value={csize}
            className="modalInput"
          />
          <label className="modalLabel">Company Type</label>
          <input
            onChange={this.typeChangeHandler}
            value={ctype}
            className="modalInput"
          />
          <label className="modalLabel">Revenue</label>
          <input
            onChange={this.revenueChangeHandler}
            value={crevenue}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> Headquarters</label>
          <input
            onChange={this.headquartersChangeHandler}
            value={cheadquarters}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Industry</label>
          <input
            onChange={this.industryChangeHandler}
            value={cindustry}
            className="modalInput"
          />
          <label className="modalLabel">Founded </label>
          <input
            onChange={this.foundedChangeHandler}
            value={cfounded}
            type="email"
            name="email"
            className="modalInput"
          />
          <label className="modalLabel"> CEO</label>
          <input
            onChange={this.ceoChangeHandler}
            value={cceo}
            type="username"
            name="name"
            className="modalInput"
          />
          <label className="modalLabel">Mission</label>
          <input
            onChange={this.missionChangeHandler}
            value={cmission}
            className="modalInput"
          />
          <button className="save" onClick={this.saveUpdates}>
            Save
          </button>
        </Modal>
        <div className="jobProfileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>Info</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cname === ''
                ? 'Add Name'
                : this.state.companydetails.cname}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cwebsite === ''
                ? 'Add Website'
                : this.state.companydetails.cwebsite}
            </button>

            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.clocation === ''
                ? 'Add location'
                : this.state.companydetails.clocation}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cheadquarters === ''
                ? 'Add Headquarters'
                : this.state.companydetails.cheadquarters}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cemail === '' ? 'Add email' : cemail}
            </button>

            {/* <button className="home-btn info">Add phone number</button> */}
          </div>
        </div>
        <div className="jobProfileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>About Company</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cceo === ''
                ? 'CEO'
                : this.state.companydetails.cceo}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cfounded === ''
                ? 'Founded in'
                : this.state.companydetails.cfounded}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cindustry === ''
                ? 'Industry'
                : this.state.companydetails.cindustry}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.ctype === ''
                ? 'Add Type'
                : this.state.companydetails.ctype}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.csize === ''
                ? 'Add Company Size'
                : this.state.companydetails.csize}
            </button>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.crevenue === ''
                ? 'Add Revenue'
                : this.state.companydetails.crevenue}
            </button>
          </div>
        </div>
        <div className="jobProfileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>Mission</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={this.openModal} className="home-btn info">
              {this.state.companydetails.cmission === ''
                ? 'Mission of the Company'
                : this.state.companydetails.cmission}
            </button>
          </div>
        </div>
        <div className="jobProfileField">
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ display: 'inline-block' }}>Featured Reviews</h1>
            <svg
              className="SVGInline-svg"
              style={{ width: '24px', height: '24px', marginLeft: '5px' }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd">
                <path
                  id="prefix__icon-edit"
                  d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                />
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p>{details}</p>
            {
              // this.state.reviews.map(
              //   ({ rheadline, rrecommended, rceoapprove, rdescription, rpros, rcons, rreply }) => {
              //     return (
              //       <div>
              //         <div>
              //           <div>
              //             <div style={{ marginLeft: '50px' }}>
              //               <h2>
              //                 {/* <a href="/Reviews/Employee-Review-McDonald-s-RVW37932869.htm"> */}
              //                 "
              //                 {rheadline}
              //                 "
              //                 {/* </a> */}
              //               </h2>
              //               <div>
              //                 <div style={{ marginBottom: '50px' }}>
              //                   <div>
              //                     <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
              //                       <div className="tooltipContainer">
              //                         <span className="pointer" />
              //                         <div className="content">
              //                           <ul className="pl-0" />
              //                         </div>
              //                       </div>
              //                     </aside>
              //                   </div>
              //                   {/* <span className="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">{firstReview.rwriter}</span> */}
              //                 </div>
              //               </div>
              //               <div style={{ display: 'inline-block' }}>
              //                 <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
              //                 <p>{rrecommended}</p>
              //               </div>
              //               <div style={{ display: 'inline-block', marginLeft: '50px' }}>
              //                 <p className="mb-0 mt-xsm strong ">CEO Approval</p>
              //                 <p>{rceoapprove}</p>
              //               </div>
              //               <p className="mb-0 mt-xsm strong ">Description</p>
              //               <p>{rdescription}</p>
              //               <p className="mb-0 mt-xsm strong ">Pros</p>
              //               <p>{rpros}</p>
              //               <p className="mb-0 mt-xsm strong ">Cons</p>
              //               <p>{rcons}</p>
              //               <p className="mb-0 mt-xsm strong ">Reply to review</p>
              //               <p>{rreply}</p>
              //             </div>
              //             <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              //           </div>
              //         </div>
              //       </div>
              //     );
              //   }
              // )
            }
          </div>
        </div>
      </div>
    );
  }
}
