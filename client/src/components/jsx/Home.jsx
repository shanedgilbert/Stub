import React, { useState, useEffect, useRef } from 'react';
import { Container, Grow, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import {fetchNineShows} from '../../api/index';
import './loader.css'

function Home() {
  const classes = useStyles();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [contentType, setContentType] = useState('movie'); //movie or series
  const [service, setService] = useState('netflix'); //netflix, prime, disney, hbo, hulu, peacock, paramount, apple
  const [sortType, setSortType] = useState('none');
  
  let page = useRef();
  const ref = useRef();
  
  async function loadMoreShows() {
    if(page.current > 2)
    {
      setIsLoading(true);
    }
    await fetchNineShows(contentType, service, page.current, sortType)
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




  useEffect(() => {

    setShows([]);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          if(page.current > 2)
          {
            loadMoreShows();
          }
        }
      })
    }, { rootMargin: '100px' })

    page.current = 1;
    loadMoreShows();

 

    setTimeout(() => loadMoreShows(), 1000); //timeout

    if(ref.current) {
      observer.observe(ref.current)
    }

    return () => 
    {
      observer.disconnect()
     observer.current = null
    
    }

  }, [contentType, service, sortType, ref])

  return (
    <div>
      <Grow in>
      <Container className="homeLists">
      <div className={classes.selectorContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel>Service</InputLabel>
          <Select id="service" value={service} onChange={(e) => setService(e.target.value)}>
            <MenuItem value="netflix">Netflix</MenuItem>
            <MenuItem value="prime">Prime</MenuItem>
            <MenuItem value="disney">Disney</MenuItem>
            <MenuItem value="hbo">HBO</MenuItem>
            <MenuItem value="hulu">Hulu</MenuItem>
            <MenuItem value="peacock">Peacock</MenuItem>
            <MenuItem value="paramount">Paramount</MenuItem>
            <MenuItem value="apple">Apple</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Type</InputLabel>
          <Select id="contentType" value={contentType} onChange={(e) => setContentType(e.target.value)}>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="series">Series</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Sort</InputLabel>
          <Select id="contentType" value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="ratings">Ratings</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
      </div>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Shows ShowsArray={shows} service={service}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <div className={classes.loadingRoller} ref={ref}>{isLoading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : ''}</div>
    </div>
  );
};

export default Home;
