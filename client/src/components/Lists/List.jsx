import React from 'react';
import './lists.css';

function List(prop){
    return (
        <div class="listItem">
          <h3 class="listHeader">{prop.name}</h3>
        </div>
  );
}

export default List;