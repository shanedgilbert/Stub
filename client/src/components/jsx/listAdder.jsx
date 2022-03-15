import React, { useState, useEffect } from 'react';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import {getLists} from '../../actions/lists.js';
import {createList} from '../../actions/lists.js';

//import { getLists, createList } from '.../actions/lists.js';

function ListAdder()
{
    const [listData, setListData] = useState({name: '', ownerID: '', shows: []});
    const classes = useStyles();
    const dispatch = useDispatch({});

    useEffect(() => {
        dispatch(getLists());
    }, [listData, dispatch]);

    const handle_submit = (e) => {
        e.preventDefault();
        //setListData({...listData, ownerID: JSON.parse(localStorage.getItem('userLoginData')).id})
        listData.ownerID = JSON.parse(localStorage.getItem('userLoginData')).id;
        console.log("list Added");
        dispatch(createList(listData));
        clearText();
    }

    const clearText = () => {
        setListData({name: '', ownerID: '', shows: []})
    }

    return (
        <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handle_submit}>
            <div className = {classes.addListButton}>
                <div class = 'dropdown'>
                    <img className = {classes.buttonImg} src = {require("../../images/listAdd.png")}/>
                    <div class = 'addListContent'>
                        <div className = {classes.addListButtonDropDown}>
                            <TextField className = {classes.addListTextField} style = {{margin: '5% 10%'}} name = "name" variant = "filled" label = "List Name" margin = "normal" InputLabel inputlabelprops = {{ shrink: true}} required value = {listData.name} onChange = {(e) => setListData({...listData, name: e.target.value})}/>
                            <Button className = {classes.addListSubmit} variant = "contained" size = "large" type = "submit">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
       </form>
       
    )
}

export default ListAdder;