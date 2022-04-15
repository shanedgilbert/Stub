import React from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {deleteList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
import useStyles from './styles';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';

import white from '../../images/white.jpeg';

//note, function call here , but const in show.js, may be potential error/warning
function List(prop){

  //2 variables below for handleEdit related code
  // const [listData, editListData] = useState({name: '',id: ''});//array to temp store to use later

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = (payload) => {
    dispatch(deleteList(payload));
  }
  const handleEdit = (payload,e) => {
    dispatch(editListName(payload, e));
    window.location.reload(false);//code here refreshes to see database change
  }

  // const handleAddShow = () => {
  //   console.log("List.jsx handleAddShow: " + prop.shows + ", " + prop._id);
  //   dispatch(addListShow(prop._id, [...prop.shows, "hello"]));
  // }

  function CreatePoster(prop){
    console.log(prop.shows)
    return <img className='listImagePosters' src={prop.shows[prop.i].showInfo.posterURLs.original} alt="movie poster"></img>
  }


  function getListImages(shows){
    console.log("djakhjfaesjjaf")
    console.log(shows)
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
      <img className='listImagePosters' src={white} alt="blank image"></img>
      <img className='listImagePosters' src={white} alt="blank image"></img>
      <img className='listImagePosters' src={white} alt="blank image"></img>
      </>
      )
    }
    // console.log("posters: "+imagePosters)
      
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
            
            <div className="listItem">
                <button className="edit-btn" onClick={() => handleEdit(prop._id, "testing one two")}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
          </div>
            
        
          
      </div>
    </Card>
  );
}
export default List;
