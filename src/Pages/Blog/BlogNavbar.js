import React, { Component } from 'react';
import './blog-navbar.css';

export default function BlogNavbar(props) {
  return (
    <div className = 'navbar-container'>
      <div className = 'components'>
        <input placeholder="Search blogs..." />
        <a href='/addBlog'>Add Blog</a>
      </div>
    </div>
  );
}

 
