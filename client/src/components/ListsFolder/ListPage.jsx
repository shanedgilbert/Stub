import './lists.css';
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ListContentPage from "../jsx/ListContentPage";


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
      <ListContentPage />
    </div>
    </div>
  );
}

export default ListPage;
