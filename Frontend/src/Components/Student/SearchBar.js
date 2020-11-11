import React, { Component } from 'react';
import searchIcon from '../../Static/Images/searchIcon.PNG';
import Profile from './StudentTabs';

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <input style={{position: 'relative', right: '160px', bottom: '24px', height: '40px', width: '400px'}} type="text" placeholder="Job Title, Keywords, or Company" name="search" />
                <select style={{position: 'relative', right: '170px', bottom: '24px', height: '40px', marginLeft: '20px'}} id="options">
                    <option value="Jobs">Jobs</option>
                    <option value="Companies">Companies</option>
                    <option value="Salaries">Salaries</option>
                    <option value="Interviews">Interviews</option>
                </select>
                <div>
                    <a style={{height: '40px', width: '90px', position: 'relative', left: '744px', marginLeft: '15px', bottom: '64px'}} className="btn btn-lg btn-success btn-block">Search</a>
                </div>
                <Profile style={{}}/>
            </div>
        )
    }
}
