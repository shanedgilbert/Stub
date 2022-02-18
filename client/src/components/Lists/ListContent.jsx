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
  console.log("show: "+prop.title);

  return(
    <div>
      <tr>
        <td>
          <img src={prop.poster} alt="Girl in a jacket" width="500" height="600" />
        </td>
        <td>
          <h2>{prop.title}</h2>
          <h3>{prop.date}</h3>
          <p>{prop.overview}</p>
        </td>
        </tr>
    </div>
  )
}

export default ListContent;
