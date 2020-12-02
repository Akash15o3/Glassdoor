import React, { Component } from 'react';
import axios from 'axios';

export default class Resume extends Component {
  constructor(props) {
    super(props);
    const { stresumes } = this.props.student;
    const checkedIndex = stresumes.findIndex((resume) => resume.stselect === 'Primary');
    this.state = {
      stresumes,
      checkedIndex
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

  selectPrimaryResume = (e) => {
    const checkedIndex = parseInt(e.target.value);
    console.log(typeof (checkedIndex));
    const { stresumes } = this.state;
    if (stresumes[checkedIndex].stselect === 'Primary') stresumes[checkedIndex].stselect = '';
    else {
      stresumes.forEach((resume, i) => {
        if (i === checkedIndex) resume.stselect = 'Primary';
        else resume.stselect = '';
      });
    }
    const url = `${process.env.REACT_APP_BACKEND}/students/updateProfile`;
    axios.post(url, { id: this.props.id, stresumes })
      .then((response) => {
        console.log(response);
      });
    this.props.updateStudent({ stresumes });
    this.setState({ stresumes, checkedIndex });
  }

  deleteResume = (e) => {
    const deleteIndex = parseInt(e.target.getAttribute('index'));
    const { stresumes } = this.state;
    stresumes.splice(deleteIndex, 1);
    const url = `${process.env.REACT_APP_BACKEND}/students/updateProfile`;
    axios.post(url, { id: this.props.id, stresumes })
      .then((response) => {
        console.log(response);
      });
    this.props.updateStudent({ stresumes });
    this.setState({ stresumes });
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
        <table>
          <tr>
            <th>Resume</th>
            <th>Primary</th>
            <th>Delete</th>
          </tr>
          {stresumes.map((resume, i) => {
            return (
              <tr>
                <td>
                  <a style={{ fontWeight: `${resume.stselect === 'Primary' ? 'bold' : ''}` }} target="_blank" href={resume.stresume}>{`Resume #${i + 1}`}</a>
                </td>
                <td>
                  <input onClick={this.selectPrimaryResume} type="checkbox" value={i} checked={resume.stselect === 'Primary'} />
                </td>
                <td>
                  <button onClick={this.deleteResume} index={i} type="button" className="btn btn-danger">X</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

    );
  }
}
