import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Shows from './components/Shows/Shows';
import { getShows } from './actions/shows';
import useStyles from './styles';
import memories from './images/stublogo.png';

function Header(){

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
  
    useEffect(() => {
      dispatch(getShows());
    }, [currentId, dispatch]);


    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Stub</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Shows setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
        </div>
    )
};


export default Header;
