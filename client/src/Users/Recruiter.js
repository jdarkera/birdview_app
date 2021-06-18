// Tabs needed: Create job, View Job,
import React, { Component } from 'react';
import CompanyInfo from "../Company/CompanyInfo";
import CreateJob from '../Jobs/CreateJob';
import ViewJobs from "../Jobs/ViewJobs";
import UserProfile from "./UserProfile";
import Job from "../Jobs/Job";
import ViewApplicant from "../Apply/ViewApplicant";
import './User.css';
import { Tabs, UserType } from "../Constants.js";

export default class Recruiter extends Component {
    constructor(props){
        super(props);
        this.state = {
          currentTab : Tabs.CREATE_JOB,
          viewingJob: null
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUserEdit = this.handleUserEdit.bind(this);
        this.handleViewJob = this.handleViewJob.bind(this);
    }

    handleTabChange(tabId) {
        this.setState({currentTab: tabId});
    }

    handleCancel() {
        this.setState({currentTab: Tabs.CREATE_JOB});
    }

    handleUserEdit(newUser) {
        this.props.handleUserEdit(newUser);
    }

    handleViewJob(job) {
      this.setState({viewingJob: job});
      this.setState({currentTab: Tabs.JOB});
    }

    render() {
        const user = this.props.user;

        return (
            <React.Fragment>
                <div className="container">
                  <nav className="navbar navbar-light navbar-expand-sm justify-content-end">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <button className="nav-link userNav edit" onClick={() => this.handleTabChange(Tabs.USER_PROFILE)}>Edit Profile</button>
                      </li>
                      <li className="nav-item">
                          <button className="nav-link userNav" onClick={() => this.handleTabChange(Tabs.CREATE_JOB)}>Post a Job</button>
                      </li>
                      <li className="nav-item">
                          <button className="nav-link userNav" onClick={() => this.handleTabChange(Tabs.VIEW_JOBS)}>View Posted Jobs</button>
                      </li>
                      <li className="nav-item">
                          <button className="nav-link userNav" onClick={() => this.handleTabChange(Tabs.COMPANY_INFO)}>View Company</button>
                      </li>
                      <li className="nav-item">
                          <button className="nav-link userNav" onClick={() => this.handleTabChange(Tabs.VIEW_APPLICANTS)}>View Applicants</button>
                      </li>
                      
                  </ul>
                  </nav>
                  <br/>
                  <div className="container">
                      {this.state.currentTab === Tabs.USER_PROFILE && (
                          <UserProfile user={user} handleCancel={this.handleCancel} handleUserEdit={this.handleUserEdit}/>
                      )}
                      {this.state.currentTab === Tabs.CREATE_JOB && (
                          <CreateJob companyName={user.companyName}/>
                      )}
                      {this.state.currentTab === Tabs.VIEW_JOBS && (
                          <ViewJobs onSelectJob={this.handleViewJob} companyName={user.companyName}/>
                      )}
                      {this.state.currentTab === Tabs.JOB && (
                        <div>
                          <Job userName={user.userName} userType={UserType.RECRUITER} job={this.state.viewingJob}/>
                        </div>
                      )}
                      {this.state.currentTab === Tabs.COMPANY_INFO && (
                          <CompanyInfo companyName={user.companyName} userInfo={user} source="recruiter"/>
                      )}
                      {this.state.currentTab === Tabs.VIEW_APPLICANTS && (
                          <ViewApplicant companyName={user.companyName}/>
                      )}
                  </div>
                </div>
            </React.Fragment>
        );
    }
}
