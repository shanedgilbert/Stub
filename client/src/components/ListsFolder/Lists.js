import React, {useState, useEffect, createRef} from 'react';
import {Grid, CircularProgress, Container} from '@material-ui/core';
import List from './List/List.js';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const Lists = ({ListsArray}) => {
    const classes = useStyles();
    const [elRefs, setElrefs] = useState([]);

    const currentLists = useSelector((state) => state.lists);
  
    useEffect(() => {
        setElrefs((refs) => Array(ListsArray.length).fill().map((_, i) => refs[i] || createRef()));
    }, [ListsArray]);   

    return (
                //REPLACE FIRST LINE IF WE WANT CIRCULAR LOADING BAR INSTEAD OF TEXT MESSAGE
                !currentLists.length ? <CircularProgress /> : (
                    //!currentLists.length ? <div className={classes.listMessage}> Looks like you don't have any lists!</div> : (
                        <Container className="homeLists">
                        <Grid className={classes.container} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                            {currentLists.map((list) => (
                                list.ownerID !== JSON.parse(localStorage.getItem('userLoginData')).id ? null :
                                    <Grid item xs={12} sm={6} md={4} lg={4}className="listsLayout">
                                        <List list={list}/>
                                    </Grid>
                            ))}            
                        </Grid>
            
                </Container>
                    )
    );
};

export default Lists;