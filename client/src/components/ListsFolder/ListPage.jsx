import React from "react";
import { Link } from "react-router-dom";
import arrayOfLists from "./ListArray";
import List from "./List";
import ListButton from './ListButton';


function ListPage() {
  return (
    <div className="home">
      <div class="container">
      {arrayOfLists.map((listName, index) => {
          return (
            <Link to={"/lists/"+listName.name}>
              <ListButton
                name={listName.name}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ListPage;
