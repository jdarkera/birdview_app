// Tabs needed: Create job, View Job,
import React, { Component } from 'react';
import EditCompany from "./EditCompany";
import Overview from "./Overview";
import axios from 'axios';
import CompanyReview from "./CompanyReview";
import './CompanyInfo.css';

export default class CompanyInfo extends Component {
    constructor(props){
        super(props);

        this.state= {
            currentTab: 0,
            companyInfo: {  // add reviews as well
                name: '',
                website: '',
                type: '',
                size: '',
                headquarters: '',
                founded: '',
                industry: '',
                about: '',
                jobs: [{
                    jobDesc: '',
                    salary: '',
                    jobTitle: '',
                    location: {
                        streetNumber: '',
                        streetName: '',
                        city: '',
                        province: ''
                    }
                }],
            },
            errorMessage: '',
            companyEdit: false,
            job: null,
        };

        this.getCompanyInfo();

        this.handleTabChange = this.handleTabChange.bind(this);
        this.getCompanyInfo =this.getCompanyInfo.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        let overviewButton = document.getElementsByClassName("companyInfo")[0];
        overviewButton.style.backgroundColor = "rgb(240, 240, 240)";
    }

    goBack() {
        this.props.goBack();
    }

    editCompany = () => {
        // display EditCompany component
        this.setState({
            companyEdit: true,
        });
    }

    handleTabChange(tabId) {
        let grabButtons = document.getElementsByClassName("companyInfo");

        for (let gb of grabButtons) {
            gb.style.backgroundColor = "white";
        }
        grabButtons[tabId].style.backgroundColor = "rgb(240, 240, 240)";
        this.setState({currentTab: tabId});
    }

    getCompanyInfo() {
        axios.get(`/companies/info?companyName=${this.props.companyName}`)
            .then((res) => {
                console.log("__got data__");
                console.log(res.data);
                this.setState((prevState) => {
                    let companyInfo = Object.assign({}, prevState.companyInfo);
                    console.log(res.data);
                    companyInfo.name = res.data.companyName;
                    companyInfo.website = res.data.companyWebsite;
                    companyInfo.type = res.data.companyType;
                    companyInfo.size = res.data.companySize;
                    companyInfo.headquarters = res.data.companyHeadquaters;
                    companyInfo.founded = res.data.companyFounded;
                    companyInfo.industry = res.data.companySector;
                    companyInfo.about = res.data.companyAbout;
                    return { companyInfo };
                });
            })
            .catch((err) => {
                // display error message
                document.getElementById("viewCompany").style.color = "red";
                this.setState({
                    errorMessage: "There was a problem completing your request. Please try again later.",
                    companyEdit: false,
                });
                window.scrollTo(0, 0);
            });
    }

    render() {
        const companyName = this.props.companyName;
        //const goBack= this.props.navigation;

        let componentToServe;
        if (this.state.companyEdit) {
            console.log("Serving edit company");
            componentToServe = <EditCompany companyInfo = {this.state.companyInfo}/>
        } else {
            if (this.state.currentTab === 0) {
                componentToServe = <Overview companyInfo={this.state.companyInfo}/>;
            } else {
                componentToServe = <CompanyReview companyInfo={this.state.companyInfo} userInfo ={this.props.userInfo}/>
            }
        }

        return (
            <React.Fragment>
                <div className="container">
                <h1><a href="/#">{companyName}</a></h1>
                    <hr/>
                    <h5 id="viewCompany">{this.state.errorMessage}</h5>
                    {this.state.errorMessage === "" && ! this.state.companyEdit &&  (
                    <div>
                    <nav className="navbar navbar-light navbar-expand-sm">
                    {! this.props.source === "recruiter" && <button id="back-to-job" className="btn btn-primary" onClick={() => this.goBack()}>Back to Job posting</button>}
                    {this.props.source === "recruiter" && <button id="edit-company" className="btn btn-primary" onClick={() => this.editCompany()}>Edit Company</button>}
                    <ul className="nav nav-tabs ml-auto">
                    <li className="nav-item">
                        <button className="nav-link navbar-right userNav companyInfo" onClick={() => this.handleTabChange(0)}>Overview</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link navbar-right userNav companyInfo" onClick={() => this.handleTabChange(1)}>Reviews</button>
                    </li>
                    </ul>
                    </nav>
                    <br/>
                    <br/>
                    </div>)}
                    {this.state.errorMessage === "" && (componentToServe)}
                </div>
            </React.Fragment>
        );
    }
}
