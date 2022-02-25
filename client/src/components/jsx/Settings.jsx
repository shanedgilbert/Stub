import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { getShowsData } from '../../api/index';
import ListContent from '../ListsFolder/ListContent.jsx';

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
  <table>
  {shows.map((listItem, index) => {
      return (

        <ListContent
          key={index}
          id={index}
          title={listItem.originalTitle}
          poster={listItem.posterURLs.original}
          date = {listItem.year}
          tagline = {listItem.tagline}
          overview = {listItem.overview}
          cast = {listItem.cast.map((cast) => `${cast}, `)}
        />

      );
    })}
    </table>
  </div>
  )
}

export default Settings;
