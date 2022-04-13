import React, { useState } from 'react';
import { Card, CardMedia, Typography } from '@material-ui/core/';
import  Modal  from './Modal.jsx'
import useStyles from './styles';

const Show = ({ show, service }) => {
  const classes = useStyles();
  const imdbRatingNormalized = show.imdbRating/10;

  const [visibility, setVisibility] = useState(false);

  const handleShowModal = () =>  {
    console.log("did not go through")
    setVisibility(true);
  }

  const getServiceLink = (show) =>
  {
    if (show.streamingInfo.hasOwnProperty(service)) {
      return show.streamingInfo[service].us.link
    }
    else {
      return show.streamingInfo[Object.keys(show.streamingInfo)[0]].us.link
    }
  }

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
        </div>
        <Modal onClose={() => setVisibility(false)}
        service = {service}
        show={visibility}
        date= {show.year}
        runtime = {show.runtime}
        title= {show.originalTitle}
        movieImage = {show.backdropURLs.original}
        overview = {show.overview}
        cast = {show.cast}
        link = {getServiceLink(show)}
        showInfo = {show}
        type = {show.type}
        />
      </Card>
  );
};

export default Show;
