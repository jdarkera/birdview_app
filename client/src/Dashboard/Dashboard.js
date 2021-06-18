import React, { Component } from "react";
import Student from "../Users/Student";
import Recruiter from "../Users/Recruiter";
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shared_var: "init",
      user: this.props.userobj
    };
    this.handleUserEdit = this.handleUserEdit.bind(this);
  }

  updateShared(shared_value) {
    this.setState({ shared_var: shared_value });
  }

  handleUserEdit(newUser) {
    this.setState(prevState => {
      let user = Object.assign({}, prevState.user);
      user.userName = newUser.userName;
      user.userPassword = newUser.userPassword;
      user.companyName = newUser.companyName;
      return { user };
    });
  }

  componentDidMount() {
    console.log("Dashboard componentDidMount");
    console.log("user:", this.state.user);
  }

  componentWillUnmount() {
    console.log("Dashboard componentwillunmount");
  }

  render() {
    const user = this.state.user;
    console.log(user.userType);
    const isRecruiter = user.userType === "recruiter" ? true : false;

    var componentToServe;

    if (isRecruiter) {
      componentToServe = (
        <Recruiter user={user} handleUserEdit={this.handleUserEdit} />
      );
    } else {
      componentToServe = (
        <Student user={user} handleUserEdit={this.handleUserEdit} />
      );
    }

    return (
      <React.Fragment>
        <div className="container">
          <h1>Welcome, {user.userName}!</h1>
          <hr />
          {componentToServe}
        </div>
      </React.Fragment>
    );
  }
}
