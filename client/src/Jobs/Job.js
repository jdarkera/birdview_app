import React, { Component } from 'react';
import CompanyInfo from "../Company/CompanyInfo";
import EditJob from "./EditJob";
import Apply from "../Apply/Apply";
import './CreateJob.css';
import axios from 'axios';
import { UserType } from "../Constants.js";

import  { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";

var latitude, longitude;

export default class Job extends Component {
    constructor(props){
        super(props);
        this.state= {
            viewCompanyInfo: false,
            applyToJob: false,
            editJob: false,
            deleted: false,
            errorMessage: "",
            applyDup: false,
            applied: [],
        };

        this.reRender = this.reRender.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.checkApplyDup = this.checkApplyDup.bind(this);
    }

    reRender() {
        this.setState({
            viewCompanyInfo: false,
            applyToJob: false,
            editJob: false,
            errorMessage: "",
            applyDup: false,
            applied:[],
        });
    }

    checkApplyDup(){
        axios.get(`/applications/list?userName=${this.props.userName}`)
        .then(res => {
            console.log(res);
            this.applied = res.data;
            if (this.applied.length === 0){
                this.setState({
                    applyDup: false,
                        applyToJob: true,
                })
            }else{
                for (var i = 0; i < this.applied.length; i++)
                {
                    if(this.applied[i].userName === this.props.userName && this.applied[i].jobTitle === this.props.job.jobTitle)
                    {   
                        this.setState({
                            applyDup: true,
                            applyToJob: false,
                            applied: res.data,
                        });
                        break;
                    }else{
                        this.setState({
                            applyDup: false,
                            applyToJob: true,
                            applied: res.data,
                        });
                    };
                };
            };
            console.log("checkpoint");
            console.log(this.state.applyDup);
            console.log(this.state.applyToJob);
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    deleteJob() {
        const job = {
            jobTitle: this.props.job.jobTitle,
            companyName: this.props.job.companyName,
        };

        axios.post('/jobs/delete', job)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    deleted: true,
                    errorMessage: "",
                });
            })
            .catch((err) => {
                // display error message
                this.setState({
                    deleted: false,
                    errorMessage: "Posting could not be removed. Please try again",
                });
            })
            .finally(() => {
                window.scrollTo(0, 0);
            });
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({favoritecolor: "yellow"})
          }, 700);
    }


    render() {
        const jobTitle = this.props.job.jobTitle;
        const jobDesc = this.props.job.jobDesc;
        const salary  = this.props.job.salary;
        const deadline = this.props.job.deadline || "Not specified";
        const companyName = this.props.job.companyName;

        const userInfo = {
            userName: this.props.userName,
            userType: this.props.userType,
        }

        // for google-maps api
        const location = this.props.job.location;
        //console.log(location);
        //console.log(typeof(location));
        const address = location.address;
        const city = location.city;
        const province = location.province;
        const finalString = address + ", " + city + ", " + province;

        const currJob = {
            jobTitle: jobTitle,
            jobDesc: jobDesc,
            companyName: companyName,
            salary: salary,
            deadline: deadline,
            location: location,
        };

        // cathan dont touch

        function assignGeo() {

            Geocode.setApiKey("AIzaSyDrzf70J5QLoCv6t1YhCrZqNByoD_wmtUk");
            Geocode.setLanguage("en");
            Geocode.setRegion("ca");
            Geocode.enableDebug();

            Geocode.fromAddress(finalString).then(
                response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    console.log("lat lng defined here");
                    latitude = lat;
                    longitude = lng;
                },
                error => {
                    console.error(error);
                }
            );
        }

        assignGeo();

        function Map() {
            console.log("map called here");
            return(
                <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: latitude, lng: longitude}}
                >
                <Marker
                    position={{lat: parseFloat(latitude), lng: parseFloat(longitude)}}
                />
                </GoogleMap>
            );
        }

        const WrappedMap = withScriptjs(withGoogleMap(Map));

        let componentToRender;

        if (this.props.userType === UserType.STUDENT && this.state.applyToJob && !this.state.applyDup) {
            componentToRender = <Apply userInfo={userInfo} currJob={currJob} goBack={this.reRender} />
        } else if (this.props.userType === UserType.STUDENT && this.state.viewCompanyInfo) {
            componentToRender = <CompanyInfo companyName={companyName} userInfo={userInfo} goBack={this.reRender}/>
        } else if (this.props.userType === UserType.RECRUITER && this.state.editJob) {
            componentToRender = <EditJob currJob={currJob}/>
        } else if (this.props.userType === UserType.STUDENT && !this.state.applyToJob && this.state.applyDup){
            componentToRender = (
                <div style={{width: '50vw', height: '50vh'}}>
                    <h1><a href="/#">{jobTitle}</a></h1>
                    <hr/>
                    {this.state.deleted && <p id="jobDeleteMessage">The posting has been removed. </p>}
                    <p id="errorMessage">{this.state.errorMessage}</p>
                    {! this.state.deleted && <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th>Job Title</th>
                                <td>{jobTitle}</td>
                                <th>Salary</th>
                                <td>{salary}</td>
                            </tr>
                            <tr>
                                <th>Deadline</th>
                                <td>{deadline}</td>
                                <th>Company Name</th>
                                <td>{companyName}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{finalString}</td>
                            </tr>
                        </tbody>
                    </table>}
                    <br/>
                    <hr/>
                    {this.props.userType === UserType.STUDENT && ! this.state.deleted && <button class="btn btn-primary" onClick={() => this.setState({viewCompanyInfo:true})}>View Company Info</button>}
                    {this.props.userType === UserType.STUDENT && ! this.state.deleted && <button class="btn btn-secondary" onClick={() => {this.checkApplyDup();this.reRender()}}>Applied</button>}
                    <br/>
                    <br/>
                    {! this.state.deleted && <h4>Job Description</h4>}<br/>
                    {! this.state.deleted && <p>{jobDesc}</p>}
                    <hr/>

                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAf9PKvnalpIQ5WHg7LtjI3lbcjWGxUNBA`}
                        loadingElement={<div style={{height: "100%"}}  />}
                        containerElement={<div style={{height: "100%"}}  />}
                        mapElement={<div style={{height: "100%"}}  />}
                    />
                    <br/>
                </div>
            );
        }else {
            componentToRender = (
                <div style={{width: '50vw', height: '50vh'}}>
                    <h1><a href="/#">{jobTitle}</a></h1>
                    <hr/>
                    {this.state.deleted && <p id="jobDeleteMessage">The posting has been removed. </p>}
                    <p id="errorMessage">{this.state.errorMessage}</p>
                    {! this.state.deleted && <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th>Job Title</th>
                                <td>{jobTitle}</td>
                                <th>Salary</th>
                                <td>{salary}</td>
                            </tr>
                            <tr>
                                <th>Deadline</th>
                                <td>{deadline}</td>
                                <th>Company Name</th>
                                <td>{companyName}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{finalString}</td>
                            </tr>
                        </tbody>
                    </table>}
                    <br/>
                    <hr/>
                    {this.props.userType === UserType.STUDENT && ! this.state.deleted && <button class="btn btn-primary" onClick={() => this.setState({viewCompanyInfo:true})}>View Company Info</button>}
                    {this.props.userType === UserType.STUDENT && ! this.state.deleted && <button class="btn btn-primary" onClick={() => {this.checkApplyDup();this.reRender()}}>Apply</button>}
                    {this.props.userType === UserType.RECRUITER && ! this.state.deleted && <button class="btn btn-primary" onClick={() => this.setState({editJob: true})}>Edit Job</button>}
                    {this.props.userType === UserType.RECRUITER && ! this.state.deleted && <button class="btn btn-danger" onClick={() => this.deleteJob()}>Delete</button>}
                    <br/>
                    <br/>
                    {! this.state.deleted && <h4>Job Description</h4>}<br/>
                    {! this.state.deleted && <p>{jobDesc}</p>}
                    <hr/>

                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAf9PKvnalpIQ5WHg7LtjI3lbcjWGxUNBA`}
                        loadingElement={<div style={{height: "100%"}}  />}
                        containerElement={<div style={{height: "100%"}}  />}
                        mapElement={<div style={{height: "100%"}}  />}
                    />
                    <br/>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="container">
                    {componentToRender}
                </div>
            </React.Fragment>
        );
    }
}
