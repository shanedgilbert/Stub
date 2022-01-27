import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Show from './Show/Show';
import useStyles from './styles';

const Shows = ({ setCurrentId }) => {
  const shows = useSelector((state) => state.shows);
  const classes = useStyles();

  return (
    !shows.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {shows.map((show) => (
          <Grid key={show._id} item xs={12} sm={6} md={6}>
            <Show show={show} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Shows;
