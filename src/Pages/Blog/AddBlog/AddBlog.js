import React, { Component } from 'react';
import AddBlogNavbar from "./AddBlogNavbar";
import BlogHeader from '../BlogHeader';
import AddBlogForm from './AddBlogForm';
import TextEditor from '../../EmailList/TextEditor';
import './add-blog.css';

export default class AddBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    };
    console.log(props);
  }

  

  handleSubmit = () => {
    console.log("submit");
  }

  handleClear = () => {
    console.log("clear");
  }

  render() { 
    return ( 
      <div className= 'add-blog-container'>
        <AddBlogNavbar 
          handleSubmit = {this.handleSubmit}
          handleClear = {this.handleClear}
        />
        <div className = 'header'>
          {/* <input
            className = 'title-input'
            placeholder = 'Title'
          />
          <input
            className = 'description-input'
            placeholder = 'Write description here'           
          /> */}
          <span className = 'title-textarea' contentEditable/>
          <span className = 'description-textarea' contentEditable/>
          <TextEditor />
        </div>
        
      </div>
    );
  }
}