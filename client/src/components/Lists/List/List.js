//Done
import React from 'react';
//import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core/';
import {useDispatch} from 'react-redux';
import useStyles from './styles';

import ListDisplay from "../List";
import '../lists.css';

const List = ({list}) => {
    //const dispatch = useDispatch();
    //const classes = useStyles();

    return (
        <ListDisplay name = {list.name}/>
    )
}

export default List;