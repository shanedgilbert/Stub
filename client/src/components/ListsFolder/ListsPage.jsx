import React, {useState} from "react";
import ListsJS from './Lists';

function ListsPage() {
  const [lists] = useState([]);
  console.log(lists);

  return (
    <div className="home">
      <div class="container">
            <ListsJS
              ListsArray={lists}
            />
      </div>
    </div>
  );
}

export default ListsPage;
