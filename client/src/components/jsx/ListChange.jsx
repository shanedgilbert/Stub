import React, { useState, useEffect } from 'react';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import {getLists} from '../../actions/lists.js';
import {updateList} from '../../actions/lists.js';
import { deleteList } from '../../actions/lists.js';


function ListDelete()
{
    const [listData, setListData] = useState({name: '', ownerID: '', shows: []});
    const classes = useStyles();
    const dispatch = useDispatch({});

    const deleteSubmit = (ds) =>{
        ds.preventDefault();
    }
    return 
    (
        <div>
            <form autoComplete = 'off' onSubmit={}>

            </form>
        </div>
    )

}

function ListUpdate()
{
    const [listData, setListData] = useState({name: '', ownerID: '', shows: []});
    const classes = useStyles();
    const dispatch = useDispatch({});

    useEffect(() => {
        dispatch(getLists());
    }, [listData, dispatch]);

    //errors will form if odd info added to new list name is end goal here
    const handle_submit = (e) => {
        e.preventDefault();
        //setListData({...listData, ownerID: JSON.parse(localStorage.getItem('userLoginData')).id})
        listData.ownerID = JSON.parse(localStorage.getItem('userLoginData')).id;
        console.log("list updated");
        dispatch(updateList(listData));
    }
    //still need to change to appropriate menu
    return (
        <div>
            <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handle_submit}>
                <Typography variant = 'h6' align = 'center'>
                    Add List
                </Typography>
                <div>
                <TextField name = "name" variant = "outlined" label = "Name" margin = 'normal' InputLabelProps={{ shrink: true }} required fullWidth value = {listData.name} onChange = {(e) => setListData({...listData, name: e.target.value})}/>
                <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size = "medium" type = "submit" >
                    Submit
                </Button>
                </div>
            </form>
        </div>
    )
}

export default ListDelete;
export default ListUpdate;