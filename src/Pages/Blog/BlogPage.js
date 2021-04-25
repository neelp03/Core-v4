import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import BlogHeader from './BlogHeader';
import BlogNavbar from './BlogNavbar';
import {getAllBlogs, addBlog, editBlog, deleteBlog}
  from '../../APIFunctions/Blog';
import {Button} from 'reactstrap';
import BlogCard from './BlogCard';
import './blog-page.css';

export default class BlogPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: [],
      blogId: '',
    };
  }

  componentDidMount = async () => {
    await this.getBlogs();
    if(this.state.blogs.length > 0){
      this.setState({blogId: this.state.blogs[0]._id});
    }
    await this.getBlogId();
  }

  getBlogs = async () => {
    const res = await getAllBlogs();
    console.log('get res: ', res.responseData);
    if(!res.error){
      this.setState({blogs: res.responseData});
    }
  }

  getBlogId = async () => {
    if (this.state.blogId !== '') {
      console.log('Poggers');
    } else {
      console.log('Hi');
    }
  }

  addBlog = async () => {
    const blog = {
      title: 'Hi in Spanish',
      author: 'Justin Zhu',
      body: 'Hola Senior',
      date: '02/19/2021'
    };
    // console.log('user: ', this.props.user);
    // console.log('Blog: ', Blog);
    const res = await addBlog(blog, this.props.user.token);
    console.log('add res: ', res);
  }

  editBlog = async () => {
    const blog = {
      _id: this.state.blogId || '',
      author: 'haxor'
    };

    const res = editBlog(blog, this.props.user.token);
    console.log('edit res: ', res);
  }

  deleteBlog = async () => {
    const blog = {
      _id: this.state.blogId || ''
    };

    const res = await deleteBlog(blog, this.props.user.token);
    console.log('delete res: ', res);
  }

  cardOnClick = (id) =>{
    console.log("hi: ", id);
  }

  render() {
    const headerProps = {
      heading: 'SCE Blogs',
      subheading: 'Learn more about our members'
    };
    return (
      <div>
        {/* <Header {...headerProps}/> */}
        <BlogNavbar />
        <div className='blog-navbar-spacing'/>
        {/* <button onClick={this.getBlogs}>Get</button> */}
        <BlogHeader {...headerProps}/>
        <div className = "blog-card-section">
          {this.state.blogs.map((blog, index) => {
            return(
              <BlogCard
                key={index}
                blog={blog}
                click={this.cardOnClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
