const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/config.json');
const passport = require('passport');
const membershipState = require('../../util/constants').MEMBERSHIP_STATE;
// get users tag
const Tag = require('../models/Tag');
require('./passport')(passport);


/**
 * Check if the request body contains a token
 * @param {object} request the HTTP request from the client
 * @returns {boolean} if the token exists in the request body
 */
function checkIfTokenSent(request) {
  return request.body.token !== undefined;
}

/**
* @param {object} request the HTTP request from the client
*/
function decodeToken(request){
  const token = request.body.token;
  const userToken = token.replace(/^JWT\s/, '');
  let decodedResponse = null;
  jwt.verify(userToken, secretKey, function(error, decoded) {
    decodedResponse = !error && decoded;
  });
  return decodedResponse;
}

/**
 * Checks if the request token is valid and returns either a valid response
 * or undefined
 * @param {object} request the HTTP request token from the client
 * @param {boolean} accessLevel the lowest accessLevel needed to access that website
 * @param {boolean} role can use role instead of accessLevel
 * @returns {boolean} whether the user token is valid or not
 */
async function checkIfTokenValid(request, accessLevel = membershipState.MEMBER, role = '') {
  
  let decoded = decodeToken(request);

  let response = false;
  let tags = decoded.tags;
  for(i = 0; i < tags.length; i ++){
    if(tags[i].level >= accessLevel || tags[i].role == role){
      response = true;
      break;
    }
  }
  return response;
}

/*
  take an array of tag id and return the tag objects
*/
function getTags(tagsId){
  return Tag.find({'_id': {$in: tagsId}}, (error, tags) => {
    if(error) return null;
    return tags;
  })
}

// take array of tags and calculate the highest access level
function getHighestAccessLevel(tags){
  let highestAccessLevel = 0;
  for(i = 0; i < tags.length; i ++){
    if(tags[i].level > highestAccessLevel)
      highestAccessLevel = tags[i].level;
  }
  return highestAccessLevel;
}

module.exports = {
  checkIfTokenSent,
  checkIfTokenValid,
  decodeToken,
  getTags, 
  getHighestAccessLevel
};
