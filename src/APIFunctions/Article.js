import axios from 'axios';
import { ApiResponse } from './ApiResponses';
import { GENERAL_API_URL } from '../config/config.json';

/**
 * Retrieve all articles.
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the list of articles
 */
export async function getAllArticles(){
  let status = new ApiResponse();
  await axios
    .get(GENERAL_API_URL+'/Article/getArticles')
    .then(res =>{
      status.responseData = res.data;
    })
    .catch(err=>{
      status.responseData = err;
      status.error = true;
    });
  return status;
}

/**
 * Add a new article.
 * @param {Object} reqArticleToAdd - The article that is to be added
 * @param {string} reqArticleToAdd.title - The title of the article
 * @param {string} reqArticleToAdd.author - The author of the article
 * @param {string} reqArticleToAdd.body - The body of the article
 * @param {string} reqArticleToAdd.date - The date of the article
 * @param {string} token - The user's jwt token for authentication
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the response data
 */
export async function addArticle(reqArticleToAdd, token){
  let status = new ApiResponse();
  const articleToAdd = {
    title: reqArticleToAdd.title,
    author: reqArticleToAdd.author,
    body: reqArticleToAdd.body,
    date: reqArticleToAdd.date,
  };
  await axios
    .post(GENERAL_API_URL+'/Article/addArticle', {token, ...articleToAdd})
    .then(res =>{
      status.responseData = res.data;
    })
    .catch(err=>{
      status.responseData = err;
      status.error = true;
    });
  return status;
}

/**
 * Edit a preexisting article.
 * @param {Object} reqArticleToEdit - The article that is to be edited
 * @param {string} reqArticleToEdit.title - The title of the article
 * @param {string} reqArticleToEdit.author - The author of the article
 * @param {string} reqArticleToEdit.body - The body of the article
 * @param {string} reqArticleToEdit.date - The date of the article
 * @param {string} token - The user's jwt token for authentication
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the response data
 */
export async function editArticle(reqArticleToEdit, token){
  let status = new ApiResponse();
  const articleToEdit = {
    _id: reqArticleToEdit._id,
    title: reqArticleToEdit.title,
    author: reqArticleToEdit.author,
    body: reqArticleToEdit.body,
    date: reqArticleToEdit.date
  };
  await axios
    .post(GENERAL_API_URL+'/Article/editArticle', {token, ...articleToEdit})
    .then(res =>{
      status.responseData = res.data;
    })
    .catch(err=>{
      status.responseData = err;
      status.error = true;
    });
  return status;
}

/**
 * Delete a preexisting article.
 * @param {Object} reqArticleToDelete - The article that is to be deleted
 * @param {string} reqArticleToDelete._id - The id of the article
 * @param {string} token - The user's jwt token for authentication
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the response data
 */
export async function deleteArticle(reqArticleToDelete, token){
  let status = new ApiResponse();
  await axios
    .post(GENERAL_API_URL+'/Article/deleteArticle',
      { token, _id: reqArticleToDelete._id })
    .then(res => {
      status.responseData = res.data;
    })
    .catch(() => {
      status.error = true;
    });
  return status;
}
