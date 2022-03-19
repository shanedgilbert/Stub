import React, { useState, useEffect, useRef } from 'react';

//Show Testing
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Shows from '../../components/Shows/Shows';
import { createShow, getShowsData } from '../../api/index';
let page = 1;
function DevPage() {

    //SHOW TESTING
    ////////////////////////////////////////////////////////////////////////////////////////
    const [isLoading, setIsLoading] = useState();
    const [shows, setShows] = useState([]);
    
    const ref = useRef();

    async function loadMoreShows() 
  {
    console.log('page', page)
    await getShowsData(page)
      .then((data) => {
        const moreShows = [];
        data.forEach(function pushAndCreate(element) {
          console.log(element)
          console.log(element.title)
          moreShows.push(element) 
          createShow(element)
        },this);
        //console.log(moreShows)
        
        setShows((shows) => [...shows, ...moreShows]);
        //console.log(shows)

        //console.log(data)
      });    
  }




  
  useEffect(() => 
  {
  
       loadMoreShows();
       page = page+1;
       setTimeout(10000);
     
  
  });
  ////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div>
        <Grow in>
        <Container className="homeLists">
                  <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12}>
                      <Shows ShowsArray = {shows} />
                    </Grid>
                  </Grid>
                  </Container>
              </Grow>
    </div>
    )
}

export default DevPage;