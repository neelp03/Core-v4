import React, { Component } from 'react';
import './add-article-navbar.css';

export default function AddArticleNavbar(props) {
  return (
    <div className = 'add-navbar-container'>
      <div className = 'add-navbar-components'>
        <span>
          Add Article
        </span>
        <button onClick = {props.handleSubmit}>
          Submit
        </button>
        <button onClick = {props.handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

 
