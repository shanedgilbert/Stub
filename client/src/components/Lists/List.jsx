import React from 'react';
import './lists.css';
// import EditButton from 'react-edit-button'

function List(prop){
    return (
        <div class="listItem">
          <h3 class="listHeader">{prop.name}</h3>
          <button class ="editButton">dropdown</button>
            <div class="editMenuContent">
             <a href="#">Edit</a>
            <a href="#">Delete</a>
            </div>
        </div>
  );
}

export default List;