import React from "react";
// import shows from "../reducers/shows";
import List from "../Lists/List";
import '../Lists/lists.css';
import tvshows from '../Lists/shows.js';
import { Outlet } from "react-router-dom";

function Lists() {
  return (
    <div>
    <h1>List Page</h1>
    <Outlet />
    </div>
  );
}

export default Lists;
