import React, {useState} from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import ListUpdate from '../jsx/ListChange';
import {deleteList} from '../../actions/lists.js';
import {updateList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';

function List(prop){

  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    console.log("LIST.JSX: " + payload);
    dispatch(deleteList(payload));
  }
  const handleUpdate = (payload, e) => {
    
    console.log("List.jsx update fn" + payload + " E: " + e);
    dispatch(updateList(payload, e));
  }
  const handleAddShow = (payload) => {
    console.log("LIST.JSX HANDLEADDSHOW(): " + payload + ", " + prop.shows);
    dispatch(addListShow(payload, ["object1", "object2"]));
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
                <button className="dropdownLink" onClick={() => handleUpdate(prop._id, "default")}>Edit</button>
                <button className="dropdownLink" onClick={() => handleDelete(prop._id)}>Delete</button>
                <button className="dropdownLink" onClick={() => handleAddShow(prop._id)}>Show</button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default List;
