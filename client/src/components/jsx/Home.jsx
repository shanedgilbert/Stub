import React, { useState, useEffect, useRef } from 'react';
import { Container, Grow, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import {fetchNineShows} from '../../api/index';
import './loader.css';
import './home.css';
import {getLocalUser} from "../../actions/login";
import { fetchLists } from "../../api";

function Home() {
  const classes = useStyles();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [contentType, setContentType] = useState('movie'); //movie or series
  const [service, setService] = useState('netflix'); //netflix, prime, disney, hbo, hulu, peacock, paramount, apple
  const [sortType, setSortType] = useState('noSort');
  const [genre, setGenre] = useState('noGenre');
  const [year, setYear] = useState('noYear');

  const [lists, setLists] = useState([]);

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      // props.onClose();
    }
  };

  useEffect(() => {
    if (getLocalUser() != null)
    {
      getList();
    }

    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  });

  async function getList() {
    var tempList = [];
    //var tempList2 = [];
    const listGet = await fetchLists();
    var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
    listGet.data.forEach(async listElement => {
      if (listElement.ownerID === userID) {
        var addList = true;
        
        if (addList === true)
        {
          tempList.push({listsList: listElement, isDisplay: true});
        }
        else {
          tempList.push({listsList: listElement, isDisplay: false});
        }
      }
    })
    setLists(tempList);
  }
  
  let page = useRef();
  const ref = useRef();
  
  async function loadMoreShows() {
    if(page.current > 2)
    {
      setIsLoading(true);
    }
    await fetchNineShows(contentType, service, genre, year, page.current, sortType)
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

  }, [contentType, service, sortType,year, genre, ref])

  function convertGenreAndSet(genreNum)
  {
    if(genreNum == 'noGenre')
    {
      setGenre('noGenre')
    }
    else
    {
      setGenre(parseInt(genreNum))
    }
  }

  function convertYearAndSet(year)
  {
    if(year == 'noYear')
    {
      setYear('noYear')
    }
    else
    {
      setYear(parseInt(year))
    }
  }

  return (
    <div>
      <Grow in>
      <Container className="homeLists">
      <div className={classes.selectorContainer}>
        <FormControl className={classes.formControl} style={{color: 'white'}}>
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
            <MenuItem value="noSort">None</MenuItem>
            <MenuItem value="ratings">Ratings</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Genre</InputLabel>
          <Select id="contentType" value={genre} onChange={(e) => convertGenreAndSet(e.target.value)}>
            <MenuItem value="noGenre">None</MenuItem>
            <MenuItem value="1">Biography</MenuItem>
            <MenuItem value="2">Film Noir</MenuItem>
            <MenuItem value="3">Game Show</MenuItem>
            <MenuItem value="4">Musical</MenuItem>
            <MenuItem value="5">Sport</MenuItem>
            <MenuItem value="6">Short</MenuItem>
            <MenuItem value="7">Adult</MenuItem>
            <MenuItem value="12">Adventure</MenuItem>
            <MenuItem value="14">Fantasy</MenuItem>
            <MenuItem value="16">Animation</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="27">Horror</MenuItem>
            <MenuItem value="28">Action</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="36">History</MenuItem>
            <MenuItem value="37">Western</MenuItem>
            <MenuItem value="53">Thriller</MenuItem>
            <MenuItem value="80">Crime</MenuItem>
            <MenuItem value="99">Documentary</MenuItem>
            <MenuItem value="878">Science Fiction</MenuItem>
            <MenuItem value="9648">Mystery</MenuItem>
            <MenuItem value="10402">Music</MenuItem>
            <MenuItem value="10749">Romance</MenuItem>
            <MenuItem value="10751">Family</MenuItem>
            <MenuItem value="10752">War</MenuItem>
            <MenuItem value="10763">News</MenuItem>
            <MenuItem value="10764">Reality</MenuItem>
            <MenuItem value="10767">Talk Show</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          <Select id="contentType" value={year} onChange={(e) => convertYearAndSet(e.target.value)}>
            <MenuItem value="noYear">None</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
            <MenuItem value="2018">2018</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2015">2015</MenuItem>
            <MenuItem value="2014">2014</MenuItem>
            <MenuItem value="2013">2013</MenuItem>
            <MenuItem value="2012">2012</MenuItem>
            <MenuItem value="2011">2011</MenuItem>
            <MenuItem value="2010">2010</MenuItem>
            <MenuItem value="2009">2009</MenuItem>
            <MenuItem value="2008">2008</MenuItem>
            <MenuItem value="2007">2007</MenuItem>
            <MenuItem value="2006">2006</MenuItem>
            <MenuItem value="2005">2005</MenuItem>
            <MenuItem value="2004">2004</MenuItem>
            <MenuItem value="2003">2003</MenuItem>
            <MenuItem value="2002">2002</MenuItem>
            <MenuItem value="2001">2001</MenuItem>
            <MenuItem value="2000">2000</MenuItem>
            <MenuItem value="1999">1999</MenuItem>
            <MenuItem value="1998">1998</MenuItem>
            <MenuItem value="1997">1997</MenuItem>
            <MenuItem value="1996">1996</MenuItem>
            <MenuItem value="1995">1995</MenuItem>
            <MenuItem value="1994">1994</MenuItem>
            <MenuItem value="1993">1993</MenuItem>
            <MenuItem value="1992">1992</MenuItem>
            <MenuItem value="1991">1991</MenuItem>
            <MenuItem value="1990">1990</MenuItem>
            <MenuItem value="1989">1989</MenuItem>
          </Select>
        </FormControl>
      </div>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Shows ShowsArray={shows} service={service} lists = {lists} setLists = {setLists}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <div className={classes.loadingRoller} ref={ref}>{isLoading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : ''}</div>
    </div>
  );
};

export default Home;
