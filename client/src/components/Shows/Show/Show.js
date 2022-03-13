import React, { useState, setState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import {addToList} from "../../../actions/shows";
import handleAddShow from "../../ListsFolder/List.jsx";
import {fetchLists} from "../../../api/index.js";
import "./Show.css";

import useStyles from './styles';

const Show = ({ show }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const imdbRatingNormalized = show.imdbRating/10;

  const [lists, setLists] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const handleCloseModal = () => {
    setVisibility(false);
  }
  const handleShowModal = () =>  {
    setVisibility(true);
  }

  //ADD SHOW TO LIST
  const handleAddToList = (show, listID) => {
    dispatch(addToList(show, listID));
  }

  useEffect(() => {
    /*getShowsData()
      .then((data) => {
        setShows(data);
      })
    */
      async function getList() {
        const listGet = await fetchLists();
        var userID = JSON.parse(localStorage.getItem('userLoginData')).id;
        listGet.data.forEach(async listElement => {
          if (listElement.ownerID == userID)
          {
            lists.push(listElement);
          }
        })
        console.log(lists);
      }
      getList();
  }, []);


  ////

  return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} onClick={handleShowModal} image={show.posterURLs.original || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={show.title} />
        <div className={classes.overlay}>
          <Typography variant="h6" onClick={handleShowModal}>{show.originalTitle}</Typography>
          <Typography variant="body2" onClick={handleShowModal}>{show.year}</Typography>
        </div>
        <div className={classes.overlay3}>
          <Typography variant="body2">IMDB: {imdbRatingNormalized}/10</Typography>
        </div>
        <div className={classes.overlay2}>
          {/* <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(show._id)}><MoreHorizIcon fontSize="default" /></Button> */}
        </div>
        <Modal className={classes.modal} show={visibility} onHide={handleCloseModal} backdrop={true}>
          <Modal.Header className={classes.modal}>
            <Modal.Title className={classes.modal}>
              <Typography variant="h6">{show.originalTitle}</Typography>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes.modal}>
            <Typography variant="body2" component="h2">{show.cast.map((cast) => `${cast}, `)}</Typography>            
          </Modal.Body>
          {/* <Modal.Body>
            <Typography variant="body2" color="textSecondary" component="p">{show.overview}</Typography> */}
            {/* <Typography className={classes.title} variant="h5" component="h2">{show.tagline}</Typography> */}
          {/* </Modal.Body> */}
          
          {/*TODO: List ID is currently hard coded. A drop down selector is needed here */}
          <div className = "dropdown">
            <button className = "editButton">Add To List</button>
            <div className = "editMenuContent">
              {lists.map((listItem, index) => {
                return (
                  <button key = {listItem} className = "dropdownLink" onClick={() => handleAddToList(show, listItem._id)}>Add to {listItem.name}</button>
                )
              })}
            </div>
          </div>
          {/*<button onClick={() => handleAddToList(show, "622da00f66a3720ab8c40dd5")}>Add to list</button>*/}
        </Modal>
      </Card>
  );
};

export default Show;
