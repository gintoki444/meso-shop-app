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

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });



// config for your database
// const config = {
//   server: process.env.MSSQL_SERVER,
//   authentication: {
//     type: 'default',
//     options: {
//       userName: process.env.MSSQL_USERNAME, // update me
//       password: process.env.MSSQL_PASSWORD // update me
//     }
//   },
//   options: {
//     database: process.env.MSSQL_DATABASE,
//     validateBulkLoadParameters: false,
//     encrypt: false,
//   }
// };
// connection.connect((err) => {
//   if (err) {
//     console.log('Error connecting to MySQL Database = ', err)
//     return;
//   }
//   console.log("MySQL successfully connected.");
// })

// mssql.connect(config, function (err) {
//   if (err) {
//     console.log('Error connecting to MSSQL Database = ', err)
//     return;
//   }
//   console.log("MSSQL successfully connected.");
// });


const omiseApiUrl = process.env.OPN_API;
const omiseSecretKey = process.env.OPN_SKEY;
const omisePublicKey = process.env.OPN_PKEY;

const Omise = require('omise')({
  publicKey: omisePublicKey,
  secretKey: omiseSecretKey,
});

app.get('/testgetopn', async (req, res) => {
  try {

    const charge = 'charge';
   
    res.status(200).json(charge);
  } catch (error) {
    console.error('Error creating charge:', error);
    res.status(500).json({ error: 'Error creating charge' });
  }
});

app.get('/testgetopn', async (req, res) => {
  try {

    console.log('omiseApiUrl :', omiseApiUrl)
    console.log('omiseSecretKey :', omiseSecretKey)
    const charge = await getChargeID();

    res.status(200).json(charge);
  } catch (error) {
    console.error('Error creating charge:', error);
    res.status(500).json({ error: 'Error creating charge' });
  }
});


// app.post('/get-token', async (req, res) => {
//   try {
//     const data = req.body;

//     // console.log('omiseApiUrl :',omiseApiUrl)
//     // console.log('omiseSecretKey :',omisePublicKey)
//     const charge = await createSource(data);

//     res.status(200).json(charge);
//   } catch (error) {
//     console.error('Error creating charge:', error);
//     res.status(500).json({ error: 'Error creating charge' });
//   }
// });


// app.post('/create-charges', async (req, res) => {
//   try {
//     const data = req.body;
//     const charge = await createCharge(data);

//     console.log('create-charges', charge)

//     res.status(200).json(charge);
//   } catch (error) {
//     console.error('Error creating charge:', error);
//     res.status(500).json({ error: 'Error creating charge' });
//   }
// });

// app.post('/test-charges', async (req, res) => {
//   try {
//     const data = req.body;
//     const source = await createCharge(data);

//     console.log('create-source', charge)

//     data.source = source;
//         const charge = await createCharge(data);

//     res.json({ status: 'success', charge });
//   } catch (error) {
//     console.error('Error creating source:', error);
//     res.status(500).json({ error: 'Error creating charge' });
//   }
// });

app.post('/create-source', async (req, res) => {
  const {data}= req.body;
  console.log(data);

  try {
    const source = await Omise.sources.create({
      amount:150000,
      currency:'THB',
      type:'mobile_banking_kbank',
    });

    res.json({ success: true, source });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Source creation failed' });
  }
});


app.post('/create-charge', async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const source = await Omise.charges.create(data);

    res.json({ success: true, source });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Source creation failed' });
  }
});
// app.post('/testcreatecharge', async (req, res) => {
//   try {
//     const data = req.body;


//     const source = await createSource(data);

//     data.source = source;
//     const charge = await createCharge(data);

//     res.json({ status: 'success', charge });
//   } catch (error) {
//     console.error('Error creating charge:', error.message);
//     res.status(500).json({ error: 'Error creating charge' });
//   }
// });

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


async function getChargeID() {
  const omiseHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(omiseSecretKey + ':').toString('base64')}`,
  };
  try {
    const response = await axios.get(`${omiseApiUrl}/charges/chrg_test_5y288klnnzwwvqnyrl7`, {
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