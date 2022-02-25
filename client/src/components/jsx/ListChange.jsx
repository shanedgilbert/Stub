import React, { useState, useEffect } from 'react';
import {Container, AppBar, Typography, Grow, Grid, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import useStyles from './styles';
import {getLists} from '../../actions/lists.js';
import {updateList} from '../../actions/lists.js';
// import { deleteList } from '../../actions/lists.js';


// function ListRemove()
// {
//     const [listData, setListData] = useState({name: '', ownerID: '', shows: []});
//     const classes = useStyles();
//     const dispatch = useDispatch({});

//     const remove_Submit = (ds) =>{
//         ds.preventDefault();
        
//     }
//     return 
//     (
//         <div>
            
//         </div>
//     )

// }

function ListUpdate()
{
    const [listData, getListData] = useState({name: '', ownerID: '', shows: []});
    const classes = useStyles();
    const dispatch = useDispatch({});

    useEffect(() => {
        dispatch(getLists());
    }, [listData, dispatch]);

    //errors will form if odd info added; new list name is end goal here
    const handle_submit = (e) => {
        e.preventDefault();
        getListData({...listData, ownerID: JSON.parse(localStorage.getItem('userLoginData')).id})
        listData.name = "people are great";
        console.log("list updated");
        dispatch(updateList(listData));
    }
    //still need to change to appropriate menu
    // return (
    //     <div>
    //         <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handle_submit}>
    //             <Typography variant = 'h6' align = 'center'>
    //                 Edit List
    //             </Typography>
    //             <div>
    //             <TextField name = "name" variant = "outlined" label = "Name" margin = 'normal' InputLabelProps={{ shrink: true }} required fullWidth value = {listData.name} onChange = {(e) => getListData({...listData, name: e.target.value})}/>
    //             <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size = "medium" type = "submit" >
    //                 Submit
    //             </Button>
    //             </div>
    //         </form>
    //     </div>
    // )
}

//export default ListRemove;
export default ListUpdate;