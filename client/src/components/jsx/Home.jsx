import React, { useState, useEffect, useRef } from 'react';
import { Container, AppBar, Typography, Grow, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { createShow, getShowsData, fetchNineShows, fetchShows } from '../../api/index';
import './loader.css'

function Home() {
  const classes = useStyles();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [contentType, setContentType] = useState('series'); //movie or series
  const [service, setService] = useState('netflix'); //netflix, prime, disney, hbo, hulu, peacock, paramount, apple
  const [sortType, setSortType] = useState('ratings');
  
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

  useEffect(() => {
    if(page.current == null) {
      page.current = 1;   //Pre-fills home page with first page of api calls
      loadMoreShows();
    }
    if(page.current == 1) {
      page.current += 1;  //Pre-fills home page with another set of api calls
      
      loadMoreShows();
    }
      if(ref.current) {
        observer.observe(ref.current)
      }
  }, [ref]);

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
