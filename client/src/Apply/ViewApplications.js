import React, { Component } from 'react';
import axios from 'axios';
import './ViewApplications.css';

export default class ViewApplications extends Component {

  constructor(props){
    super(props);

    this.state  = {
      userName: this.props.userName,
      applications: []
    };

    this.getApplications = this.getApplications.bind(this);
    this.printApplications = this.printApplications.bind(this);
    this.getApplications();
  }

  getApplications() {
    axios.get(`/applications/list?userName=${this.props.userName}`)
      .then(res => {
        console.log(res);
        this.applications = res.data;
        this.setState({
          applications: res.data
        });

      })
      .catch(err => {
        console.log(err);
      })
  }

  printRows() {
    let hostname = window.location.hostname;
    let rows = this.state.applications.map((application,appId) => {
      return (
        <tr key={appId}>
          <td>{ application.jobTitle }</td>
          <td>{ application.companyName }</td>
          <td>{ new Date(application.createdAt).toLocaleString() }</td>
          <td><a href={ "http://" + hostname + ":5000" + application.resume }>View</a></td>
        </tr>
      )
    })
    return rows;
  }

  printApplications() {
    return (
      <table className="table">
      <tbody>
        <tr>
          <th>Company name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Resume</th>
        </tr>
        { this.printRows() }
      </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className="container">
        <h1>My Applications</h1><br/>
        { this.state.applications.length === 0 ? "You have no active applications." : this.printApplications() }
      </div>
    );
  }
}
