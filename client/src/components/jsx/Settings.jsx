import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { getShowsData } from '../../api/index';
import ListContent from '../Lists/ListContent.jsx';

function Settings() {
  const classes = useStyles();
  const [shows, setShows] = useState([]);

  //Create a dropdown for service and type and send the data to api call
  const [streamingService, setStreamingService] = useState('netflix');
  const [contentType, setContentType] = useState('movie');

  useEffect(() => {
    getShowsData()
      .then((data) => {
        setShows(data);
      })
  }, []);

  console.log(shows);

  return (
  <div>
  <h1>List Title</h1>
  {shows.map((listItem, index) => {
      return (
        <table>
        <ListContent
          key={index}
          id={index}
          title={listItem.originalTitle}
          poster={listItem.posterURLs.original}
          date = {listItem.year}
          overview = {listItem.overview}
        />
        </table>
      );
    })}
  </div>
  )
}

export default Settings;
