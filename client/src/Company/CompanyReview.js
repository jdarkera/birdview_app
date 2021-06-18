// Tabs needed: Create job, View Job,
import React, { Component } from 'react';
import axios from 'axios';
// import './CompanyInfo.css';

export default class CompanyReview extends Component {
    constructor(props){
        super(props);

        this.state = {
            displayReviewForm: false,
            displayReviews: true,
            reviews: [ {
                reviewStars: 1,
                reviewDesc: '',
                user: "",
            }],
            givenStars: 3,
            givenDesc: "",
            viewReviewsError: "",
        }

        this.addReview = this.addReview.bind(this);
        this.postReview = this.postReview.bind(this);
        this.handleStars = this.handleStars.bind(this);
        this.handleReviewDesc = this.handleReviewDesc.bind(this);

        this.getReviews();
    }

    addReview() {
        this.setState({displayReviewForm: true});
    }

    handleStars(event) {
        this.setState({givenStars: event.target.value});
    }

    handleReviewDesc(event) {
        this.setState({givenDesc: event.target.value});
    }

    postReview() {

        const review = {
            userName: this.props.userInfo.userName,
            companyName: this.props.companyInfo.name,
            stars: this.state.givenStars,
            desc: this.state.givenDesc,
        }

        axios.post(`/reviews/addReview`, review)
        .then((res) => {
            console.log(res.data);
            // display success message and ask if wanna go back
            this.getReviews();
        })
        .catch((err) => {
            document.getElementById("viewReviewsError").style.color = "red";
            this.setState({
                displayReviewForm: false,
                displayReviews: false,
                viewReviewsError: "There was a problem completing your request. Please try again later.",
            });
            window.scrollTo(0, 0);
        });
    }

    getReviews() {
        axios.get(`/reviews/getReviews?companyName=${this.props.companyInfo.name}`)
        .then((res) => {
            console.log(res.data);

            if (! res.data.length) {
                this.setState({
                    displayReviewForm: true,        // no reviews to show so add your own
                    displayReviews: false,
                    viewReviewsError: "",
                });
            } else {
                // reviews exist
                let currentReviews = [];
                res.data.forEach((review) => {
                    let newReview = {
                        reviewStars: review.stars,
                        reviewDesc: review.desc,
                        user: review.user,
                    };

                    currentReviews.push(newReview);
                });

                this.setState({
                    reviews: currentReviews.reverse(),
                    displayReviewForm: false,
                    displayReviews: true,
                });
            }
        })
        .catch((err) => {
            // display error message
            document.getElementById("viewCompany").style.color = "red";
            this.setState({
                displayReviewForm: false,
                displayReviews: false,
                viewReviewsError: "There was a problem completing your request. Please try again later.",
            });
            window.scrollTo(0, 0);
        });
    }

    render() {
        let componentToServe;

        if (this.state.viewReviewsError === "" && this.state.displayReviewForm) {
            if (this.props.userInfo.userType !== 'recruiter') {
                componentToServe = (<form className="myForm">
                <div className="form-group">
                    <label htmlFor="stars">Rating [1-5]</label>
                    <input type="range" className="form-control" id="reviewStars" min="1" max="5" value={this.state.givenStars} onChange={this.handleStars}/>
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <textarea rows="10" cols="75" className="form-control" id="reviewDesc" value={this.state.givenDesc} onChange={this.handleReviewDesc} />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.postReview}>Post</button>
                <button type="button" className="btn btn-primary" onClick={() => this.setState({displayReviewForm: false, displayReviews: true})}>View Reviews</button>
                <br/><br/>
                </form>);
            } else {
                componentToServe = (
                <h5>No reviews added!</h5>);
            }
        } else if (this.state.viewReviewsError === "" && this.state.displayReviews) {
            componentToServe =  <div className="list-group">
            {this.state.reviews.map((review, ind) => (
                <a key={ind} href="/#" id="review-list" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <h5>{review.user}</h5>
                    <small>Rating: {review.reviewStars}</small>
                    </div>
                    <p>{review.reviewDesc}</p>
                </a>
            ))}</div>;
        } else {
            componentToServe = <p id="viewReviewsError">{this.state.viewReviewsError}</p>
        }
        return (
            <React.Fragment>
                <div className="container">
                {this.props.userInfo.userType !== 'recruiter' && <button id="add-review" class="btn btn-primary float-right" onClick={this.addReview}>Add review</button>}
                <h3>Reviews</h3>
                <br/>
                <hr/>
                {componentToServe}
                </div>
            </React.Fragment>
        );
    }
}
