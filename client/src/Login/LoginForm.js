import React, { Component } from "react";
import axios from "axios";
import "./LoginForm.css";
import RegisterForm from "./RegisterForm";


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userPassword: ""
    };
  }

  handleUserNameChange = event => {
    // console.log(event.target.value);
    this.setState({ userName: event.target.value });
  };

  handleUserPasswordChange = event => {
    // console.log(event.target.value);
    this.setState({ userPassword: event.target.value });
  };

  updateShowUpdateNavBar = value => {
    this.props.updateShowUpdateNavBar(value);
  };

  onSuccessful_Login = () => {
    this.props.onSuccessful_Login();
  };

  updateUserObj = obj => {
    this.props.updateUserObj(obj);
  };

  onSuccessful_Register = () => {
    this.props.onSuccessful_Register();
  }

  handleLogin = event => {
    event.preventDefault();

    const user = {
      userName: this.state.userName,
      userPassword: this.state.userPassword
    };

    console.log(user);

    // check user credentials
    // if okay, direct to the next page
    axios
      .post("/users/authenticate", user)
      .then(res => {
        console.log("USER:", res.data);

        if (res === undefined || res === null) {
          alert("USER IS NOT REGISTERED");
        } else {
          console.log("Signing in ....... with user: ");
        

          this.updateUserObj(res.data);
          this.onSuccessful_Login();
        }
      })
      .catch(err => {
        console.log(err);
        alert("Please check your username or password");
      });
  };

  onRegisterClick = () => {
    this.props.onRegisterClick();
  }

  onLoginClick = () => {
    this.props.onLoginClick();
  }
  render() {
    return (
      <React.Fragment>
        <video autoPlay muted loop id="myVideo">
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {this.props.showRegister && (
            <RegisterForm 
                onSuccessful_Register={this.onSuccessful_Register}
                onLoginClick = {this.onLoginClick} />
          )}
          
        {this.props.showLogin && (
          <form className="myLoginForm myForm">
            <div className="loginform-group form-group">
              <label className= "loginform-label" htmlFor="Username">Username</label>
              <input
                type="text"
                className="loginform-control form-control"
                id="username"
                value={this.state.userName}
                onChange={this.handleUserNameChange}
              />
            </div>
            <div className="loginform-group form-group">
              <label className= "loginform-label" htmlFor="Password">Password</label>
              <input
                type="password"
                className="loginform-control form-control"
                id="userPassword"
                value={this.state.userPassword}
                onChange={this.handleUserPasswordChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-success loginform-btn"
              onClick={this.handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-primary loginform-btn"
              onClick={this.onRegisterClick}
            >
              Register
            </button>
          </form>
        )}
      
      </React.Fragment>
    );
  }
}
