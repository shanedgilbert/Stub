import React from "react";
import '../ListsFolder/lists.css';
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
