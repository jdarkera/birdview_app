import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar/Navbar";
import LoginForm from "./Login/LoginForm";
import Dashboard from "./Dashboard/Dashboard";
import "./App.css";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUpdateNavBar: false,
      showLogin: true,
      showRegister: false,
      showDashboard: false,
      userobj: {}
    };
  }

  onSuccessful_Register = () => {
    this.setState({
      showRegister: false,
      showLogin: true,
      showUpdateNavBar: false,
      showDashboard: false
    });
  };

  onSuccessful_Login = () => {
    this.setState({
      showLogin: false,
      showRegister: false,
      showUpdateNavBar: true,
      showDashboard: true
    });
  };

  onSuccessful_Logout = () => {
    this.setState({
      showLogin: true,
      showRegister: false,
      showUpdateNavBar: false,
      showDashboard: false
    });
  };

  onRegisterClick = () => {
    this.setState({
      showLogin: false,
      showRegister: true,
      showUpdateNavBar: false,
      showDashboard: false
    });
  };

  onLoginClick = () => {
    this.setState({
      showLogin: true,
      showRegister: false,
      showUpdateNavBar: false,
      showDashboard: false
    });
  };

  onLogOutClick = () => {
    this.setState({
      showUpdateNavBar: false,
      showLogin: true,
      showRegister: false,
      showDashboard: false
    });

    axios
      .post("/users/logout", this.state.userobj)
      .then(res => {
        if (res === undefined || res === null) {
          alert("USER IS UNDEFINED OR NULL");
        } else {
          console.log("Loggin out ....... user: ");
          
          console.log("USER:", res.data);
          this.updateUserObj(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        alert("Please check user");
      });


  };

  updateUserObj = newobj => {
    this.setState({
      userobj: newobj
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Router>
            <Navbar
              showUpdateNavBar={this.state.showUpdateNavBar}
              onRegisterClick={this.onRegisterClick}
              onLogOutClick={this.onLogOutClick}
              onLoginClick={this.onLoginClick}
            />
          </Router>
        </div>
        <div className="row content">
          {(this.state.showLogin || this.state.showRegister) && (
            <LoginForm
              showLogin={this.state.showLogin}
              showRegister={this.state.showRegister}
              showDashboard={this.state.showDashboard}
              onRegisterClick={this.onRegisterClick}
              onLoginClick={this.onLoginClick}
              updateUserObj={this.updateUserObj}
              onSuccessful_Login={this.onSuccessful_Login}
              onSuccessful_Register={this.onSuccessful_Register}
            />
          )}
          {this.state.showDashboard && (
            <Dashboard userobj={this.state.userobj} />
          )}
        </div>
      </div>
    );
  }
}
