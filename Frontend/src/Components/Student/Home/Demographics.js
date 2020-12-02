import React, { Component } from 'react';
import axios from 'axios';

export default class Demographics extends Component {
  constructor(props) {
    super(props);
    const { race_ethnicity, gender, disability, veteran } = this.props.stdemographics;
    this.state = {
      race_ethnicity,
      gender,
      disability,
      veteran
    };
  }

  raceEthnicityChangeHandler = (e) => {
    const race_ethnicity = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateDemographics`;
    axios.post(url, { race_ethnicity, key: 'race_ethnicity', id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stdemographics: res.data });
      });
    this.setState({ race_ethnicity });
  }

  genderChangeHandler = (e) => {
    const gender = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateDemographics`;
    axios.post(url, { gender, key: 'gender', id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stdemographics: res.data });
      });
    this.setState({ gender });
  }

  disabilityChangeHandler = (e) => {
    const disability = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateDemographics`;
    axios.post(url, { disability, key: 'disability', id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stdemographics: res.data });
      });
    this.setState({ disability });
  }

  veteranChangeHandler = (e) => {
    const veteran = e.target.value;
    const url = `${process.env.REACT_APP_BACKEND}/students/updateDemographics`;
    axios.post(url, { veteran, key: 'veteran', id: this.props.id })
      .then((res) => { // then print response status
        console.log(res.data);
        this.props.updateStudent({ stdemographics: res.data });
      });
    this.setState({ veteran });
  }

  render() {
    const { race_ethnicity, gender, disability, veteran } = this.state;
    return (
      <div className="studentHomeContent">
        <h1 style={{ borderBottom: '1px solid gray', paddingBottom: '20px', fontWeight: 'bold' }}>Demographics</h1>
        <h2 style={{ fontWeight: 'bold' }}>Help End Inequality</h2>
        <p>Shine a light on inequities in the workplace. Anonymously share your demographics to help pinpoint pay and diversity disparities.</p>

        <h3 style={{ fontWeight: 'bold' }}>Race/Ethnicity</h3>
        <select style={{ width: '15%', margin: 'auto' }} value={race_ethnicity} onChange={this.raceEthnicityChangeHandler}>
          <option value="Refuse to disclose">Refuse to disclose</option>
          <option value="American Indians">American Indians</option>
          <option value="Alaska Native">Alaska Native</option>
          <option value="Asian">Asian</option>
          <option value="Black or African American">Black or African American</option>
          <option value="Native Hawaiian">Native Hawaiian</option>
          <option value="Other Pacific Islander">Other Pacific Islander</option>
          <option value="White">White</option>
        </select>

        <h3 style={{ fontWeight: 'bold' }}>Gender</h3>
        <select style={{ width: '15%', margin: 'auto' }} value={gender} onChange={this.genderChangeHandler}>
          <option value="Refuse to disclose">Refuse to disclose</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
        </select>

        <h3 style={{ fontWeight: 'bold' }}>Disability</h3>
        <select style={{ width: '15%', margin: 'auto' }} value={disability} onChange={this.disabilityChangeHandler}>
          <option value="Refuse to disclose">Refuse to disclose</option>
          <option value="Disabled">Disabled</option>
          <option value="Not Disabled">Not Disabled</option>
        </select>

        <h3 style={{ fontWeight: 'bold' }}>Veteran Status</h3>
        <select style={{ width: '15%', margin: 'auto' }} value={veteran} onChange={this.veteranChangeHandler}>
          <option value="Refuse to disclose">Refuse to disclose</option>
          <option value="Protected Veteran">Protected Veteran</option>
          <option value="Not a Veteran">Not a Veteran</option>
        </select>
      </div>
    );
  }
}
