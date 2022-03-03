import React, {useState} from "react";
import { Link } from "react-router-dom";
import arrayOfLists from "./ListArray";
import ListPage from "./ListPage";
import List from './List';
import ListsJS from './Lists';
import makeStyles from './styles';


function ListsPage() {
  const classes = makeStyles;
  const [lists, setLists] = useState([]);
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
