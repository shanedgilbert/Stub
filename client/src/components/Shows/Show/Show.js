import React, { useState, setState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import  Modal  from './Modal.jsx'
import { useDispatch } from 'react-redux';
import {addToList} from "../../../actions/shows";
import handleAddShow from "../../ListsFolder/List.jsx";

import useStyles from './styles';

const Show = ({ show }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const imdbRatingNormalized = show.imdbRating/10;

  const [visibility, setVisibility] = useState(false);

  const handleCloseModal = () => {
    console.log("went through")
    setVisibility(false);
  }
  const handleShowModal = () =>  {
    console.log("did not go through")
    setVisibility(true);
  }

  //ADD SHOW TO LIST
  const handleAddToList = (show, listID) => {
    dispatch(addToList(show, listID));
  }

  ////

  return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} onClick={() => setVisibility(true)} image={show.posterURLs.original || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={show.title} />
        <div className={classes.overlay}>
          <Typography variant="h6" onClick={handleShowModal}>{show.originalTitle}</Typography>
          <Typography variant="body2" onClick={handleShowModal}>{show.year}</Typography>
        </div>
        <div className={classes.overlay3}>
          <Typography variant="body2">IMDB: {imdbRatingNormalized}/10</Typography>
        </div>
        <div className={classes.overlay2}>
          {/* <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(show._id)}><MoreHorizIcon fontSize="default" /></Button> */}
        </div>
        <Modal onClose={() => setVisibility(false)}
        show={visibility}
        date= {show.year}
        runtime = {show.runtime}
        title= {show.originalTitle}
        movieImage = {show.backdropURLs.original}
        overview = {show.overview}
        cast = {show.cast}
        link = {show.streamingInfo.netflix.us.link}
        />
      </Card>
  );
};

export default Show;
