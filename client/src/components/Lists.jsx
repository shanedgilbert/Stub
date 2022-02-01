import React from "react";
// import shows from "../reducers/shows";
import List from "./Lists/List";
import './Lists/lists.css';
import tvshows from './Lists/shows.js';

function Lists() {
  return (
    <div class="listPage">
      <h3 class="scrollTitle">Favorites</h3>
      <div class="wrapper">
        <section id="section1">
          <a href="#section3" class="arrow__btn">‹</a>
          <List 
            imgURL= {tvshows[0].imgURL}
          />
            <List 
            imgURL= {tvshows[1].imgURL}
          />
            <List 
            imgURL= {tvshows[2].imgURL}
          />
            <List 
            imgURL= {tvshows[3].imgURL}
          />
          <a href="#section2" class="arrow__btn">›</a>
        </section>
        <section id="section2">
          <a href="#section1" class="arrow__btn">‹</a>
          <List 
            imgURL= {tvshows[4].imgURL}
          />
            <List 
            imgURL= {tvshows[5].imgURL}
          />
            <List 
            imgURL= {tvshows[6].imgURL}
          />
            <List 
            imgURL= {tvshows[7].imgURL}
          />
          <a href="#section3" class="arrow__btn">›</a>
        </section>
          <section id="section3">
          <a href="#section2" class="arrow__btn">‹</a>
          <List 
            imgURL= {tvshows[0].imgURL}
          />
            <List 
            imgURL= {tvshows[0].imgURL}
          />
            <List 
            imgURL= {tvshows[0].imgURL}
          />
            <List 
            imgURL= {tvshows[0].imgURL}
          />
          <a href="#section1" class="arrow__btn">›</a>
          </section>
      </div>

    </div>
  );
}

export default Lists;