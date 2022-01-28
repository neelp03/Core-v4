const User = require('../models/User');
const config = require('../../config/config.json');
const validatePassword = require('./password');

function getMemberValidationDate(numberOfSemestersToSignUpFor) {
  const today = new Date();
  const membershipValidationDate = new Date();

  // August 1st - January 31st
  const startOfFallMonth = 8;
  const endOfFallMonth = 1;
  const endOfFallDay = 31;

  // January 1st - August 31st
  const startOfSpringMonth = 1;
  const endOfSpringMonth = 8;
  const endOfSpringDay = 31;

  const isFallSemester =
    today.getMonth() >= startOfFallMonth &&
    today.getMonth() < startOfSpringMonth + 12;

  if (isFallSemester) {
    if (numberOfSemestersToSignUpFor === 1) {
      // months are zero indexed??
      membershipValidationDate.setMonth(endOfFallMonth - 1);
      membershipValidationDate.setDate(endOfFallDay);
      membershipValidationDate.setFullYear(
        membershipValidationDate.getFullYear() + 1
      ); // set to next year
    } else if (numberOfSemestersToSignUpFor === 2) {
      membershipValidationDate.setMonth(endOfSpringMonth - 1);
      membershipValidationDate.setDate(endOfSpringDay);
      membershipValidationDate.setFullYear(
        membershipValidationDate.getFullYear() + 1
      ); // set to next year
    }
  } else {
    if (numberOfSemestersToSignUpFor === 1) {
      membershipValidationDate.setMonth(endOfSpringMonth - 1);
      membershipValidationDate.setDate(endOfSpringDay);
    } else if (numberOfSemestersToSignUpFor === 2) {
      membershipValidationDate.setMonth(endOfFallMonth - 1);
      membershipValidationDate.setDate(endOfFallDay);
      membershipValidationDate.setFullYear(
        membershipValidationDate.getFullYear() + 1
      ); // set to next year
    }
  }

  return membershipValidationDate;
}

/**
 * Register a new user.
 * @param {Object} newUser - The user that is to be registered along with
 *                           information about them.
 * @returns {Object} result - Contains three values that inform the requester
 *                            whether or not the request to register was
 *                            successful or not.
 */
async function registerUser(userToAdd){
  let result = {
    userSaved: true,
    message: '',
    status: 'OK'
  };
  if (userToAdd.email && userToAdd.password) {
    const newUser = new User({
      password: userToAdd.password,
      firstName: userToAdd.firstName,
      middleInitial: userToAdd.middleInitial || '',
      lastName: userToAdd.lastName,
      email: userToAdd.email.toLowerCase(),
      major: userToAdd.major || ''
    });

    const membershipValidUntil = getMemberValidationDate(
      userToAdd.numberOfSemestersToSignUpFor
    );
    newUser.membershipValidUntil = membershipValidUntil;

    const testPassword = validatePassword(userToAdd.password);

    if (!testPassword.success) {
      result.userSaved = false;
      result.message = testPassword.message;
      result.status = 'BAD_REQUEST';
      return result;
    }

    await newUser.save()
      .catch(_ => {
        result.userSaved = false;
        result.message = 'Username already exists.';
        result.status = 'CONFLICT';
      });
  } else {
    result.userSaved = false;
    result.message = 'Missing email and password.';
    result.status = 'BAD_REQUEST';
  }
  return result;
}


module.exports = {registerUser};
