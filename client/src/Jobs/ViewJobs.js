
import React, { Component } from 'react';
import axios from 'axios';
import './ViewJobs.css'

export default class ViewJobs extends Component {

  constructor(props) {
      super(props);

      this.state = {
        jobs: [],
        allJobs: [],
        companies: [],
        jobsClean: [],
      };

      this.getJobs = this.getJobs.bind(this);
      this.printJobs = this.printJobs.bind(this);
      this.getJobs();
  }

  getJobs() {

    axios.get(`/jobs/viewJobs?companyName=${this.props.companyName}`)
      .then(res => {
        //console.log(res);
        this.printJobs(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  printJobs(jobs) {
    let companiesArray = [];

    jobs.sort((a, b) => {
      return new Date(a.deadline) - new Date(b.deadline);
    });

    jobs.forEach((job) => {
      if(companiesArray.indexOf(job.companyName) === -1) {
        companiesArray.push(job.companyName);
      }
    });

    const output = jobs.map((item,index) => {
      console.log(item);
      return (new Date(item["deadline"]).getTime() > new Date().getTime() &&
        <tr key={index} onClick={() => this.props.onSelectJob(item)}>
          <td>
            { item["jobTitle"] }
          </td>
          <td>
            { item["companyName"] }
          </td>
          <td>
            { item["createdAt"] }
          </td>
          <td>
            { item["deadline"] ? new Date(item["deadline"]).toLocaleString() : "Not specified"}
          </td>
        </tr>
      )
    });

    this.setState({
      jobs: output,
      allJobs: jobs,
      jobsClean: jobs,
      companies: companiesArray,
    });
  }

  applyCompanyFilter = () => {
    var orders = document.getElementsByName("deadline-order");
    [...orders][0].selected = true;

    var companies = document.getElementsByName("company");
    let company = [...companies].find((company) => {
      return (company.selected === true)
    }).value;

    let filteredJobs = [];
    if (company !== "all") {
      filteredJobs = this.state.allJobs.filter((job) => {
        return job.companyName === company;
      });
    } else {
      filteredJobs = this.state.allJobs;
    }

    const output = filteredJobs.map((item,index) => {
      return (new Date(item["deadline"]).getTime() > new Date().getTime() &&
        <tr key={index} onClick={() => this.props.onSelectJob(item)}>
          <td>
            { item["jobTitle"] }
          </td>
          <td>
            { item["companyName"] }
          </td>
          <td>
            { item["createdAt"] }
          </td>
          <td>
            { item["deadline"] ? new Date(item["deadline"]).toLocaleString() : "Not specified"}
          </td>
        </tr>
      )
    });

    this.setState({
      jobs: output,
      jobsClean: filteredJobs,
    });
  }

  changeDeadline = () => {
    var orders = document.getElementsByName("deadline-order");
    let order = [...orders].find((order) => {
      return (order.selected === true)
    }).value;

    const companiesArray = this.state.companies;
    const currjobs = this.state.jobsClean;
    currjobs.sort((a, b) => {
      if (order === 0) {
        return new Date(a.deadline) - new Date(b.deadline);
      } else {
        return new Date(b.deadline) - new Date(a.deadline);
      }
    });

    const output = currjobs.map((item,index) => {
      return (new Date(item["deadline"]).getTime() > new Date().getTime() &&
        <tr key={index} onClick={() => this.props.onSelectJob(item)}>
          <td>
            { item["jobTitle"] }
          </td>
          <td>
            { item["companyName"] }
          </td>
          <td>
            { item["createdAt"] }
          </td>
          <td>
            { item["deadline"] ? new Date(item["deadline"]).toLocaleString() : "Not specified"}
          </td>
        </tr>
      )
    });

    this.setState({
      jobs: output,
      companies: companiesArray,
    });
  }

  render() {
    if(Array.isArray(this.state.jobs) && this.state.jobs.length === 0) {
      return (
        <div className="container">
          <h1>Active Jobs</h1><br />
          {this.props.companyName && <p>You have not posted any jobs yet!</p>}
          {! this.props.companyName && <p>No active listings to show. Try again later!</p>}
        </div>
      );
    }
    return (
      <div className="container">
      <h1>Active Jobs</h1>
      <br/>
      <br/>
     <table className="table customStyle">
      <thead>
        <tr>
          <th>Job Title</th>
          {! this.props.companyName &&
          <th>
          <select className="custom-select mr-sm-2" onChange={this.applyCompanyFilter}>
            <option name="company" value="all" defaultValue>All companies</option>
            {
              this.state.companies.map((company, i) => {
                return <option name="company" value={company} key={i}>{company}</option>
              })
            }
          </select>
          </th>
          }
          {this.props.companyName &&
          <th>Company</th>
          }
          <th>Created At</th>
          <th>
          <select className="custom-select mr-sm-2" onChange={this.changeDeadline}>
            <option name="deadline-order" value="0" defaultValue>Deadline (earliest)</option>
            <option name="deadline-order" value="1" >Deadline (latest)</option>
          </select>
          </th>
        </tr>
      </thead>
      <tbody>
        { this.state.jobs }
      </tbody>
      </table>
      </div>
    );
  }
}
