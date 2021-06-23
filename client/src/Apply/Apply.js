
import React, { Component } from 'react';
import axios from 'axios';
import './Apply.css';
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
            <div className="container" >
      
                <h5 id="message">{this.state.message}</h5>
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" >
                        <h1 class="proposal" >Submit Your Proposal:</h1>
                        <p class="proposaldesc"> It will help the client understand which teams most closely match the skills required for the scope of work. Share your proposal in a PDF format.</p>
                        <button id="back-to-job" className="btn btn-light" onClick={() => this.goBack()}>Back to Listing</button>
                        </div>
                        <div className="application">
                        <div className="userinfo" className="form-group">User Name: {userName}</div>
                        <div className="userinfo"  className="form-group">Opportunity: {jobTitle}</div>
                        <div className="userinfo" className="form-group">Client: {companyName}</div>
                        <div className="form-group">
                            <input type="file" className="upload" onChange={this.onFileChange} />
                      
                        </div>
                        <div   className="form-group">
                            <button  className="upload" className="btn btn-primary" type="submit">Upload</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
