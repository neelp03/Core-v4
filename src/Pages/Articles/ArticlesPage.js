import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import {getAllArticles, addArticle, editArticle, deleteArticle}
  from '../../APIFunctions/Article';
import {Button} from 'reactstrap';
import ArticleCard from './ArticleCard';
import './articles-page.css';

export default class ArticlesPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      articleId: '',
    };
  }

  componentDidMount = async () => {
    await this.getArticles();
    if(this.state.articles.length > 0){
      this.setState({articleId: this.state.articles[0]._id});
    }
    await this.getArticleId();
  }

  getArticles = async () => {
    const res = await getAllArticles();
    console.log('get res: ', res.responseData);
    if(!res.error){
      this.setState({articles: res.responseData});
    }
  }

  getArticleId = async () => {
    if (this.state.articleId !== '') {
      console.log('Poggers');
    } else {
      console.log('Hi');
    }
  }

  addArticle = async () => {
    const article = {
      title: 'Hi in Spanish',
      author: 'Justin Zhu',
      body: 'Hola Senior',
      date: '02/19/2021'
    };
    // console.log('user: ', this.props.user);
    // console.log('article: ', article);
    const res = await addArticle(article, this.props.user.token);
    console.log('add res: ', res);
  }

  editArticle = async () => {
    const article = {
      _id: this.state.articleId || '',
      author: 'haxor'
    };

    const res = editArticle(article, this.props.user.token);
    console.log('edit res: ', res);
  }

  deleteArticle = async () => {
    const article = {
      _id: this.state.articleId || ''
    };

    const res = await deleteArticle(article, this.props.user.token);
    console.log('delete res: ', res);
  }

  render() {
    const headerProps = {
      title: 'Blog Page'
    };
    return (
      <div>
        <Header {...headerProps}/>
        <div className = "test">
          <Button onClick = {this.addArticle}>Add</Button>
          <Button onClick = {this.getArticles} color = "primary">Get</Button>
          <Button onClick = {this.editArticle} color = "danger">Edit</Button>
          <Button onClick = {this.deleteArticle} color = "warning">
            Delete
          </Button>
        </div>
        <div className = "article-card-section">
          <div className="article-card">
            <ArticleCard />
          </div>
        </div>
      </div>
    );
  }
}
