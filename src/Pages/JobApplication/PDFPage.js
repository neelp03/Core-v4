import React, { Component } from 'react';
import './pdfpage.css';
import Highlighter from 'react-highlight-words';
import Header from '../../Components/Header/Header';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from 'react-pro-sidebar';

const headerProps = {
  title: 'Highlight Text Page'
};

class PDFPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeText: 'Hi there! :)',
      keyWords: 'Hi',
      activeIndex: -1,
      caseSensitive: false,
    };
    this.updateResumeText = this.updateResumeText.bind(this);
    this.updateKeyWords = this.updateKeyWords.bind(this);
  }

  updateResumeText(event) {
    this.setState({resumeText: event.target.value});
  }

  updateKeyWords(event) {
    this.setState({keyWords: event.target.value});
  }

  render() {
    const searchWords = this.state.keyWords.split(/\s/).filter(word => word);

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
          <div className = 'input-container'>
            <div className = 'input-header'>Insert resume text:</div>
            <div>
              <textarea
                className = 'textbox-words'
                value= {this.state.resumeText} 
                type= 'text'
                onChange={event => this.setState({ resumeText: event.target.value})}
              > 
              </textarea>
              <br/>
            </div>
            <br/>
            <div className='input-header'>Enter the words you want to highlight:</div>
            <div>
              <textarea
                className = 'textbox-words'
                value ={this.state.keyWords} 
                type= 'text' 
                onChange={event => this.setState({ keyWords: event.target.value})}
              ></textarea>
              <br/>
            </div>
            <br/>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight= {this.state.resumeText}
            />
            <br/>
            <br/>
          </div>
        </div>
      </div>
    );
  }
}

export default PDFPage;
