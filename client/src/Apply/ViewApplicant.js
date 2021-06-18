import React, { Component } from 'react';
import axios from 'axios';

export default class ViewApplicant extends Component {
  constructor(props){
    super(props);

    this.state  = {
      companyName: this.props.companyName,
      applicants: [],
      allApplicants: [],
      jobs: [],
      applicantsClean: []
    };

    this.getApplications = this.getApplications.bind(this);
    this.printApplicants = this.printApplicants.bind(this);
    this.getApplications();
  }

  getApplications() {
    axios.get(`/applications/applicant?companyName=${this.props.companyName}`)
      .then(res => {
        console.log(res);
        this.applicants = res;
        this.printApplicants(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  printApplicants(applicants) {

    let hostname = window.location.hostname;
    let jobsArray = [];

    applicants.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    applicants.forEach((applicant) => {
      if(jobsArray.indexOf(applicant.jobTitle) === -1) {
        jobsArray.push(applicant.jobTitle);
      }
    });

    const output = applicants.map((item,index) => {
      return (
        <tr key={index}>
          <td>
            { item["userName"] }
          </td>
          <td>
            { item["jobTitle"] }
          </td>
          <td>
            { item["companyName"] }
          </td>
          <td>
            { item["createdAt"] ? new Date(item["createdAt"]).toLocaleString() : "Not specified"}
          </td>
          <td>
            <a href={ "http://" + hostname + ":5000" + item["resume"] }>View</a>
          </td>
        </tr>
      )
    })
    this.setState({
      applicants: output,
      allApplicants: applicants,
      jobs: jobsArray,
      applicantsClean: applicants
    });
  }

  applyJobFilter = () => {
    let hostname = window.location.hostname;
    var orders = document.getElementsByName("created-order");
    [...orders][0].selected = true;

    var jobs = document.getElementsByName("job");
    let job = [...jobs].find((job) => {
      return (job.selected === true)
    }).value;

    let filteredApplicants = [];
    if (job !== "all") {
      filteredApplicants = this.state.allApplicants.filter((applicant) => {
        return applicant.jobTitle === job;
      });
    } else {
      filteredApplicants = this.state.allApplicants;
    }

    const output = filteredApplicants.map((item,index) => {
      return (
        <tr key={index}>
          <td>
            { item["userName"] }
          </td>
          <td>
            { item["jobTitle"] }
          </td>
          <td>
            { item["companyName"] }
          </td>
          <td>
            { item["createdAt"] ? new Date(item["createdAt"]).toLocaleString() : "Not specified"}
          </td>
          <td>
            <a href={ "http://" + hostname + ":5000" + item["resume"] }>View</a>
          </td>
        </tr>
      )
    });

    this.setState({
      applicants: output,
      applicantsClean: filteredApplicants,
    });
  }

  sortCreatedTime = () => {
    let hostname = window.location.hostname;
    var orders = document.getElementsByName("created-order");
    let order = [...orders].find((order) => {
      return (order.selected === true)
    }).value;

    const jobsArray = this.state.jobs;
    const currApplicants = this.state.applicantsClean;
    currApplicants.sort((a, b) => {
      if (order === 0) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    const output = currApplicants.map((item,index) => {
      return (
        <tr key={index}>
          <td>
            { item["userName"] }
          </td>
          <td>
            { item["jobTitle"] }
          </td>
          <td>
            { item["companyName"] }
          </td>
          <td>
            { item["createdAt"] ? new Date(item["createdAt"]).toLocaleString() : "Not specified"}
          </td>
          <td>
            <a href={ "http://" + hostname + ":5000" + item["resume"] }>View</a>
          </td>
        </tr>
      )
    });

    this.setState({
      applicants: output,
      jobs: jobsArray,
    });
  }

  render() {
    if(Array.isArray(this.state.applicants) && this.state.applicants.length === 0) {
      return (
        <div className="container">
          <h1>View Applicants</h1><br />
          {this.props.companyName && <p>No Applicants!</p>}
        </div>
      );
    }
    return (
      <div className="container">
        <h1>View Applicants</h1>
        <br/>
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              {! this.props.jobTitle &&
              <th>
              <select className="custom-select mr-sm-2" onChange={this.applyJobFilter}>
                <option name="job" value="all" defaultValue>All Jobs</option>
                {
                  this.state.jobs.map((job, i) => {
                    return <option name="job" value={job} key={i}>{job}</option>
                  })
                }
              </select>
              </th>
              }
              {this.props.jobTitle &&
              <th>Job Title</th>
              }
              <th>Company Name</th>
              <th>
              <select className="custom-select mr-sm-2" onChange={this.sortCreatedTime}>
                <option name="created-order" value="0" defaultValue>Applied Time (earliest)</option>
                <option name="created-order" value="1" >Applied Time (latest)</option>
              </select>
              </th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            { this.state.applicants }
          </tbody>
        </table>
      </div>
    );
  }
}