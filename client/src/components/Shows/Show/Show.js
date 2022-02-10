import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import { rateShow } from '../../../actions/shows';
import useStyles from './styles';

const Show = ({ show }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const imdbRatingNormalized = show.imdbRating/10;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={show.posterURLs.original || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={show.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{show.originalTitle}</Typography>
        <Typography variant="body2">{show.year}</Typography>
      </div>
      <div className={classes.overlay3}>
        <Typography variant="body2">IMDB: {imdbRatingNormalized}/10</Typography>
      </div>
      <div className={classes.overlay2}>
        {/* <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(show._id)}><MoreHorizIcon fontSize="default" /></Button> */}
      </div>
      {/* <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{show.cast.map((cast) => `${cast}, `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{show.tagline}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{show.overview}</Typography>
      </CardContent> */}
    </Card>
  );
};

export default Show;
