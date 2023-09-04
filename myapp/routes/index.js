const express = require('express');

const nodeCache = require('node-cache'); // Using lib node-cache
const config = require('../config');
const { sendResponse, sendErrorResponse } = require('../helpers');
const { default: axios } = require('axios');
// require('isomorphic-fetch');

const appCache = new nodeCache({ stdTTL: 60 }); // 60 seconds
const router = express.Router();
const flightsUrl = config.mock_api_url;

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express - Local Caching' });
});

// APPLY Read-Aside with TTL
router.get('/airports', async (req, res) => {
  try {
    if (appCache.has('airports')) {
      console.log(`[${new Date()}] Get data from Node Cache`);
      const response = appCache.get('airports');
      return sendResponse({ res, responseBody: response });
    } else {
      const options = {
        method: 'GET',
        url: flightsUrl,
        headers: {
          'X-RapidAPI-Key': config.rapid_api_key,
          'X-RapidAPI-Host': config.rapid_api_host,
        }
      }
      const response = await axios.request(options);
      // console.log(response.data);
      if (!response || response.data.length === 0) {
        throw Error(`Response from ${flightsUrl} is empty!`);
      }

      // console.log('Result: ', response.data);

      appCache.set('airports', response.data);
      console.log(`[${new Date()}] Fetch data from API`);
      return sendResponse({res, responseBody: response.data});
    }
  } catch (err) {
    console.log(err);
    return sendErrorResponse({res, responseBody: err.message});
  }
});

// statistical
router.get('/stats',(req,res)=>{
  return res.status(200).send(appCache.getStats());
});

module.exports = router;
