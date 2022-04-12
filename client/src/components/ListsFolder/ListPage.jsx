import './lists.css';
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Settings from "../jsx/Settings";


function ListPage() {

  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
  }, [postSlug]);

  console.log(postSlug);

  return (
    <div>
    <div class="container">
      <h2>{postSlug}</h2>
      <Settings />
    </div>
    </div>
  );
}

export default ListPage;
