import axios from 'axios';
import dataAPI from './CountAPI';
import {
  PrintApiResponse,
  ApiResponse
} from './ApiResponses';

let config = require('../config/config.json');
let GENERAL_API_URL = process.env.NODE_ENV === 'production' ?
  config.GENERAL_API_URL_PROD : config.GENERAL_API_URL;
let LOGGING_API_URL = process.env.NODE_ENV === 'production' ?
  config.LOGGING_API_URL_PROD : config.LOGGING_API_URL;
let RPC_API_URL = process.env.NODE_ENV === 'production' ?
  config.RPC_API_URL_PROD : config.RPC_API_URL;

/**
 * Return an array similar to python's range() function
 * @param {Number} start
 * @param {Number} end
 */
export const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

/**
 * Checks to see if the printer is available to accept requests!
 */
export async function healthCheck() {
  let status = new ApiResponse();
  await axios.post(RPC_API_URL + '/Printer/healthCheck')
    .then(res => {
      dataAPI('healthCheck', false, '');
      status.reponseData = res.data;
    })
    .catch(err => {
      dataAPI('healthCheck', true, '');
      status.responseData = err;
      status.error = true;
    });
  return status;
}

/**
 * Returns an array of numbers from pages
 * @param {string} pages    String containing array of pages
 * @param {Number} maxPages Number of pages in the document
 */
export function parseRange(pages, maxPages) {
  let result = new Set();
  let pagesFromCommaSplit = pages.split(',');
  pagesFromCommaSplit.forEach(element => {
    const pagesFromDashSplit = element.split('-');
    const arr = range(
      Number(pagesFromDashSplit[0]),
      Number(pagesFromDashSplit[pagesFromDashSplit.length - 1]) + 1
    );
    arr.forEach(element => {
      result.add(element);
    });
  });
  result.delete(0);
  result.forEach(element => {
    if (element > maxPages) result.delete(element);
  });
  if (result.size === 0) {
    let arr = new Set(range(1, maxPages + 1));
    return arr;
  }
  return result;
}

/**
 * Print the page
 * @param {Object} data - Encoded file and its configurations
 * @param {String|undefined} data.raw - Encoded file
 * @param {Number|undefined} data.copies - Number of copies
 * @param {String|undefined} data.sides - Sides to print:
 * one-sided or two-sided
 * @param {String|undefined} data.pageRanges - Pages to print:
 * 1-2, 5, 7-10
 * @returns {ApiResponse} - Containing information for if
 * the page successfully printed
 */
export async function printPage(data) {
  let status = new ApiResponse();
  await axios.post(RPC_API_URL + '/Printer/sendPrintRequest', data)
    .then(response => {
      dataAPI('printPage', false, '');
      status.responseData = response.data.message;
    })
    .catch(() => {
      dataAPI('printPage', true, '');
      status.error = true;
    });
  return status;
}

/**
 * Log the print request
 * @param {Object} data         Encoded file
 * @returns {ApiResponse}  Containing information for if
 *                              the page is printing
 */
export async function logPrintRequest(data) {
  let status = new ApiResponse();
  await axios.post(LOGGING_API_URL + '/PrintLog/addPrintLog', data)
    .catch(() => {
      // Add dataAPI for non-error
      dataAPI('logPrintRequest', true, '');
      status.error = true;
    });
  return status;
}

/**
 * Retrieves all print logs
 * @returns {ApiResponse}  Containing all print logs
 */
export async function getAllLogs() {
  let status = new ApiResponse();
  await axios.get(LOGGING_API_URL + '/PrintLog/getPrintLogs')
    .then(response => {
      dataAPI('getAllLogs', false, '');
      status.responseData = response.data;
    })
    .catch(() => {
      dataAPI('getAllLogs', true, '');
      status.error = true;
    });
  return status;
}

/**
 * Return the number of pages the current user has printed
 * @param {string} email            email of the current user
 * @param {string} token            token of the current user
 * @param {Set(Number)} totalPages  set of all pages to be printed
 * @param {Number} copies           number of copies to be printed
 * @returns {PrintApiResponse}      Returns if user can print, number of pages
 *                                  user can print, and total pages left
 */
export async function getPagesPrinted(email, token, totalPages, copies) {
  let status = new PrintApiResponse();
  await axios
    .post(GENERAL_API_URL+'/user/getPagesPrintedCount', {
      email,
      token
    })
    .then(res => {
      dataAPI('getPagesPrinted', false, '');
      status.canPrint = copies * totalPages.size + res.data <= 30;
      status.remainingPages = 30 - res.data;
    })
    .catch(() => {
      dataAPI('getPagesPrinted', true, '');
      status.error = true;
    });
  return status;
}
