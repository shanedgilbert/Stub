import React from "react";
// import shows from "../reducers/shows";
import List from "../Lists/List";
import '../Lists/lists.css';
import tvshows from '../Lists/shows.js';

function Lists() {
  return (
    <div class="listPage">
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