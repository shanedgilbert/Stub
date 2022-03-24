import React, {useState} from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import ListUpdate from '../jsx/ListChange';
import {deleteList} from '../../actions/lists.js';
import {updateList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
//import { editListName } from '../../api';

function List(prop){

  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteList(payload));
  }
  const handleEdit = (payload, e) => {
    console.log("List.jsx update fn" + payload + " E: " + e);
    dispatch(editListName(payload, e));
    window.location.reload(false);//code here refreshes
  }

  const handleAddShow = () => {
    console.log("List.jsx handleAddShow: " + prop.shows + ", " + prop._id);
    dispatch(addListShow(prop._id, [...prop.shows, "hello"]));
  }

    return (

        <div className="listButton">
        <Link to={"/lists/"+prop.name}>
          <div className="listHeaderDiv">
          <h3 className="listHeader">{prop.name}</h3>
          </div>
          </Link>
          <div className="listItem">
            <div className="dropdown">
              <button className ="editButton">dropdown</button>
              <div className="editMenuContent">
                <button className="dropdownLink" onClick={() => handleEdit(prop._id, "testing one two")}>Edit</button>
                <button className="dropdownLink" onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
  );
}
  // <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handle_submit}>
  //     <div className = {classes.addListButton}>
  //         <div class = 'dropdown'>
  //             <div class = 'addListContent'>
  //                 <div className = {classes.addListButtonDropDown}>
  //                     <TextField className = {classes.addListTextField} style = {{margin: '5% 10%'}} name = "name" variant = "filled" label = "List Name" margin = "normal" InputLabel inputlabelprops = {{ shrink: true}} required value = {prop._id} onChange = {(e) => name}/>
  //                     <Button className = {classes.addListSubmit} variant = "contained" size = "large" type = "submit">
  //                         Submit
  //                     </Button>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
 //</form>
 
export default List;
