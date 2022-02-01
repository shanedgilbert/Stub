import React from 'react';
import './lists.css'

function List(prop){
    return (
        <div class="item">
        <img src={prop.imgURL}></img>
        </div>
  );
}

export default List;