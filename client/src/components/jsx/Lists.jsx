import React from "react";
// import shows from "../reducers/shows";
import List from "../ListsFolder/List";
import '../ListsFolder/lists.css';
import tvshows from '../ListsFolder/shows.js';
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
