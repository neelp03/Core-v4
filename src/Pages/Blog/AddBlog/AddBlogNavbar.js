import React, { Component } from 'react';
import './add-blog-navbar.css';

export default function AddBlogNavbar(props) {
  return (
    <div className = 'add-navbar-container'>
      <div className = 'add-navbar-components'>
        <span>
          Add Blog
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

 
