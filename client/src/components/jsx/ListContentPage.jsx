import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from '../Shows/Shows';
import useStyles from './styles';
import { Navigation } from '.';
import { getShowsData, fetchLists } from '../../api/index';
import ListContent from '../ListsFolder/ListContent.jsx';


function ListContentPage() {
  const classes = useStyles();
  const [shows, setShows] = useState([]);

  //Create a dropdown for service and type and send the data to api call
  const [streamingService, setStreamingService] = useState('netflix');
  const [contentType, setContentType] = useState('movie');

  useEffect(() => {
    /*getShowsData()
      .then((data) => {
        setShows(data);
      })
    */
      async function getList() {
        var URL = window.location.href.split("/");
        const listGet = await fetchLists();
        var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
        listGet.data.forEach(async listElement => {
          if (listElement.ownerID == userID && listElement.name == URL[4])
          {
            console.log(listElement.ownerID + " == " + userID);
            console.log(listElement.name + " == " + URL[4]);
            console.log(listElement._id);
            if (listElement.shows == null)
            {
              setShows([]);
            }
            else {
              setShows(listElement.shows);
            }
          }
        });
      }
      getList();
  }, []);

  //console.log(shows);
  //console.log(shows.length);

  return (
    (shows == null || shows.length == 0) ? (
      <div>
        <h1>This list is empty</h1>
      </div> 
    ):(
  <div>
  <table>
  {shows.map((listItem, index) => {
      return (
          <ListContent
            key={index}
            id={index}
            imdbRating = {listItem.imdbRating}
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
  </div>)
  )
}

export default ListContentPage;
