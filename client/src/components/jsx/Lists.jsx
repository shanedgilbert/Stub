import React, {useState} from "react";
// import shows from "../reducers/shows";
import List from "../Lists/List";
import ListsJS from "../Lists/Lists.js";
import '../Lists/lists.css';
import tvshows from '../Lists/shows.js';
import makeStyles from './styles';

function Lists() {
  const classes = makeStyles;
  const [lists, setLists] = useState([]);

  return (
    <div className="listPage">
      <h1 className="listPageHeading">Your Lists</h1>
      
      <ListsJS ListsArray={lists}/> 

    </div>
  );
} 

export default Lists;