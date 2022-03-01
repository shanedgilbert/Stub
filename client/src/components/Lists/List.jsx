import React from 'react';
import './lists.css';
import ListUpdate from '../jsx/ListChange';

function List(prop){
    return (
        <div>
          <h3 class="listHeader">{prop.name}</h3>
          <div class="listItem">
            <div class="dropdown">
              <button class ="editButton">dropdown</button>
              <div class="editMenuContent">
                <button class="dropdownLink" onClick={ListUpdate.handle_submit}>Edit</button>
                <a class="dropdownLink" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Delete</a>
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