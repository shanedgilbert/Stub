import React, {useState} from "react";
// import shows from "../reducers/shows";
import List from "../Lists/List";
import ListsJS from "../Lists/Lists.js";
import '../Lists/lists.css';
import tvshows from '../Lists/shows.js';
import useStyles from './styles';

function Lists() {
  const classes = useStyles();
  const [lists, setLists] = useState([]);

  return (
    <div>
      <div className={classes.listPageHeading}>
        <h1>Your Lists</h1>
      </div>
      
      <ListsJS ListsArray={lists}/> 

    </div>
  );
} 

export default Lists;