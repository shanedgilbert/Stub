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
        <div>
          <h3 class="listHeader">{prop.name}</h3>
          <div class="listItem">
            <div class="dropdown">
              <button class ="editButton">dropdown</button>
              <div class="editMenuContent">
                <button class="dropdownLink" onClick={ListUpdate.handle_submit}>Edit</button>
                <button class="dropdownLink" onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      //   <h3 class="listHeader">{prop.name}</h3>
      //   <div class="listItem">
      //   </div>
      //   <div>
      //     <button class ="editButton">dropdown</button>
      //     <div class="editMenuContent">
      //       <a href="#">Edit</a>
      //       <a href="#">Delete</a>
      //     </div>
      //   </div>
      // </div>
  );
}

export default List;