import React, {useState, useEffect, createRef} from 'react';
import {Grid, CircularProgress} from '@material-ui/core';

import List from './List/List.js';
import useStyles from './styles';

const Lists = ({ListsArray}) => {
    const classes = useStyles();
    const [elRefs, setElrefs] = useState([]);

    useEffect(() => {
        setElrefs((refs) => Array(ListsArray.length).fill().map((_, i) => refs[i] || createRef()));
    }, [ListsArray]);

    return (
        !ListsArray.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {ListsArray.map((listI, i) => (
                    <Grid ref={elRefs[i]} key={i} item xs={12} sm={12} md={12}>
                <List list={listI}/>
            </Grid>
        ))}
      </Grid>
        )
    );
};

export default Lists;