import React from "react";
import { Link } from "react-router-dom";
import arrayOfLists from "./ListArray";
import List from "./List"


function ListPage() {
  return (
    <div className="home">
      <div class="container">
      {arrayOfLists.map((listName, index) => {
          return (
            <Link to={"/lists/"+listName.name}>
              <h2>{listName.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ListPage;
