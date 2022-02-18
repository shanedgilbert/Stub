import React from "react";
// import shows from "../reducers/shows";
import List from "../Lists/List";
import '../Lists/lists.css';
import tvshows from '../Lists/shows.js';
import makeStyles from './styles';

function Lists() {
  const classes = makeStyles;
  return (
    <div className="listPage">
      <h1 className="listPageHeading">Your Lists</h1>
      <List 
        name = "favorites"
      />
      <List 
        name = "Best"
      />
      <List 
        name = "Funny"
      />

    </div>
  );
} 

export default Lists;