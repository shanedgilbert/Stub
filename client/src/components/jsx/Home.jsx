import React, { useState, useEffect, useRef } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { createShow, getShowsData, fetchNineShows, fetchShows } from '../../api/index';
import ServiceChanger from './ServiceChanger';
import './loader.css'
function Home(){
  const classes = useStyles();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [contentType, setContentType] = useState('series');
  const [service, setService] = useState('paramount');

  //Create a dropdown for service and type and send the data to api call
  let page = useRef();
  const ref = useRef();
  
  async function loadMoreShows()

  {
    if(page.current > 2)
    {
      setIsLoading(true);
    }
    console.log(page.current);
    await fetchNineShows(contentType, service, page.current)
      .then((data) => {
        const moreShows = [];
        data.forEach(function pushAndCreate(element) {
          moreShows.push(element)
        },this);
        setShows((shows) => [...shows, ...moreShows]);
      });

    page.current = page.current + 1;
    setIsLoading(false);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting)
      {
        if(page.current > 2)
        {
          loadMoreShows();
        }
      }
    }
    )
  },
    { rootMargin: '100px' }
  )

  useEffect(() => 
  {

    if(page.current == null)
    {
      page.current = 1;   //Pre-fills home page with first page of api calls
      loadMoreShows();
    }
    if(page.current == 1) 
    {
      page.current += 1;  //Pre-fills home page with another set of api calls
      
      loadMoreShows();
    }
      if(ref.current)
      {
        observer.observe(ref.current)
      }

  }, [ref]);

  return (
   
    <div>
      <Grow in>
      <Container className="homeLists">
      <ServiceChanger></ServiceChanger>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Shows ShowsArray = {shows} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <div className={classes.loadingRoller} ref={ref}>{isLoading ? <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : ''}</div>

    </div>
  );
};

export default Home;
