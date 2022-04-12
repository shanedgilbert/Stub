//Done
import React from 'react';
//import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core/';

import ListDisplay from "../List.jsx";
import '../lists.css';

const List = ({list}) => {
    return (
        <ListDisplay name = {list.name} _id = {list._id} shows = {list.shows}/>
    )
}

export default List;