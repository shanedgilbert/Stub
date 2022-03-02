import React from 'react';
import './lists.css';
import {useDispatch} from 'react-redux';
import ListUpdate from '../jsx/ListChange';
import {deleteList} from '../../actions/lists.js';

function List(prop){

  const dispatch = useDispatch({});
  const handle_delete = () =>
  {
    var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
    console.log("DELETE" + prop.name + ", " + userID);
    dispatch(deleteList(prop.name, userID))
  }

    return (
        <div>
          <h3 class="listHeader">{prop.name}</h3>
          <div class="listItem">
            <div class="dropdown">
              <button class ="editButton">dropdown</button>
              <div class="editMenuContent">
                <button class="dropdownLink" onClick={ListUpdate.handle_submit}>Edit</button>
                <button class="dropdownLink" onClick={handle_delete}>Delete</button>
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