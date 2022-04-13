import React, { useState, useEffect, useRef } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { createShow, getShowsData } from '../../api/index';

let page = 1;
let showCount = 0;
function DevPage() {
    const [shows, setShows] = useState([]);
    const ref = useRef();
    async function loadMoreShows() 
  {
    console.log('page', page)
    await getShowsData(page)
      .then((data) => {
        const moreShows = [];
        data.forEach(function pushAndCreate(element) {
          moreShows.push(element) 
          createShow(element)
          showCount = showCount +1;
        },this);
        setShows((shows) => [...shows, ...moreShows]);
      });    
  }

  useEffect(() => 
  {
       try
       {
       loadMoreShows();
       page = page+1;
       setTimeout(10000);
       }
       catch(error)
       {
         console.log(error);
       }
  });

    return (
        <div>
        <Grow in>
        <Container className="homeLists">
                  <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12}>
              
                    </Grid>
                  </Grid>
                  </Container>
              </Grow>
    </div>
    )}

export default DevPage;