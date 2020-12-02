import React, { Component } from 'react';
import axios from 'axios';

export default class Resume extends Component {
  constructor(props) {
    super(props);
    const { stresumes } = this.props.student;
    this.state = {
      stresumes
    };
  }

  selectResume = () => {
    this.inputElement.click();
  }

  resumeChangeHandler = (e) => {
    console.log(e.target.files[0]);
    // this.setState({ selectedFile: e.target.files[0], upload: true });
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('id', this.props.id);
    const url = `${process.env.REACT_APP_BACKEND}/students/uploadResume`;
    axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      } })
      .then((res) => { // then print response status
        console.log(res.data);
        this.setState({ stresumes: res.data });
        this.props.updateStudent({ stresumes: res.data });
      });
  }

  render() {
    const { stresumes } = this.state;
    return (
      <div className="studentHomeContent">
        <div style={{ paddingBottom: '5px', borderBottom: '1px solid gray', position: 'relative', left: '50px' }}>
          <h1 style={{ display: 'inline-block', marginRight: '5px' }}>Manage Resumes</h1>
          <button onClick={this.selectResume} style={{ fontSize: '28px' }} className="home-btn info">+</button>
          <input onChange={this.resumeChangeHandler} type="file" style={{ display: 'none' }} ref={(input) => this.inputElement = input} />
        </div>
        <ul style={{ listStyle: 'none' }}>
          {stresumes.map((resume, i) => {
            return <li><a target="_blank" href={resume.stresume}>{`Resume #${i + 1}`}</a></li>;
          })}
          {/* <li><a>Resume 1</a></li>
          <li><a>Resume 2</a></li>
          <li><a>Resume 3</a></li>
          <li><a>Resume 4</a></li> */}
        </ul>
      </div>

    );
  }
}
