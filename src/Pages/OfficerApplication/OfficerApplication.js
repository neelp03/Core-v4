import React, { Component } from 'react';
//import SubmissionPage from './SubmissionPage.js';
import './OfficerApplication.css';


class OfficerApplication extends Component {
    constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			gradMonth: '',
			gradYear: '',
			experience: '',
            linkedin: '',
            submitted: 'false',
            enabledMonths: [7,8,9]
        };
        this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleLinkedInChange = this.handleLinkedInChange.bind(this);
		this.handleExperienceChange = this.handleExperienceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    refreshPage() {
        window.location.reload(false);
    }

	handleSubmit(e) {
        e.preventDefault();
		console.log('this happened');
        
        //alert(`Hi ${this.state.name}, your application has been submitted! Please wait 1-2 days for a confirmation email with next steps! Thank you!`);
       if (this.state.experience.indexOf("google.com") === -1){
           console.log("error: wrong resume link"); //alert pops up??  
       }
        //this.addToSpreadsheet().then(this.refreshPage);
        this.setState(
            {
                submitted: true
            }
        )
	}

	handleNameChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		});
	}

	handleMonthChange(e) {
		this.setState({
			gradMonth: e.target.value
		});
	}

	handleYearChange(e) {
		this.setState({
			gradYear: e.target.value
		});
	}

	handleLinkedInChange(e) {
		this.setState({
			linkedin: e.target.value
		});
	}

	handleExperienceChange(e) {
		this.setState({
            experience: e.target.value
		});
    }
    
    handleRefresh(e){
        this.setState({
            submitted: false
        })
    }
    
	render() { 
        if(!this.state.enabledMonths.includes(new Date().getMonth())){
            return(
                <div id="wrapper">
                    <p> 
                       SCE Officer Applications are not available at this time. Please check again later.
                    </p>
                    <p> 
                       Thank you!
                    </p>
                </div>
            ) 
        }
        else {
            return (
                <div id="wrapper" onSubmit={this.handleSubmit}>
                <h2>SCE Officer Application 2020-21</h2>
                <form id="form-area">
                    <div className="form-group">
                        <label className="control-label required" htmlFor="full-name">Name</label>
                        <h5>Enter your first and last name</h5>
                        <input
                            type="text"
                            name="full-name"
                            placeholder="Full Name"
                            onChange={this.handleNameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label required" htmlFor="email">Email</label>
                        <h5>Enter your email address</h5>
                        <input
                            type="email"
                            name="email"
                            placeholder="john.doe@sjsu.edu"
                            onChange={this.handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="control-label required">Graduation Date</label>
                        <div className="row">
                            <div className="col">
                                <h5>Month</h5>
                                <input className="form-control-lg" type="number" placeholder="MM" min="1" max="12" onChange={this.handleMonthChange} required />
                            </div>
                            <div className="col">
                                <h5>Year</h5>
                                <input className="form-control-lg" type="number" placeholder="YYYY" min="2020" onChange={this.handleYearChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label required" htmlFor="resume">Resume</label>
                        <h5>
                            Share a link to your resume (pdf, docx, doc) using <strong>Google Drive</strong>.
                        </h5>
                        <input type="url" placeholder="https://" onChange={this.handleExperienceChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <h5>Please enter the website URL</h5>
                        <input
                            type="url"
                            name="linkedin"
                            placeholder="https://www.linkedin.com/in/"
                            onChange={this.handleLinkedInChange}
                        />
                    </div>
                    <button class="btn btn-info" type="submit">
                        Submit
                    </button>
                </form>
            </div>
            );
        }
        
    }
		
}


export default OfficerApplication;
