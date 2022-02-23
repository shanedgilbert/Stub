import React from 'react';
import './lists.css';
import ListChange from '.components/jsx/ListChange';

function List(prop){
    return (
        <div>
          <h3 class="listHeader">{prop.name}</h3>
          <div class="listItem">
            <div class="dropdown">
              <button class ="editButton">dropdown</button>
              <div class="editMenuContent">
                <a class="dropdownLink" href="#">Edit</a>
                <a class="dropdownLink" href="#">Delete</a>
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