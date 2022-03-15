import React, {useState} from "react";
// import shows from "../reducers/shows";

import List from "../ListsFolder/List";
import ListsJS from "../ListsFolder/Lists.js";
import '../ListsFolder/lists.css';
import tvshows from '../ListsFolder/shows.js';
import makeStyles from './styles';

import {Outlet} from 'react-router-dom'

function Lists() {
  return (
    <div className="listPage">
      <h1 className="listPageHeading">Your Lists</h1>
      <Outlet />

    </div>
  );
}

export default Lists;
