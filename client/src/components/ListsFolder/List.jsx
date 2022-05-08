import React from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {deleteList} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
import useStyles from './styles';
import Modal from 'react-modal';
import {TextField} from '@material-ui/core';
import { useState } from 'react';

import { Card } from '@material-ui/core/';

import middle from '../../images/middle.png';
import sides from '../../images/EmptyList.png'; 

function List(prop){

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteList(payload));
  }
  const handleEdit = () => {
    dispatch(editListName(prop._id, nameVal));
	  //console.log("edit window displayed\n list_id:" + prop._id+ " name val: " + nameVal);
    //window.location.reload(false);//code here refreshes to see database change
  }
  const [display, setDisplay] = useState(false);// for edit modal appearing 
  const [nameVal, setNewName] = useState("");

  const handleModalClose = () => {
	  setDisplay(false);
  }

  function CreatePoster(prop){

    return <img className='listImagePosters' src={prop.shows[prop.i].showInfo.posterURLs.original} alt="movie poster"></img>
  }

  function getListImages(shows){
    if(shows.length >= 1){
      if(3<=shows.length){
        return (<>
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {1} shows = {prop.shows} />
          <CreatePoster i = {2} shows = {prop.shows} />
        </>)
      }
      else if(2===shows.length){
        return (<>
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {1} shows = {prop.shows} />
          <CreatePoster i = {0} shows = {prop.shows} />
        </>)
      }
      else if(1===shows.length){
        return (<>
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {0} shows = {prop.shows} />
          <CreatePoster i = {0} shows = {prop.shows} />
        </>)
      }
      
    }
    else{
      return (
      <>
      <img className='listImagePosters' src={sides} alt="blank image"></img>
      <img className='listImagePosters' src={middle} alt="blank image"></img>
      <img className='listImagePosters' src={sides} alt="blank image"></img>
      </>
      )
    } 
  }

    return (
      <Card className={classes.card}>
      <div className="listButton">
          <div className="areaOfButton">
          <Link className="link-list" to={"/lists/"+prop.name}>
            <div className="listHeaderDiv">
                <div className='listButtonImages'>
                  {getListImages(prop.shows)}
                </div>
            </div>
            <div className='listname-info'>
              <h1 className="listHeader">{prop.name}</h1>
            </div>
          </Link>
            
            <div className="listItem" > 	
              <button className="edit-btn" onClick={() => {setDisplay(true)}}>Edit</button>
			  <Modal 
			  		className="editModal"
			  		isOpen = {display}
					  onRequestClose = {handleModalClose}
					  contentLabel= "New List Name"
            ariaHideApp = {false}
				>
					<div className={classes.title}>Add New List Name</div>
					<form onSubmit = {handleEdit}>
						<TextField id="outlined-basic" label="New List Name" variant="outlined" value={nameVal} onChange= {(e)=>{setNewName(e.target.value)}} />
						<button className="updateNewName" >Update Name</button>
            {/* <h2>List ID:  {temp}</h2>
            <h3>New Name: {nameVal}</h3> */}
					</form>
				</Modal>	
              <button className="delete-btn" onClick={() => handleDelete(prop._id)}>Delete</button>
            </div>
          </div>  
      	</div>
    </Card>
  );
}
export default List;
