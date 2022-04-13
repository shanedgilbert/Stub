import React, {useState} from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {deleteList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
import useStyles from './styles';

//note, function call here , but const in show.js, may be potential error/warning
function List(prop){

  //2 variables below for handleEdit related code
  const classes = useStyles();
  const [listData, editListData] = useState({name: '',id: ''});//array to temp store to use later

  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteList(payload));
  }
  const handleEdit = (payload,e) => {
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
export default List;
