import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import StreamingAPIKey from './StreamingAPIKey';

// import { getShows } from './actions/shows.js';
// import { createShow } from './actions/shows.js';

const key = StreamingAPIKey();

const ShowAPI = () => {

  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/basic',
    params: {
      country: 'us',
      service: 'hulu',
      type: 'movie',
      genre: '18',
      page: '1',
      output_language: 'en',
      language: 'en'
    },
    headers: {
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
      'x-rapidapi-key': key
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  return null;
}
export default ShowAPI;