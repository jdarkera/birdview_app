import React, { Component } from "react";
import axios from "axios";
import "./RegisterForm.css"

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      userPassword: "",
      userType: "student",
      loginStatus: "offline",
      companyName: "",
      showNewCompanyForm: false,
      isCompanyNew: true,
      companyWebsite: "",
      companyType: "",
      companySize: "",
      companyHeadquaters: "",
      companyFounded: "",
      companySector: "",
      companyAbout: "",
      companies: [],
    };
  }

  handleUserNameChange = event => {
    this.setState({ userName: event.target.value });
    axios
      .post("/users/validateUserName", { userName: event.target.value })
      .then(res => {
        console.log("Username ", res.data.userName, " exists!");
      })
      .catch(err => {
        if (this.state.userName.length > 3 && this.state.userName !== "") {
          console.log("Valid Username!");
        } else {
          console.log("Invalid Username");
        }
      });
  };

  handleUserPasswordChange = event => {
    this.setState({ userPassword: event.target.value });
  };

  handleUserTypeChange = event => {
    this.setState({ userType: event.target.value });
    this.setState({ companyName: "" });

    if(event.target.value === "recruiter"){
      this.getExistingCompanies();
    }else{
      this.setState({
        showNewCompanyForm: false,
        isCompanyNew: false,
      })
    }
  };

  getExistingCompanies = () => {
      axios
        .get("/companies/getCompanies")
        .then(res => {
          console.log(res.data, " is in the database");
      
          this.setState({
            companies: res.data
          })
  
          console.log("companies in state:", this.state.companies);
  
        })
        .catch(err => {
          console.log('error occured during companies retrieval');
        });
  }

  handleCompanyNameChange = event => {
    
    if(event.target.value === "registerNewCompany"){
      this.setState({
        showNewCompanyForm: true,
        isCompanyNew: true,
        companyName: ""
      })
    }else{
      this.setState({
        showNewCompanyForm: false,
        isCompanyNew: false,
      })

      this.setState({
        companyName: event.target.value,
      });
      console.log("companyName selected:", event.target.value);
    }

  };

  handleNewCompanyNameChange = event => {
    this.setState({
      isCompanyNew: true,
      companyName: event.target.value,
    });
    console.log("new companyName selected:", event.target.value);
  }


  handleCompanyWebsiteChange = event => {
    this.setState({ companyWebsite: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  handleCompanyTypeChange = event => {
    this.setState({ companyType: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  handleCompanySizeChange = event => {
    this.setState({ companySize: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  handleCompanyHeadquatersChange = event => {
    this.setState({ companyHeadquaters: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  handleCompanyFoundedChange = event => {
    this.setState({ companyFounded: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  handleCompanySectorChange = event => {
    this.setState({ companySector: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  handleCompanyAboutChange = event => {
    this.setState({ companyAbout: event.target.value }, () => {
      // console.log(event.target.value);
    });
  };

  onSuccessful_Register = () => {
    this.props.onSuccessful_Register();
  };

  componentDidMount() {
    console.log("RegisterFrom componentDidMount");
  }

  componentWillUnmount() {
    console.log("RegisterFrom componentwillunmount");
  }

  handleRegister = event => {
    event.preventDefault();
    const user = {
      userName: this.state.userName,
      userPassword: this.state.userPassword,
      userType: this.state.userType,
      companyName: this.state.companyName,
      loginStatus: this.state.loginStatus
    };
    const company = {
      companyName: this.state.companyName,
      companyWebsite: this.state.companyWebsite,
      companyType: this.state.companyType,
      companySize: this.state.companySize,
      companyHeadquaters: this.state.companyHeadquaters,
      companyFounded: this.state.companyFounded,
      companySector: this.state.companySector,
      companyAbout: this.state.companyAbout,
      companyJobs: [],
      companyReviews: []
    };

    if (user.userType === "recruiter") {
      console.log("Is it a new company?", this.state.isCompanyNew);
    }

    // Add a student or recruiter with known company
    if (
      user.userType === "student" ||
      (user.userType === "recruiter" && !this.state.isCompanyNew)
    ) {
      axios
        .post("/users/add", user)
        .then(res => {
          console.log(res.data.userName, " registered!");
          this.onSuccessful_Register(); // show dashboard
        })
        .catch(err => {
          console.log("An error occured during user registration\n", err);
          alert("User Registration Failed");
          axios
            .post("/users/delete", user)
            .then(res => {
              console.log("User registration is undone");
            })
            .catch(err => {
              console.log("User registration couldn't be undone", err);
              alert("Recruiter rollback failed");
            });
        });
    } else if (user.userType === "recruiter" && this.state.isCompanyNew) {
      // First add user
      axios
        .post("/users/add", user)
        .then(res => {
          // If user registration goes through, then add company
          console.log("User ", res.data.userName, " registered!");
          axios
            .post("/companies/add", company)
            .then(res => {
              console.log("Company ", res.data.companyName, " registered!");
              this.onSuccessful_Register();
            })
            .catch(err => {
              console.log(
                "An error occured during company registration\n",
                err
              );
              alert("Company Registration Failed");
              axios
                .post("/users/delete", user)
                .then(res => {
                  console.log("User registration is undone");
                })
                .catch(err => {
                  console.log("User registration couldn't be undone", err);
                  alert("Recruiter rollback failed");
                });
            });
        })
        .catch(err => {
          console.log("An error occured during user registration\n", err);
          alert("User Registration Failed");
        });
    }
  };

  onCancelClick = () => {
    this.props.onLoginClick();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form className="myRegisterForm">
            <div className="form-group  registerform-group row">
              <label className="registerform-label col" htmlFor="Username">Username (min. 4 characters)</label>
              <input
                type="text"
                className="form-control registerform-control"
                id="userName"
                value={this.state.userName}
                onChange={this.handleUserNameChange}
              />
            </div>
            <div className="form-group  registerform-group row">
              <label className="registerform-label col" htmlFor="Password">Password (min. 4 characters)</label>
              <input
                type="password"
                className="form-control registerform-control"
                id="userPassword"
                value={this.state.userPassword}
                onChange={this.handleUserPasswordChange}
              />
            </div>
            <div className="form-group  registerform-group row">
              <label className="registerform-label col" htmlFor="Occupation">Occupation</label>
              <select
                className="form-control registerform-control"
                id="userType"
                value={this.state.userType}
                onChange={this.handleUserTypeChange}
              >
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {(this.state.userType === "recruiter") ? (
              <div>
                {!this.state.showNewCompanyForm &&
                  <div className="form-group  registerform-group row">
                    <label className="registerform-label col" htmlFor="companyName">Company Name</label>
                    <select
                        className="form-control registerform-control"
                        id="companyName"
                        onChange={this.handleCompanyNameChange}
                      >
                        <option disabled selected>Select one</option>
                        {this.state.companies.map((company) => <option key={company._id} value={company.companyName}>{company.companyName}</option>)}
                        <option value="registerNewCompany">Create one</option>
                      </select>
                  </div>
                }
                {this.state.showNewCompanyForm &&
                <div>
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companyName">Company Name</label>
                      <input
                        type="text"
                        className="form-control registerform-control"
                        id="companyName"
                        value={this.state.companyName}
                        onChange={this.handleNewCompanyNameChange}
                      />
                    </div>     
    
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companyWebsite">Company Website</label>
                      <input
                        type="text"
                        className="form-control registerform-control"
                        id="companyWebsite"
                        value={this.state.companyWebsite}
                        onChange={this.handleCompanyWebsiteChange}
                      />
                    </div>
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companyType">Company Type</label>
                      <input
                        type="text"
                        className="form-control registerform-control"
                        id="companyType"
                        value={this.state.companyType}
                        onChange={this.handleCompanyTypeChange}
                      />
                    </div>
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companySize">Company Size</label>
                      <select
                        className="form-control registerform-control"
                        id="companySize"
                        value={this.state.companySize}
                        onChange={this.handleCompanySizeChange}
                      >
                        <option value="Self-employed">A: Self-employed</option>
                        <option value="1-10 employees">B: 1-10 employees</option>
                        <option value="11-50 employees">C: 11-50 employees</option>
                        <option value="51-200 employees">D: 51-200 employees</option>
                        <option value="201-500 employees">
                          E: 201-500 employees
                        </option>
                        <option value="501-1000 employees">
                          F: 501-1000 employees
                        </option>
                        <option value="1001-5000 employees">
                          G: 1001-5000 employees
                        </option>
                        <option value="5001-10,000 employees">
                          H: 5001-10,000 employees
                        </option>
                        <option value="10,001+ employees">
                          I: 10,001+ employees
                        </option>
                      </select>
                    </div>
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companyHeadquaters">Headquaters Location</label>
                      <input
                        type="text"
                        className="form-control registerform-control"
                        id=""
                        value={this.state.companyHeadquaters}
                        onChange={this.handleCompanyHeadquatersChange}
                      />
                    </div>
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companyFounded">Year Founded</label>
                      <input
                        type="text"
                        className="form-control registerform-control"
                        id="companyFounded"
                        value={this.state.companyFounded}
                        onChange={this.handleCompanyFoundedChange}
                      />
                    </div>
                    <div className="form-group  registerform-group row">
                      <label className="registerform-label col" htmlFor="companySector">Sector</label>
                      <input
                        type="text"
                        className="form-control registerform-control"
                        id="companySector"
                        value={this.state.companySector}
                        onChange={this.handleCompanySectorChange}
                      />
                    </div>
                    <div className="form-group  registerform-group row">
                    <label className="registerform-label col" htmlFor="companyAbout">About Your Company</label>
                    <input
                      type="text"
                      className="form-control registerform-control"
                      id="companyAbout"
                      value={this.state.companyAbout}
                      onChange={this.handleCompanyAboutChange}
                    />
                    </div>
                </div> 
                }
                </div>
              ):null}

            <button
              type="button"
              className="btn btn-success registerform-btn"
              onClick={this.handleRegister}
            >
              Register
            </button>

            <button
              type="button"
              className="btn btn-primary registerform-btn"
              onClick={this.onCancelClick}
            >
              Cancel
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
