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
    // const url = `${process.env.REACT_APP_BACKEND}/reviews/cid`;
    // const data = { cid: sessionStorage.getItem('cid') };
    // axios.post(url, data)
    //   .then((response) => {
    //     if (response.data) {
    //       console.log('Review response: ');
    //       console.log(response.data);
    //       console.log(response.data._id, '||||', response.data[0]._id);
    //       this.setState({
    //         reviews: response.data,
    //       });
    //     }
    //   });

    const url = `${
      process.env.REACT_APP_BACKEND
    }/companies/${sessionStorage.getItem('cid')}`;
    console.log('Inside for loop reviews feat');
    // const data = { cid: sessionStorage.getItem('cid') };
    axios.get(url)
      .then((response) => {
        if (response.data) {
          console.log('company response: ');
          console.log(response.data);
          // console.log(response.data._id, '||||', response.data[0]._id);
          this.setState({
            companydetails: response.data,
            cfeat: response.data.cfeatured,
          });

          for (let i = 0; i < this.state.cfeat.length; ++i) {
            const url = `${
              process.env.REACT_APP_BACKEND
            }/reviews/getFeatReviews?rid=${this.state.cfeat[i]}`;
            console.log('Inside for loop reviews feat');
            // const data = { cid: sessionStorage.getItem('cid') };
            axios.get(url)
              .then((res) => {
                if (res.data) {
                  console.log('Review response: ');
                  console.log(res.data);
                  // console.log(response.data._id, '||||', response.data[0]._id);
                  this.setState({
                    reviews: res.data,
                  });
                }
              });
          }
        }
      });

    // const cfeatdata = this.state.companydetails.cfeatured;
    console.log('cfeat', this.state.companydetails, this.state.cfeat);
    // for (let i = 0; i <= cfeatdata.length; ++i) {
    //   const url = `${
    //     process.env.REACT_APP_BACKEND
    //   }/reviews/getFeatReviews?rid=${cfeatdata[i]}`;
    //   console.log('Inside for loop reviews feat');
    //   // const data = { cid: sessionStorage.getItem('cid') };
    //   axios.get(url)
    //     .then((response) => {
    //       if (response.data) {
    //         console.log('Review response: ');
    //         console.log(response.data);
    //         console.log(response.data._id, '||||', response.data[0]._id);
    //         this.setState({
    //           reviews: response.data,
    //         });
    //       }
    //     });
    // }
    // console.log('this.props.cfeat len lebgth', cfeatdata.length, this.props.employer.cfeatured);
  }

  updateProfileEm = () => {
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
    const { cname, cemail } = this.state;
    const url = `${process.env.REACT_APP_BACKEND}/companies/updateProfile`;
    axios.post(url, { id, cname, cemail }).then((response) => {
      console.log(response);
    });
    this.props.updateProfileEm({ cname, cemail });
    this.setState({ open: false });
  };

  // <h1>Photos Added</h1>
  // {this.props.student.cphotos.map((photo) => {
  //   return <img className="student-img" src={photo.url} />;
  // })}

  render() {
    console.log('cfeat', this.state.cfeat);

    const details = this.state.reviews.map(
      ({ rheadline, rrecommended, rceoapprove, rdescription, rpros, rcons, rreply }) => {
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
                    <div style={{ marginBottom: '50px' }}>
                      <div>
                        <aside className="gd-ui-tooltip-info toolTip tooltip css-1xincmn" width="initial">
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
                    <p className="mb-0 mt-xsm strong ">Recommended to a Friend</p>
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
                  <p className="mb-0 mt-xsm strong ">Reply to review</p>
                  <p>{rreply}</p>
                </div>
                <hr style={{ width: '3000px', backgroundColor: 'black' }} />
              </div>
            </div>
          </div>
        );
      }
    );

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
        <div className="profileField">
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
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cname === '' ? 'Add Name' : cname}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cwebsite === '' ? 'Add Website' : cwebsite}
            </button>

            <button onClick={this.updateProfileEm} className="home-btn info">
              {clocation === '' ? 'Add location' : clocation}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cheadquarters === '' ? 'Add Headquarters' : cheadquarters}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cemail === '' ? 'Add email' : cemail}
            </button>

            {/* <button className="home-btn info">Add phone number</button> */}
          </div>
        </div>
        <div className="profileField">
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
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cceo === '' ? 'CEO' : cceo}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cfounded === '' ? 'Founded in' : cfounded}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cindustry === '' ? 'Industry' : cindustry}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {ctype === '' ? 'Add Type' : ctype}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {csize === '' ? 'Add Company Size' : csize}
            </button>
            <button onClick={this.updateProfileEm} className="home-btn info">
              {crevenue === '' ? 'Add Revenue' : crevenue}
            </button>
          </div>
        </div>
        <div className="profileField">
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
            <button onClick={this.updateProfileEm} className="home-btn info">
              {cmission === '' ? 'Mission of the Company' : cmission}
            </button>
          </div>
        </div>
        <div className="profileField">
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

            {
              details
            }
          </div>
        </div>
      </div>
    );
  }
}
