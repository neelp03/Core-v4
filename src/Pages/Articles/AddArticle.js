import React, { Component } from 'react';
import ArticleHeader from './ArticleHeader';
import AddArticleForm from './AddArticleForm';
import './add-article.css';

export default class AddArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
    
    };
    console.log(props);
  }



  render() { 
    return ( 
      <div className= 'add-article-container'>
        <ArticleHeader 
          heading = 'Add Articles'
          subheading = 'Tell your story here...'
        />
        <div className='form-container'>
          <AddArticleForm />
        </div>
      </div>
    );
  }
}