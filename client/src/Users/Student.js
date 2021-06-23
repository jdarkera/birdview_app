import React, { Component } from 'react';
import UserProfile from "./UserProfile";
import ViewJobs from "../Jobs/ViewJobs";
import ViewJobsMap from "../Jobs/ViewJobsMap";
import ViewApplications from "../Apply/ViewApplications";
import Job from "../Jobs/Job";
import './User.css';
import { Tabs, UserType } from "../Constants.js";


export default class Student extends Component {
    constructor(props){
        super(props);

        this.state = {
          currentTab : Tabs.VIEW_JOBS,
          viewingJob: null
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleUserEdit = this.handleUserEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleViewJob = this.handleViewJob.bind(this);
    }

    handleTabChange(tabId) {
        this.setState({currentTab: tabId});
    }

    handleCancel() {
        this.setState({currentTab: Tabs.VIEW_JOBS});
    }

    handleViewJob(job) {
      this.setState({viewingJob: job});
      this.setState({currentTab: Tabs.JOB});
    }

    handleUserEdit(newUser) {
        this.props.handleUserEdit(newUser);
    }

    render() {
        const user = this.props.user;

        return (
            <React.Fragment>
                <nav className="navbar navbar-light navbar-expand-sm justify-content-end">
                <ul className="navbar-nav justify-content-center">
                    <li className="nav-item">
                        <button className="nav-link userNav edit bg-warning" onClick={() => this.handleTabChange(Tabs.USER_PROFILE)}>Edit Profile</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link userNav bg-warning " onClick={() => this.handleTabChange(Tabs.VIEW_JOBS)}>View Opportunities</button>
                    </li>

                    <li className="nav-item">
                        <button className="nav-link userNav bg-warning" onClick={() => this.handleTabChange(Tabs.VIEW_JOBS_MAP)}>View Listings Map</button>
                    </li>

                    <li className="nav-item">
                        <button className="nav-link userNav bg-warning" onClick={() => this.handleTabChange(Tabs.VIEW_APPLICATIONS)}>My Applications</button>
                    </li>
                </ul>
                </nav>
                <br/>
                <div className="container">

                    {this.state.currentTab === Tabs.USER_PROFILE && (
                        <UserProfile user={user} handleCancel={this.handleCancel} handleUserEdit={this.handleUserEdit}/>
                    )}

                    {this.state.currentTab === Tabs.VIEW_JOBS && (
                        <ViewJobs onSelectJob={this.handleViewJob} />
                    )}

                    {this.state.currentTab === Tabs.VIEW_JOBS_MAP && (
                        <ViewJobsMap onSelectJob={this.handleViewJob} />
                    )}

                    {this.state.currentTab === Tabs.VIEW_APPLICATIONS && (
                        <ViewApplications userName={user.userName}/>
                    )}

                    {this.state.currentTab === Tabs.JOB && (
                        <div>
                          <Job userName={user.userName} userType={UserType.STUDENT} job={this.state.viewingJob}/>
                        </div>
                    )}

                </div>
            </React.Fragment>
        );
    }
}
