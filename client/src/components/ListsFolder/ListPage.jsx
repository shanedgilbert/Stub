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
    <div class="container">
      <div className = "listPageHeader">
        <h2>{postSlug}</h2>
        <Link to="/lists">
          Back
        </Link>
      </div>
      <Settings />
    </div>
    </div>
  );
}

export default ListPage;
