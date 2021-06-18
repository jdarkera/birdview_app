// Tabs needed: Create job, View Job,
import React, { Component } from 'react';
import axios from 'axios';

export default class EditCompany extends Component {
    constructor(props){
        super(props);

        this.state = {
            companyWebsite: this.props.companyInfo.website,
            companySize: this.props.companyInfo.size,
            companyHeadquaters:  this.props.companyInfo.headquarters,
            companyFounded: this.props.companyInfo.founded,
            companyAbout: this.props.companyInfo.about,
            message: '',
        };
    }

    handleCompanyWebsiteChange = (event) =>{
        this.setState({companyWebsite: event.target.value}, () =>{
            // console.log(event.target.value);
        });
    }

    handleCompanySizeChange = (event) =>{
        this.setState({companySize: event.target.value}, () =>{
            // console.log(event.target.value);
        });
    }

    handleCompanyHeadquatersChange = (event) =>{
        this.setState({companyHeadquaters: event.target.value}, () =>{
            // console.log(event.target.value);
        });
    }

    handleCompanyFoundedChange = (event) =>{
        this.setState({companyFounded: event.target.value}, () =>{
            // console.log(event.target.value);
        });
    }

    handleCompanyAboutChange = (event) =>{
        this.setState({companyAbout: event.target.value}, () =>{
            // console.log(event.target.value);
        });
    }

    editCompany = () => {
        console.log(this.props.companyInfo);
        const data = {
            companyName: this.props.companyInfo.name,
            companyAbout: this.state.companyAbout,
            companySize: this.state.companySize,
            companyFounded: this.state.companyFounded,
            companyHeadquaters: this.state.companyHeadquaters,
            companyWebsite: this.state.companyWebsite,
        };

        axios.post(`/companies/edit`, data)
        .then((res) => {
            console.log("--Company edited successfully--");
            document.getElementById("statusMessage").style.color = "green";
            // show success message
            this.setState({
                message: "Company edited successfully!",
            });
        })
        .catch((err) => {
            // display error message
            document.getElementById("statusMessage").style.color = "red";
            this.setState({
                message: "There was a problem completing your request. Please try again later.",
            });
        })
        .finally(()=>{
            window.scrollTo(0, 0);
        });
    }

    render() {
        console.log(this.props.companyInfo);
        return (
            <React.Fragment>
                <p id="statusMessage">{this.state.message}</p>
                <form>
                     <div className="form-group">
                            <label htmlFor="companyWebsite">Company Website</label>
                        <input type="text" className="form-control" id="companyWebsite" value={this.state.companyWebsite} onChange={this.handleCompanyWebsiteChange} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="companySize">Company Size</label>
                        <select disabled={this.state.userType==='student'} className="form-control" id="companySize" value={this.state.companySize} onChange={this.handleCompanySizeChange} >
                            <option value="Self-employed">A: Self-employed</option>
                        <option value="1-10 employees">B: 1-10 employees</option>
                            <option value="11-50 employees">C: 11-50 employees</option>
                            <option value="51-200 employees">D: 51-200 employees</option>
                            <option value="201-500 employees">E: 201-500 employees</option>
                            <option value="501-1000 employees">F: 501-1000 employees</option>
                            <option value="1001-5000 employees">G: 1001-5000 employees</option>
                            <option value="5001-10,000 employees">H: 5001-10,000 employees</option>
                            <option value="10,001+ employees">I: 10,001+ employees</option>
                        </select>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="companyHeadquaters">Headquaters Location</label>
                        <input disabled={this.state.userType==='student'} type="text" className="form-control" id="" value={this.state.companyHeadquaters} onChange={this.handleCompanyHeadquatersChange} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="companyFounded">Year Founded</label>
                        <input disabled={this.state.userType==='student'} type="text" className="form-control" id="companyFounded" value={this.state.companyFounded} onChange={this.handleCompanyFoundedChange} />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="companyAbout">About Your Company</label>
                        <textarea rows="10" cols="75" className="form-control" id="companyAbout" value={this.state.companyAbout} onChange={this.handleCompanyAboutChange} />
                    </div>
                    <button type="button" className="btn btn-success" onClick={this.editCompany}>Save changes</button>
                    <br/>
                    <br/>
                </form>
            </React.Fragment>   
        );
    }
}
