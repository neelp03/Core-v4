import React, { Component } from 'react';
import './article-navbar.css';

export default function ArticleNavbar(props) {
  return (
    <div className = 'navbar-container'>
      <div className = 'components'>
        <input placeholder="Search articles..." />
        <a href='/addArticle'>Add Article</a>
      </div>
    </div>
  );
}

 
