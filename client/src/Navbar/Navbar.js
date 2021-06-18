import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onLogOutClick = () => {
    this.props.onLogOutClick();
  }

  onRegisterClick = () => {
    this.props.onRegisterClick();
  }

  onLoginClick = () => {
    this.props.onLoginClick();
  }

  render() {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm fixed-top justify-content-end">
          <ul className="navbar-nav">
              <li className="nav-item logo">
                <Link 
                  to= "/" 
                  className="nav-link"
                  onClick={this.onLoginClick}> myBetterExperience</Link>
              </li>

            {this.props.showUpdateNavBar && (
              <span className="options">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={this.onLogOutClick}
                  >
                    Log-out
                  </Link>
                </li>
                </span>
            )}
          </ul>
        </nav>
    );
  }
}
