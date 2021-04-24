import React, { Component } from 'react';
import "./blog-card.css";
import {Link} from 'react-router-dom';

export default class BlogCard extends Component {
  constructor(props){
    super(props);
    console.log("dadadada", this.props.blog);
  }
  render() { 
    return (
      <Link to='/' style={{textDecoration: 'none'}}>
        <div className="blog-card" onClick = {()=>this.props.click(this.props.blog._id)}>
          <div className="blog-card-container">
            <div className="author-block">
              <img className="author-image" 
                src="https://user-images.githubusercontent.com/25803515/112601743-0ade8000-8dd0-11eb-969e-6e300e2fee34.png"
                alt=""
              />
              <div className="author-name">
                {this.props.blog.author}
              </div>
            </div>
            <div className="description-grid">
              <div className="description-text">
                <div className="description-title">
                  {this.props.blog.title}
                </div>
                <div className="description-info">
                  {this.props.blog.description}
                </div>
              </div>
              <div className="description-image">
                <img src="https://user-images.githubusercontent.com/25803515/112601141-52b0d780-8dcf-11eb-95ab-03b4af304ce1.jpg" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}