import React, { Component } from 'react';
import AddBlogNavbar from "./AddBlogNavbar";
import BlogHeader from '../BlogHeader';
import AddBlogForm from './AddBlogForm';
import ImgButtonModal from './ImgButtonModal';
import {Alert} from 'reactstrap';
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
      alertColor: '',
      alertMsg: '',
      alertVisible: false,
      blogImg: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png',
      blogImgInput: '',
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
    // const title = document.getElementById('title-span').innerText;
    // const description = document.getElementById('description-span').innerText;
    // const content = this.state.loadedContent;
    // const author = this.props.user.firstName + ' ' + this.props.user.lastName;
    // const d = new Date();
    // //month is 0 based
    // const date = (d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();

    // console.log("Title: ", title);
    // console.log("Description: ", description);
    // console.log("Content: ", content);
    // console.log("Date: ", date);

    // const blog = {
    //   title: title || 'NULL',
    //   author: author || 'NULL',
    //   description: description || 'NULL',
    //   content:  content || 'NULL',
    //   date: date || 'NULL'
    // };

    // const res = await addBlog(blog, this.props.user.token);
    // if(!res.error){
    //   const alertText = "Add was successful!";
    //   const alertColor = "success";
    //   this.renderAlert(alertText, alertColor);
    //   // console.log("submitted!");
    //   // this.handleClear();
    // }
    // else{
    //   const alertText = "Something went wrong with add!";
    //   const alertColor = "danger";
    //   this.renderAlert(alertText, alertColor);
    // }
    console.log("Submit");
    this.renderAlert("Sumetukk", "success");
  }

  handleClear = async () => {
    // console.log("clear");
    await this.getBlogs();
    document.getElementById('title-span').innerText = '';
    document.getElementById('description-span').innerText = '';
    this.setState({loadedContent: ""});
  }

  blogInputsValid = () => {
    const title = document.getElementById('title-span').innerText;
    const description = document.getElementById('description-span').innerText;
    const content = this.state.loadedContent;

    return (title !== '' && description !== '' && content !== '');
  }

  updateAlertVisible = () => {
    this.setState({alertVisible: !this.state.alertVisible});
  }

  renderAlert = (msg, color) => {
    this.setState({alertColor: color || 'success'});
    this.setState({alertMsg: msg});
    if(this.state.alertVisible === false)
      this.updateAlertVisible();
  }

  updateBlogImgInput = (e) => {
    this.setState({blogImgInput: e});
  }

  handleImgUpload = () => {
    this.setState({blogImg: this.state.blogImgInput});
    console.log("Done");
  }

  handleImgOnError = () => {
    this.setState({blogImg: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'})
  }

  render() { 
    return ( 
      <div className= 'add-blog-container'>
        <AddBlogNavbar
          handleSubmit = {this.handleSubmit}
          handleClear = {this.handleClear}
          blogInputsValid = {this.blogInputsValid}
          renderAlert = {this.renderAlert}
        />
        <div className="spacer"/>
        <Alert
          color={this.state.alertColor}
          isOpen={this.state.alertVisible}
          toggle={this.updateAlertVisible}
        >
          {this.state.alertMsg}
        </Alert>
        <div className = 'form'>
          {/* <div className = 'header'>
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
          </div> */}
          <div className = 'header'>
            <div className = 'header-left'>
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
            </div>
            <div className = 'header-right'>
              <ImgButtonModal
                blogImg = {this.state.blogImg}
                blogImgInput = {this.state.blogImgInput}
                updateBlogImgInput = {this.updateBlogImgInput}
                handleImgUpload = {this.handleImgUpload}
                handleImgOnError = {this.handleImgOnError}
              />
            </div>
          </div>
          <TextEditor
            loadedContent={this.state.loadedContent}
            handleEditorChange={this.handleEditorChange}
          />
        </div>
        
      </div>
    );
  }
}