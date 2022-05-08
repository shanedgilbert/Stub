import React, { useState, useEffect } from 'react';
import {TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import {getLists} from '../../actions/lists.js';
import {createList} from '../../actions/lists.js';
//import InputLabel from '@material-ui/core/InputLabel';

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
        listData.ownerID = JSON.parse(localStorage.getItem('userLoginData')).id;
        dispatch(createList(listData));
        clearText();
    }

    const clearText = () => {
        setListData({name: '', ownerID: '', shows: []})
    }

    return (
        <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handle_submit}>
            <div className = {classes.addListButton}>
                <div className = 'dropdown'>
                    <img className = {classes.buttonImg} src = {require("../../images/listAdd.png")} alt=""/>
                    <div className = 'addListContent'>
                        <div className = {classes.addListButtonDropDown}>
                            <TextField className = {classes.addListTextField} style = {{margin: '5% 10%'}} name = "name" variant = "filled" label = "List Name" margin = "normal" inputlabelprops = {{ shrink: true}} required value = {listData.name} onChange = {(e) => setListData({...listData, name: e.target.value})}/>
                            <Button className = {classes.addListSubmit} variant = "contained" size = "large" type = "submit">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
       </form>
    )}

export default ListAdder;