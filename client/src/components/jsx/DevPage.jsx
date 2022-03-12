import React, { useState, useEffect, useRef } from 'react';

//Show Testing
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Shows from '../../components/Shows/Shows';
import { createShow, getShowsData } from '../../api/index';

function DevPage() {

    //SHOW TESTING
    ////////////////////////////////////////////////////////////////////////////////////////
    const [isLoading, setIsLoading] = useState();
    const [shows, setShows] = useState([]);
    let page = useRef();
    const ref = useRef();

    async function loadMoreShows() 
  {
    console.log('page', page.current)
    if(page.current > 1)
    {
      setIsLoading(true);
    }
    console.log('load more shows!')
    await getShowsData(page.current)
      .then((data) => {
        const moreShows = [];
        data.forEach(function pushAndCreate(element) {
          moreShows.push(element) 
          createShow(element)
        },this);
        //console.log(moreShows)
        
        setShows((shows) => [...shows, ...moreShows]);
        //console.log(shows)

        //console.log(data)
      });
      page.current = page.current + 1;
      setIsLoading(false);     
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting)
      {
        if(page.current != 1)
        {
          console.log('observed')
          loadMoreShows();
        }
      }
    }
    )
  
  },
    { rootMargin: '100px' }
  )



  
  useEffect(() => 
  {
    if(page.current == null)
    {
      page.current = 1;
      console.log('first load')
      loadMoreShows();
    }
      if(ref.current)
      {
        observer.observe(ref.current)
      }
  
  }, [ref]);
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