import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./modal.css";
import { useDispatch } from 'react-redux';
import {addToList} from "../../../actions/shows";
import { fetchLists } from "../../../api";
import genreNames from "../genre";


const Modal = props => {

  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);


  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    async function getList() {
      const listGet = await fetchLists();
      var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
      listGet.data.forEach(async listElement => {
        if (listElement.ownerID === userID)
        {
          lists.push(listElement);
        }
      })
      console.log(props.title + " LISTS:");
      console.log(lists);
    }
    getList();

    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);


  //ADD SHOW TO LIST
  const handleAddToList = (show, listID) => {
    dispatch(addToList(show, listID));
  }

  ////

  function findMovieGenres(genre){
    let movieGenres = []
    for(let i=0; i<genre.length; i++){
      movieGenres.push(genreNames[genre[i]])
    }
    return movieGenres.join(", ")
  }


  
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>


          <div className="modal-body">

          <div>
            <button onClick={props.onClose} className="button closeButton">
              x
            </button>
            <img src={props.movieImage} alt={props.title} width="899px"></img>
            
          </div>


          <tr className="modalTable">
          
            <td className="modalOverview">
              <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png" alt="streaming logo" width="30"></img></a></h2>
              
              <p><b>Release Date: </b>{props.date} <b>Runtime: </b> {props.runtime} minutes</p>
              <p>{props.overview}</p>
            </td>
            <td className="modalInfo">
              

              {props.cast.length===0 ? null : <p> <b>Cast: </b> {props.cast.join(", ")}</p>}
              {/* {props.cast.join(", ")} */}

              <p><b>Genre: </b> {findMovieGenres(props.showInfo.genres)}</p>
            </td>
            </tr>
          <p>{props.children}</p>
          </div>
          <div className="modal-footer">

            <div className = "dropdown">
              <div className = "editMenuContent">
                  {/* {console.log(genreNames[props.showInfo.genres])} */}
                  {lists.map((listItem, index) => {
                    return (
                      <button key = {listItem} className = "dropdownLink" onClick={() => handleAddToList(props, listItem._id)}>Add to {listItem.name}</button>
                    )
                  })}
                </div>
              <button className = "editButton">Add To List</button>
            </div>

          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
