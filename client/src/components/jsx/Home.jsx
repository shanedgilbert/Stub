import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import Shows from './components/Shows/Shows';
// import { getShows } from './actions/shows';
import useStyles from './styles';
import { Navigation } from '.';

function Home(){

    // const [currentId, setCurrentId] = useState(0);
    // const dispatch = useDispatch();
    const classes = useStyles();
  
    // useEffect(() => {
    //   dispatch(getShows());
    // }, [currentId, dispatch]);

    return (
    <div>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            {/* <Grid item xs={12} sm={7}>
              <Shows setCurrentId={setCurrentId} />
            </Grid> */}
          </Grid>
        </Container>
      </Grow>
    </div>
    )
};


export default Home;
