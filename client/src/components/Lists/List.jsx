import React, {useState} from 'react';
import './lists.css';
import {useDispatch} from 'react-redux';
import ListUpdate from '../jsx/ListChange';
import {deleteList} from '../../actions/lists.js';

function List(prop){

  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    console.log("LIST.JSX: " + payload);
    dispatch(deleteList(payload));
  }

    return (
        <div className="listButton">
          <div className="listHeaderDiv">
          <h3 className="listHeader">{prop.name}</h3>
          </div>
          <div className="listItem">
            <div className="dropdown">
              <button className ="editButton">dropdown</button>
              <div className="editMenuContent">
                <button className="dropdownLink" onClick={ListUpdate.handle_submit}>Edit</button>
                <button className="dropdownLink" onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default List;
