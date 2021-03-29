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
function checkIfTokenValid(request, accessLevel = membershipState.MEMBER, role = '') {
  let decoded = decodeToken(request);
  let response = false;
  
  // need to convert all tags id into tags first then check
  return Tag.find({'_id':{$in:decoded.tags}}, (error, tags) => {
    if(error) return response;
    for(i = 0; i < tags.length; i++){
      console.log(tags[i])
      if(tags[i].level >= accessLevel || tags[i].role == role) {
        response = true;
        break;
      }
    }
    return response;
  });
  // let response = decoded && decoded.accessLevel >= accessLevel;
  // return response;
}

module.exports = {
  checkIfTokenSent,
  checkIfTokenValid,
  decodeToken
};
