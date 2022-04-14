const express = require('express');
const router = express.Router();
const Team = require('../models/team.js');
const { OK, BAD_REQUEST, NOT_FOUND } =
  require('../../util/constants').STATUS_CODES;
const {
  PRESIDENT,
  VICE_PRESIDENT,
  TREASURER,
  EP_CHAIR,
  PR_CHAIR,
  DEV_LEADS,
  EPPR_TEAM,
  DEV_TEAM
 } = require('../../util/constants').TEAM_ROLES;


/**
 *
 * \GET
 *    - getExec { role enum } = gets execs
 *    - gets EP/PR { role enum } = gets eppr team
 *    - gets dev { role enum } = gets dev team
 *
 * \POST 'newOfficer' { everything from schema }
 *
 * \POST 'editOfficer' { stuff to edit, _id }
 *
 * \DELETE 'deleteOfficer' { _id }
 *
 */

/**
 * Gets the executive board members of SCE
 * https://www.mongodb.com/docs/manual/reference/operator/query/lte/
 */

router.get('/getExec', (req, res) => {
    Team.find({ roles: { $lte: DEV_LEADS } }, (err, execs) => {
        if (err) {
        res.status(BAD_REQUEST).send(err);
        } else {
        res.status(OK).send(execs);
        }
    });
});

router.get('/getEPPR', (req, res) => {
    Team.find({ roles: EPPR_TEAM }, (err, eppr) => {
        if (err) {
        res.status(BAD_REQUEST).send(err);
        } else {
        res.status(OK).send(eppr);
        }
    });
}

router.get('/')
