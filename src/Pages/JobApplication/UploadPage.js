import React, { Component } from 'react';
import './uploadpage.css';

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDescription: '',
      fileUploadState: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({jobDescription: event.target.value});
  }

  handleSubmit(event) {
    // empty
  }

  fileUploadButton = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = () => {
      this.setState({
        fileUploadState: document.getElementById('fileButton').files[0].name
      });
    };
  }

  render() {
    return (
      <div>
        <div className = 'header'>Resume Upload</div>
        <div className = 'input-container'>
          <div>❶ Upload Your Resume</div>
          <div>
            <input id= 'fileButton' type= 'file' hidden />
            <button className = 'button' className='button-u'
              onClick={this.fileUploadButton}>
              Upload Resume Here</button>
            <br/>
            <div className = 'fileName'>
              {this.state.fileUploadState}
            </div>
          </div>
          <div><br/></div>
          <div>❷ Paste the job description
               into the text box below.</div>
          <textarea className = 'textbox' value={this.state.jobDescription}
            onChange={this.handleChange}></textarea>
          <br/>
          <br/>
          <button className = 'button'>Submit</button>
        </div>
      </div>
    );
  }
}

export default UploadPage;
