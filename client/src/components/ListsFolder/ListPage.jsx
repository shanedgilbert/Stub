import './lists.css';
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Settings from "../jsx/Settings";
import { Link } from "react-router-dom";

function ListPage() {

  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [postSlug]);

  console.log(postSlug);

  return (
    <div>
      <div className = "listPageHeader">
        <Link to="/lists">
          <img src={require("../../images/Back-Icon.png")} width = "30px" height = "30px"/>
        </Link>
        <h2>{postSlug}</h2>
        <div width = "25px"/>
      </div>
      <div class="container">
        <Settings />
      </div>
    </div>
  );
}

export default ListPage;
