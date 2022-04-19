import React from 'react';
import { useDispatch } from 'react-redux';
import imdbLogo from '../../images/imdblogo.png'
import useStyles from '../Shows/Show/styles';
import {removeListShow} from "../../actions/lists";
import "./listContent.css"

function ListContent(prop){
  const dispatch = useDispatch();

  const removeFromList = () => {
    console.log("Removing list...")
    dispatch(removeListShow(prop.listID, prop.showID));
  }

  return(
    <div className = "mainDisplay">
      <tr className="tableDisplay">
        <td>
          <img className="moviePosterList" src={prop.poster} alt="Girl in a jacket" width="256" height="384" />
        </td>
        <td class="listMovieInfo">
          <div className = "divTitleAndDelete">
            <p><b class="titleMovie">{prop.title}</b> {prop.date}</p>
            <button className = "deleteButtonDisplay" onClick = {removeFromList}>
              <img src = {require("../../images/trash.png")} width = "40px" height = "40px"/>
            </button>
          </div>
          <p><a href={"https://www.imdb.com/title/"+prop.imdbid} target="_blank">
                  <img src={imdbLogo} alt="imdb logo" width="50px" className="imdbLogo"></img></a> IMDB Rating: {prop.imdbRating/10}/10</p>
          <p><b>Cast:</b> {prop.cast}</p>
          <p className = "textDisplay"><b>Overview:</b> {prop.overview}</p>
        </td>
        </tr>
    </div>
  )
}

export default ListContent;