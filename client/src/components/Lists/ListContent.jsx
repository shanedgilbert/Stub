import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import { rateShow } from '../../actions/shows';
import useStyles from '../Shows/Show/styles';

function ListContent(prop){
  const dispatch = useDispatch();
  const classes = useStyles();
  const imdbRatingNormalized = prop.imdbRating/10;

  return(
    <div>
      <tr class="listContent">
        <td>
          <img class="moviePosterList" src={prop.poster} alt="Girl in a jacket" width="256" height="384" />
        </td>
        <td class="listMovieInfo">
          <p><b class="titleMovie">{prop.title}</b> {prop.date}</p>
          <p><b>Cast:</b> {prop.cast}</p>
          <p><b>Overview:</b> {prop.overview}</p>
        </td>
        </tr>
    </div>
  )
}

export default ListContent;
