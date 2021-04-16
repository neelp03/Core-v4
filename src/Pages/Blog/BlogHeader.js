import React, { Component } from 'react';
import './blog-header.css';

export default function BlogHeader(props) {
  const { heading, subheading } = props;
  const headerImage = 
    'https://user-images.githubusercontent.com/25803515/113383393-ae7fe100-9338-11eb-9e14-7a2fef4a3db4.png'
  
  return (
    <div className = 'header-container'>
      <div className = 'header-grid'>
        <div className ='grid-text'>
          <div className='text-heading'>
            { heading }
          </div>
          <div className='text-subheading'>
            { subheading }
          </div>
        </div>
        <div className ='grid-image'>
          <img className = 'actual-image' src = {headerImage}/>
        </div>
      </div>
    </div>
  );
}

 
