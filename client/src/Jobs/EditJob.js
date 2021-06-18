import React, { Component } from 'react';
import axios from 'axios';
import './CreateJob.css';

function Location(address, city, pr, pcode) {
    this.address = address;
    this.city = city;
    this.province = pr;
    this.postalCode = pcode;
}

export default class EditJob extends Component {
    constructor(props){
        super(props);

        this.state = {
            jobTitle: this.props.currJob.jobTitle,
            jobDesc: this.props.currJob.jobDesc,
            salary: this.props.currJob.salary,
            location: this.props.currJob.location,
            jobPostingMessage: "",
            deadline: this.props.currJob.deadline,
        }

        this.handleJobDesc = this.handleJobDesc.bind(this);
        this.handleSalary = this.handleSalary.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleJobCreation = this.handleJobCreation.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
    }

    handleJobDesc = (event) => {
        this.setState({jobDesc: event.target.value});
    }

    handleSalary = (event) => {
        this.setState({salary: event.target.value});
    }

    handleDeadline = (event) => {
        console.log( event.target.value);
        this.setState({deadline: event.target.value});
    }

    handleLocation = (e) => {

        const { location } = { ...this.state };
        const currentLocation = location;
        const { name, value } = e.target;

        currentLocation[name] = value;

        this.setState({ location: currentLocation });
    }

    handleJobCreation = (event) => {
        console.log(this.state);
        event.preventDefault();

        const job = {
            companyName: this.props.currJob.companyName,
            jobTitle: this.props.currJob.jobTitle,
            jobDesc: this.state.jobDesc,
            salary: this.state.salary,
            location: this.state.location,
            deadline: this.state.deadline
        }

        axios.post('/jobs/editJob', job)
            .then((res) => {
                console.log(res.data);
                document.getElementById("jobPostingMessage").style.color = "green";
                this.setState({
                    jobTitle: '',
                    jobDesc: '',
                    salary: '',
                    location: new Location("", "", "", "", ""),
                    deadline: "",
                    jobPostingMessage: "Changes successfully saved!",
                });
            })
            .catch((err) => {
                // display error message
                document.getElementById("jobPostingMessage").style.color = "red";
                this.setState({
                    jobPostingMessage: "There was an error editing the job. Please try again.",
                });
            })
            .finally(() => {
                window.scrollTo(0, 0);
            });

        // redirect the user back to their homepage after adding the job-- if this is the default page then reset the form
        // window.location = "/";
    }

    render() {
        return (
            <div className="container">
                <h1>Edit Job posting</h1>
                <h5 id="jobPostingMessage">{this.state.jobPostingMessage}</h5>
                <form className="myForm">
                    <div className="form-group">
                        <label htmlFor="CompanyName">Company Name</label>
                        <input type="text" disabled className="form-control" id="companyName" value={this.props.currJob.companyName} />

                        <label htmlFor="CompanyName">Job Title</label>
                        <input type="text" disabled className="form-control" id="jobTitle" value={this.state.jobTitle} />

                        <label htmlFor="JobDesc">Job Description</label>
                        <textarea rows="10" cols="75" className="form-control" id="jobDesc" value={this.state.jobDesc} onChange={this.handleJobDesc} />

                        <label htmlFor="Location">Street</label>
                        <input type="text" className="form-control" name="address" value={this.state.location.address} onChange={this.handleLocation} />
                        <label htmlFor="Location">City</label>
                        <input type="text" className="form-control" name="city" value={this.state.location.city} onChange={this.handleLocation} />
                        <label htmlFor="Location">Province</label>
                        <input type="text" className="form-control" name="province" value={this.state.location.province} onChange={this.handleLocation} />
                        <label htmlFor="Location">Postal Code</label>
                        <input type="text" className="form-control" name="postalCode" value={this.state.location.postalCode} onChange={this.handleLocation} />

                        <label htmlFor="Salary">Salary per month</label>
                        <input type="text" className="form-control" placeholder="$CAD" id="SALARY" value={this.state.salary} onChange={this.handleSalary} />

                        <label htmlFor="Salary">Deadline</label>
                        <input type="date" className="form-control" id="deadline" value={this.state.deadline} onChange={this.handleDeadline} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleJobCreation}>Edit Job</button>
                    <br/>
                    <br/>
                </form>
            </div>
        );
    }
}
