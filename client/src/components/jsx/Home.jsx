import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { createShow, getShowsData } from '../../api/index';

function Home(){
  const classes = useStyles();
  const [shows, setShows] = useState([]);

  //Create a dropdown for service and type and send the data to api call
  const [streamingService, setStreamingService] = useState('netflix');
  const [contentType, setContentType] = useState('movie');

  useEffect(() => {
    getShowsData()
      .then((data) => {
        setShows(data);
        data.forEach(element => {createShow(element)});
        console.log(data)
      })
  }, []);

  return (
  <div>
    <Grow in>
      <Container className="homeLists">
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Shows ShowsArray = {shows} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </div>
  )
};


export default Home;
