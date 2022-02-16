import React from 'react';
import './lists.css';
// import EditButton from 'react-edit-button'

function List(prop){
    return (
        <div class="listItem">
          <h3 class="listHeader">{prop.name}</h3>
          <button class ="editButton"></button>
          <div class="editMenuContent">
            <item href="#">Edit</item>
            <item href="#">Delete</item>
          </div>
        </div>
  );
}

export default List;