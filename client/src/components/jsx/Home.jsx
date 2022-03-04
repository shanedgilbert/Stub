import React, { useState, useEffect, useRef } from 'react';
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
  let page = useRef();
  const ref = useRef();



  async function loadMoreShows() 
  {
    console.log('load more shows!')
    await getShowsData(page.current)
      .then((data) => {
        const moreShows = [];
        data.forEach(function pushAndCreate(element) {
          moreShows.push(element) 
          createShow(element)
        },this);
        console.log(moreShows)
        setShows((shows) => [...shows, ...moreShows]);
        console.log(shows)

        console.log(data)
      });
      page.current = page.current + 1;
   
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting)
      {
        console.log('observed')
        loadMoreShows();
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
      console.log('first load')
   
      loadMoreShows();
      page.current = 2;
    }
      if(ref.current)
        
        observer.observe(ref.current)
    
  
  }, [ref]);

  return (
    <div>

     {
     console.log('p', page)}       
        <Grow in>
        <Container className="homeLists">
                  <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12}>
                      <Shows ShowsArray = {shows} />
                    </Grid>
                  </Grid>

                  </Container>
              </Grow>
     
        <div class={classes.test} ref={ref}>testin</div>


    </div>
  );
};


export default Home;
