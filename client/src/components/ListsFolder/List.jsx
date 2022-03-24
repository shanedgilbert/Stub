import React, {useState} from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {deleteList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
import useStyles from './styles';
//import { editListName } from '../../api';

function List(prop){

  //2 variables below for handleEdit related code
  const classes = useStyles();
  const [listData, editListData] = useState({name: '',id: ''});//array to temp store to use later

  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteList(payload));
  }
  const handleEdit = (payload,e) => {
    //console.log("List.jsx update fn (array appearance)-> E: " + e);
    console.log("List.jsx update fn: id: "+ payload+" E: " + e);
    //e.preventDefault();
    //dispatch(editListName(listData.id, listData.name));
    dispatch(editListName(payload, e));
    window.location.reload(false);//code here refreshes to see database change
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
                <button className="dropdownLink" onClick={() => handleEdit(prop._id, "testing v1.2 change")}>Edit</button>
                <button className="dropdownLink" onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
  );
}
//commented code below incase my changes are bad and faulty
/* <form autoComplete='off' noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleEdit}>
                      <div className = {classes.addListButton}>
                          <div class = 'dropdown'>
                              <div class = 'addListContent'>
                                  <div className = {classes.addListButtonDropDown}>
                                      <TextField className = {classes.addListTextField} style = {{margin: '5% 10%'}} name = "name" variant = "filled" label = "New Name" margin = "normal" InputLabel inputlabelprops = {{ shrink: true}} value = {listData.name} onChange = {(e) =>({...listData, name: e.target.value, id:prop._id})}/>
                                      <Button className = {classes.addListSubmit} variant = "contained" size = "large" type = "submit">
                                          Submit
                                      </Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                </form> */

export default List;
