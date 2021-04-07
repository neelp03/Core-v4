import React, { Component } from 'react';
import './uploadpage.css';
import Header from '../../Components/Header/Header';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from 'react-pro-sidebar';

const headerProps = {
  title: 'Resume Upload Page'
};

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
        <Header {...headerProps} />
        <div className='page-container'>
          <ProSidebar className='side-nav'>
            <Menu>
              <MenuItem>
                Resume Upload Page
                <Link to= '/UploadResumePage'/>
              </MenuItem>
              <MenuItem>
                Highlight Text Page
                <Link to= '/HighlighterPage'/>
              </MenuItem>
              <MenuItem>
                Resume Page
                <Link to= '/ResumePage'/>
              </MenuItem>
            </Menu>
          </ProSidebar>
          <div className = 'upload-container'>
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
      </div>
    );
  }
}

export default UploadPage;
