import React, { Component } from 'react';
import AddArticleNavbar from "./AddArticleNavbar";
import ArticleHeader from '../ArticleHeader';
import AddArticleForm from './AddArticleForm';
import TextEditor from '../../EmailList/TextEditor';
import './add-article.css';

export default class AddArticle extends Component {
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
      <div className= 'add-article-container'>
        <AddArticleNavbar 
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