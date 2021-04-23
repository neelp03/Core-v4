import axios from 'axios';
import { UserApiResponse } from './ApiResponses';

let config = require('../config/config.json');
let GENERAL_API_URL = process.env.NODE_ENV === 'production' ?
  config.GENERAL_API_URL_PROD : config.GENERAL_API_URL;

export async function getAllTags(token){
    let status = new UserApiResponse()
    // get all tag
    await axios.post(GENERAL_API_URL + '/Tag/getTags',{})
    .then(result => {
        status.responseData = result.data
    })
    .catch(()=>{
        status.error = true;
    })
    return status;
}