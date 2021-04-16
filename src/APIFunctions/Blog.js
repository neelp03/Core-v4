import axios from 'axios';
import { ApiResponse } from './ApiResponses';
import { GENERAL_API_URL } from '../config/config.json';

/**
 * Retrieve all blogs.
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the list of blogs
 */
export async function getAllBlogs(){
  let status = new ApiResponse();
  await axios
    .get(GENERAL_API_URL+'/Blog/getBlogs')
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
 * Add a new blog.
 * @param {Object} reqBlogToAdd - The blog that is to be added
 * @param {string} reqBlogToAdd.title - The title of the blog
 * @param {string} reqBlogToAdd.author - The author of the blog
 * @param {string} reqBlogToAdd.body - The body of the blog
 * @param {string} reqBlogToAdd.date - The date of the blog
 * @param {string} token - The user's jwt token for authentication
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the response data
 */
export async function addBlog(reqBlogToAdd, token){
  let status = new ApiResponse();
  const BlogToAdd = {
    title: reqBlogToAdd.title,
    author: reqBlogToAdd.author,
    body: reqBlogToAdd.body,
    date: reqBlogToAdd.date,
  };
  await axios
    .post(GENERAL_API_URL+'/Blog/addBlog', {token, ...blogToAdd})
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
 * Edit a preexisting blog.
 * @param {Object} reqBlogToEdit - The blog that is to be edited
 * @param {string} reqBlogToEdit.title - The title of the blog
 * @param {string} reqBlogToEdit.author - The author of the blog
 * @param {string} reqBlogToEdit.body - The body of the blog
 * @param {string} reqBlogToEdit.date - The date of the blog
 * @param {string} token - The user's jwt token for authentication
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the response data
 */
export async function editBlog(reqBlogToEdit, token){
  let status = new ApiResponse();
  const BlogToEdit = {
    _id: reqBlogToEdit._id,
    title: reqBlogToEdit.title,
    author: reqBlogToEdit.author,
    body: reqBlogToEdit.body,
    date: reqBlogToEdit.date
  };
  await axios
    .post(GENERAL_API_URL+'/Blog/editBlog', {token, ...blogToEdit})
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
 * Delete a preexisting blog.
 * @param {Object} reqBlogToDelete - The blog that is to be deleted
 * @param {string} reqBlogToDelete._id - The id of the blog
 * @param {string} token - The user's jwt token for authentication
 * @returns {Promise<ApiResponse>} Containing any error information related
 * to the request or the response data
 */
export async function deleteBlog(reqBlogToDelete, token){
  let status = new ApiResponse();
  await axios
    .post(GENERAL_API_URL+'/Blog/deleteBlog',
      { token, _id: reqBlogToDelete._id })
    .then(res => {
      status.responseData = res.data;
    })
    .catch(() => {
      status.error = true;
    });
  return status;
}
