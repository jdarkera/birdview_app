
import React, { Component } from 'react';
import axios from 'axios';

export default class Apply extends Component {

    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName: this.props.userInfo.userName,
            jobTitle: this.props.currJob.jobTitle,
            companyName: this.props.currJob.companyName,
            resume: '',
            message:''
        }
    }

    goBack() {
        this.props.goBack();
    }

    onFileChange(e) {
        this.setState({ resume: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('userName', this.state.userName)
        formData.append('jobTitle', this.state.jobTitle)
        formData.append('companyName', this.state.companyName)
        formData.append('resume', this.state.resume)
        axios.post("/applications/upload", formData, {
        }).then(res => {
            console.log(res)
            document.getElementById("message").style.color = "green";
            this.setState({
                userName: '',
                jobTitle: '',
                companyName: '',
                resume: '',
                message:'Applied successfully.'
            })
        })
    }

    render() {
        const userName = this.props.userInfo.userName;
        const jobTitle = this.props.currJob.jobTitle;
        const companyName = this.props.currJob.companyName;

        return (
            <div className="container">
                <h5 id="message">{this.state.message}</h5>
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <button id="back-to-job" className="btn btn-primary" onClick={() => this.goBack()}>Back to Job posting</button>
                        </div>
                        <div className="form-group">User Name: {userName}</div>
                        <div className="form-group">Job Title: {jobTitle}</div>
                        <div className="form-group">Company Name: {companyName}</div>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                            <p>Only allow to upload pdf file</p>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
