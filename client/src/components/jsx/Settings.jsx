import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../../components/Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { fetchLists, getShowsData } from '../../api/index';
import ListContent from '../ListsFolder/ListContent.jsx';


function Settings() {
  const classes = useStyles();
  const [pageList, setPageList] = useState(null)
  const [shows, setShows] = useState([]);

  //Create a dropdown for service and type and send the data to api call
  const [streamingService, setStreamingService] = useState('netflix');
  const [contentType, setContentType] = useState('movie');

  useEffect(() => {
    async function getListShows() {
      try {
        var URL = decodeURI(window.location.href).split("/");
        const listGet = await fetchLists();
        var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
        listGet.data.forEach(listElement => {
          if (listElement.ownerID === userID && listElement.name === URL[4]) {
            setPageList(listElement);
            if (listElement.shows == null) {
              console.log("NULL");
              setShows([]);
            }
            else {
              setShows(listElement.shows);
            }
          }
        })
      }
      catch (error)
      {
        console.log(error.message);
      }
    }
    getListShows();
  }, [shows]);

  return (
  <div>
  <table>
  {shows.map((listItem, index) => {
      return (
        <ListContent
          key={index}
          id={index}
          imdbRating = {listItem.showInfo.imdbRating}
          title={listItem.showInfo.originalTitle}
          poster={listItem.showInfo.posterURLs.original}
          date = {listItem.showInfo.year}
          tagline = {listItem.showInfo.tagline}
          overview = {listItem.showInfo.overview}
          cast = {listItem.cast.map((cast) => `${cast}, `)}
          showID = {listItem.showInfo._id}
          listID = {pageList._id}
          imdbid = {listItem.showInfo.imdbID}
        />
      );
    })}
    </table>
  </div>
  )
}

export default Settings;
