const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');
const mssql = require('mssql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');
// const path = require('path');

const nodemailer = require('nodemailer');

const fileupload = require("express-fileupload");

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config();

app.use(bodyParser.json());
app.use(
  fileupload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/assets/upload/`,
  })
);

const omiseApiUrl = process.env.OPN_API;
const omiseSecretKey = process.env.OPN_SKEY;
const omisePublicKey = process.env.OPN_PKEY;

const Omise = require('omise')({
  publicKey: omisePublicKey,
  secretKey: omiseSecretKey,
});

app.get('', async (req, res) => {
  try {
    const charge = 'Welcome API';
    res.status(200).json(charge);
  } catch (error) {
    console.error('Error creating charge:', error);
    res.status(500).json({ error: 'Error creating charge' });
  }
});

app.get('/getstatus-charge/:id', async (req, res) => {
  try {
    const chargeId = req.params.id;
    const charge = await getChargeID(chargeId);
    res.status(200).json(charge);
  } catch (error) {
    console.error('Error creating charge:', error);
    res.status(500).json({ error: 'Error creating charge' });
  }
});

app.post('/create-source', async (req, res) => {
  const { data } = req.body;
  console.log(data);

  try {
    const source = await Omise.sources.create({
      amount: 150000,
      currency: 'THB',
      type: 'mobile_banking_kbank',
    });

    res.json({ success: true, source });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Source creation failed' });
  }
});

// Endpoint to generate an Omise token
app.post('/generate-token', (req, res) => {
  const cardDetails = {
    expiration_month: req.body.expiration_month,
    expiration_year: req.body.expiration_year,
    name: req.body.name,
    number: req.body.number,
    security_code: req.body.security_code,
  };

  Omise.tokens.create({ card: cardDetails }, (err, token) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Token creation failed' });
    }

    res.json(token);
  });
});


app.post('/create-charge', async (req, res) => {
  const data = req.body;
  try {
    const source = await Omise.charges.create(data);

    res.json({ success: true, source });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Source creation failed' });
  }
});

async function createSource(data) {
  const omiseHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(omisePublicKey + ':').toString('base64')}`,
  };

  const requestData = data

  try {
    const response = await axios.post(`${omiseApiUrl}/sources`, requestData, {
      headers: omiseHeaders,
    });

    return response.data.id;
  } catch (error) {
    throw error;
  }
}

async function createCharge(data) {
  const omiseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Basic ${Buffer.from(omiseSecretKey + ':').toString('base64')}`,
  };

  const requestData = {
    amount: data.amount,
    currency: data.currency,
    platform_type: data.platform_type,
    type: data.type,
    return_uri: data.return_uri,
    source: data.source,
    description: data.description,
  };

  console.log('requestData: ', requestData)

  try {
    const response = await axios.post(`${omiseApiUrl}/charges`, requestData, {
      headers: omiseHeaders,
    });

    return response;

  } catch (error) {

    return error;
  }
}


async function getChargeID(chargeId) {
  const omiseHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(omiseSecretKey + ':').toString('base64')}`,
  };
  try {
    const response = await axios.get(`${omiseApiUrl}/charges/${chargeId}`, {
      headers: omiseHeaders,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}




app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5001')
  //console.log("test")
})