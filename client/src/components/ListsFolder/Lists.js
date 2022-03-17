import React, {useState, useEffect, createRef} from 'react';
import {Grid, CircularProgress} from '@material-ui/core';

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
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {currentLists.map((list) => (
                    list.ownerID !== JSON.parse(localStorage.getItem('userLoginData')).id ? null :
                        <Grid /*ref={list} key={i}*/ item xs={12} sm={12} md={12}>
                            <List list={list}/>
                        </Grid>
                ))}            
            </Grid>
        )
    );
};

export default Lists;