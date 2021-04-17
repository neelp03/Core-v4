import React, { Component } from 'react';
import AddBlogNavbar from "./AddBlogNavbar";
import BlogHeader from '../BlogHeader';
import AddBlogForm from './AddBlogForm';
import TextEditor from '../../EmailList/TextEditor';
import './add-blog.css';
import {getAllBlogs, addBlog, editBlog, deleteBlog}
  from '../../../APIFunctions/Blog';
 
export default class AddBlog extends Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: [],
      blogId: '',
      loadedContent: '',
    };
    console.log(props);
  }

  handleEditorChange = (e) => {
    this.setState({loadedContent: e});
    // console.log("hi: ", this.state.loadedContent));
  }

  getBlogs = async () => {
    const res = await getAllBlogs();
    console.log('get res: ', res.responseData);
    if(!res.error){
      this.setState({blogs: res.responseData});
    }
  }

  handleSubmit = async () => {
    const title = document.getElementById('title-span').innerText;
    const description = document.getElementById('description-span').innerText;
    const content = this.state.loadedContent;
    const author = this.props.user.firstName + ' ' + this.props.user.lastName;
    const d = new Date();
    //month is 0 based
    const date = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();

    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Content: ", content);
    console.log("Date: ", date);

    const blog = {
      title: title || 'NULL',
      author: author || 'NULL',
      description: description || 'NULL',
      content:  content || 'NULL',
      date: date || 'NULL'
    };

    const res = await addBlog(blog, this.props.user.token);
    if(!res.error){
      console.log("submitted!");
      this.handleClear();
    }
  }

  handleClear = async () => {
    // console.log("clear");
    await this.getBlogs();
    document.getElementById('title-span').innerText = '';
    document.getElementById('description-span').innerText = '';
    this.setState({loadedContent: "HUH"}, console.log("done: ", this.state.loadedContent));
  }

  render() { 
    return ( 
      <div className= 'add-blog-container'>
        <AddBlogNavbar 
          handleSubmit = {this.handleSubmit}
          handleClear = {this.handleClear}
        />
        <div className = 'header'>
          <span
            className = 'title-textarea'
            contentEditable
            id = 'title-span'
          />
          <span
            className = 'description-textarea'
            contentEditable
            id = 'description-span'
          />
          <TextEditor
            loadedContent={this.loadedContent}
            handleEditorChange={this.handleEditorChange}
          />
        </div>
        
      </div>
    );
  }
}