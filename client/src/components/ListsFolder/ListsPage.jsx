import React, {useState} from "react";
import ListsJS from './Lists';
import { Link } from "react-router-dom";
import "./lists.css"
import ListAdder from "../jsx/listAdder.jsx"

function ListsPage() {
  const [lists] = useState([]);
  console.log(lists);

  return (
    <div className="home">
      <div className = "listPageHeader">
        <Link to="/">
          <img src={require("../../images/Back-Icon.png")} width = "30px" height = "30px"/>
        </Link>
        <h2>Your Lists</h2>
        <ListAdder/>
      </div>
      <div class="container">
          <ListsJS
            ListsArray={lists}
          />
      </div>
    </div>
  );
}

export default ListsPage;
