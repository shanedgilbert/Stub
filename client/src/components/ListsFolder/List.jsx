import React from 'react';
import './lists.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {deleteList} from '../../actions/lists.js';
import {addListShow} from '../../actions/lists.js';
import {editListName} from '../../actions/lists.js';
import useStyles from './styles';
//import Form from '';
//import { Button } from '@material-ui/core';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';

import middle from '../../images/middle.png';
import sides from '../../images/EmptyList.png';

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
  //const [display, setDisplay] = useState(false);// for edit modal appearing 
  //const [newName, setNewName] = useState({name: ""});

  function CreatePoster(prop){
    //console.log(prop.shows)
    return <img className='listImagePosters' src={prop.shows[prop.i].showInfo.posterURLs.original} alt="movie poster"></img>
  }


  function getListImages(shows){
    //console.log(shows)
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
              <button className="edit-btn" onClick={() => handleEdit(prop._id, "testing v1.3 change")}>Edit</button>
			  	{/* <Modal 
				{...props}
				size = "lg"
				aria-labelledby="NameFieldModal"
				centered
				>
				<Modal.Header classname={classes.editListName}>
					<Modal.Title >
						Add New List Name
					</Modal.Title>
				</Modal.Header>
				<Modal.Body classname = {classes.body}>
					<Form>
					<Form.Group className={classes.editListName} >
					<Form.Label>Add New Name</Form.Label>
					<Form.Control
					type="text"
					onInput = {(e)=>setNewName=(e.target.value)}//needs fixing up here
					placeholder="StubListDefault"//gives default ex for user
					autoFocus//may not be necessary unless preparing for blind users
					/>
					</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer classname = {classes.nameSubmit}>
					<Button onClick = {() => handleEdit(prop._id, nameVal)}> Save Changes</Button>
				</Modal.Footer>
				</Modal> */}

              <button className="delete-btn" onClick={() => handleDelete(prop._id)}>Delete</button>
              </div>
          </div>
            
        
          
      </div>
    </Card>
  );
}
export default List;
