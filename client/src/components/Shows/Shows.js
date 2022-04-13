import React, {useState, useEffect, createRef } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Show from './Show/Show';
import useStyles from './styles';

const Shows = ({ ShowsArray, service }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(ShowsArray.length).fill().map((_, i) => refs[i] || createRef()));
  }, [ShowsArray]);

  return (
    !ShowsArray.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {ShowsArray.map((show, i) => (
          <Grid ref={elRefs[i]} key={i} item xs={12} sm={4} md={4}>
            <Show show={show} service = {service}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Shows;
