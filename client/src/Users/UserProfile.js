// Tabs needed: Create job, View Job,
import React, { Component } from 'react';
import axios from 'axios';
//import CreateJob from '../Jobs/CreateJob';
import './User.css';

export default class UserProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            userName: this.props.user.userName,
            userOldPassword: '',
            userNewPassword: '',
            companyName: this.props.user.companyName,
            editProfileMessage: '',
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleOldUserPasswordChange = this.handleOldUserPasswordChange.bind(this);
        this.handleNewUserPasswordChange = this.handleNewUserPasswordChange.bind(this);
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleUserEdit = this.handleUserEdit.bind(this);
    }

    handleUserNameChange = (event) => {
        // console.log(event.target.value);
        this.setState({userName: event.target.value});
    }

    handleOldUserPasswordChange = (event) => {
        // console.log(event.target.value);
        this.setState({userOldPassword: event.target.value});
    }

    handleNewUserPasswordChange = (event) => {
        // console.log(event.target.value);
        this.setState({userNewPassword: event.target.value});
    }

    handleCompanyNameChange = (event) =>{
        // console.log(event.target.value);
        this.setState({companyName: event.target.value});
    }

    handleEditProfile = (event) => {
        event.preventDefault();
        // alert('REGISTER: userName='+ this.state.userName + ", password=" + this.state.userPassword);

        const user = {
            oldUserName: this.props.user.userName,
            newUserName: this.state.userName,
            userOldPassword: this.state.userOldPassword,
            userNewPassword: this.state.userNewPassword,
            companyName: this.state.companyName,
        }

        // check if user exsits in the database
        // otherwise, add a new user
        axios.post('/users/edit', user)
            .then(res => {
                const newUser = {
                    userName: this.state.userName,
                    userPassword: this.state.userNewPassword,
                    companyName: this.state.companyName,
                }

                document.getElementById("editProfileMessage").style.color = "green";
                this.setState({
                    userName: '',
                    userOldPassword: '',
                    userNewPassword: '',
                    companyName:'',
                    editProfileMessage: 'Changes saved!'
                });

                this.handleUserEdit(newUser);
            })
            .catch((err) => {
                // display error message
                document.getElementById("editProfileMessage").style.color = "red";

                this.setState({
                    editProfileMessage: "There was an error editing the profile. Please try again.",
                });
            })
            .finally(() => {
                window.scrollTo(0, 0);
            });
    }

    handleCancel = () => {
        // serve default user page
        this.props.handleCancel();
    }

    handleUserEdit(newUser) {
        this.props.handleUserEdit(newUser);
    }

    render() {
        const user = this.props.user;

        return (
            <React.Fragment>
                <div className="container">
                <h1>Edit Profile</h1>
                <h5 id="editProfileMessage">{this.state.editProfileMessage}</h5>
                <form className="myForm">
                    <div className="form-group">
                        <label htmlFor="Username">Username (min. 4 characters)</label>
                        <input type="text" placeholder={user.userName} className="form-control" id="userName" value={this.state.userName} onChange={this.handleUserNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Old Password</label>
                        <input type="password" className="form-control" id="oldPassword" value={this.state.userOldPassword} onChange={this.handleOldUserPasswordChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">New Password</label>
                        <input type="password" className="form-control" id="newPassword" value={this.state.userNewPassword} onChange={this.handleNewUserPasswordChange}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.handleEditProfile}>Save changes</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleCancel}>Cancel</button>
                </form>

            </div>
            </React.Fragment>
        );
    }
}
