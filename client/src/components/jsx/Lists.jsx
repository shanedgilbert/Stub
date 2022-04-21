import React from "react";
import '../ListsFolder/lists.css';
import {Outlet} from 'react-router-dom'

function Lists() {
  return (
    <div className="listPage">
      <Outlet />
    </div>
  );
}

export default Lists;
