import React, { Component } from 'react';
import "./article-card.css";

export default class ArticleCard extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="article-card-container">
        <div className="author-block">
          <img className="author-image" 
            src="https://user-images.githubusercontent.com/25803515/112601743-0ade8000-8dd0-11eb-969e-6e300e2fee34.png"
            alt=""
          />
          <div className="author-name">
            Author Name
          </div>
        </div>
        <div className="description-grid">
          <div className="description-text">
            <div className="description-title">
              This is an article title
            </div>
            <div className="description-info">
              Lorem ipsum. I am just going to write as much as I can here 
              so I can fill some space and test the next line if possible
            </div>
          </div>
          <div className="description-image">
            <img src="https://user-images.githubusercontent.com/25803515/112601141-52b0d780-8dcf-11eb-95ab-03b4af304ce1.jpg" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}