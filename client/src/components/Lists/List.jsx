import React from 'react';
import './lists.css';
import editButton from '../../images/edit-icon.png';

function List(prop){
    return (
        <div class="listItem">
          <h3 class="listHeader">{prop.name}</h3>
          <button class ="editButton" src ={editButton} ></button>
          <div class="editMenu">
            <a href="#">Edit Name</a>
            <a href="#">Delete List</a>
          </div>
        </div>
  );
}

export default List;