const express = require('express');
const router = express.Router();
const RFID = require('../models/RFID');
const {
  checkIfTokenSent,
  checkIfTokenValid,
} = require('../../util/token-functions');
const { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND } =
  require('../../util/constants').STATUS_CODES;

const awsIot = require('aws-iot-device-sdk');
const { STATUS_CODES } = require('http');

const device = awsIot.device({
   keyPath: '../../config/private.pem.key',
  certPath: '../../config/cert.pem.crt',
  caPath: '../../config/AmazonRootCA1.pem',
  clientId: 'CentauriServer',
  host: 'ae3c662b19597-ats.iot.us-west-1.amazonaws.com'
});

device
  .on('connect', function() {
    console.log('Connected to AWS IoT!');
    device.subscribe('MessageForNode');
  });

device
  .on('message', function(payload) {
    RFID.findOne(
      {
        message: JSON.parse(payload.toString()).message})
    .then((result) => {
      if (result != null) {
        device.publish('MessageForESP32', 
        JSON.stringify({
          message: OK
        }));
      } else {
        device.publish('MessageForESP32', 
        JSON.stringify({
          message: NOT_FOUND
        }));
      }
    })
    .catch(() => {
      device.publish('MessageForESP32', 
        JSON.stringify({
          message: NOT_FOUND
        }));
    });
  });
let add_RFID = false;
let new_name = null;

router.post('/validateRFID', (req, res) => {
  if (add_RFID) {
    const newRFID = new RFID({
      name: new_name,
      byte: req.body.byte,
    });
    RFID.create(newRFID, (error) => {
      if (error) {
        res.status(BAD_REQUEST).send({check:false});
      } else {
        res.status(OK).send({check:true});
      }
      new_name = null;
      add_RFID = false;
      clearTimeout();
    });
  } else {
    RFID.findOne({ byte : req.body.byte})
      .then((result) => {
        if (result != null) {
          res.sendStatus(OK);
        } else {
          res.sendStatus(NOT_FOUND);
        }
      })
      .catch(() => {
        res.sendStatus(NOT_FOUND);
      });
  }
});

router.post('/createRFID', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.OFFICER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  if (add_RFID) {
    return res.sendStatus(BAD_REQUEST);
  }
  add_RFID = true;
  new_name = req.body.name;
  setTimeout(() => {
    add_RFID = false;
    new_name = null;
  }, 60000);
  return res.sendStatus(OK);
});

router.get('/getRFIDs', (req, res) => {
  RFID.find()
    .then((items) => res.status(OK).send(items))
    .catch((error) => {
      res.sendStatus(BAD_REQUEST);
    });
});

router.delete('/deleteRFID', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.OFFICER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  RFID.deleteOne({ _id: req.body._id })
    .then((result) => {
      if (result.n < 1) {
        return res.sendStatus(BAD_REQUEST);
      } else {
        return res.sendStatus(OK);
      }
    })
    .catch((error) => {
      res.sendStatus(BAD_REQUEST);
    });
});

module.exports = router;
