import React from 'react';
import { useDispatch } from 'react-redux';
import imdbLogo from '../../images/imdblogo.png'
import useStyles from '../Shows/Show/styles';
import {removeListShow} from "../../actions/lists";
import "./listContent.css";

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
          <img className="moviePosterList" src={prop.poster} alt="Movie Poster" width="256" height="384" />
        </td>
        <td class="listMovieInfo">
          <div className = "divTitleAndDelete">
          
            <p><b class="titleMovie">{prop.title}</b> {prop.date}</p>
            {/* {getStreamingServices(prop.title)} */}
            
            <button className = "deleteButtonDisplay" onClick = {removeFromList}>
              <img src = {require("../../images/trash.png")} width = "40px" height = "40px"/>
            </button>
          </div>
          <div className='StreamingListBtn'>
          {
                  {
                    'netflix': 
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" 
                        alt="netflix logo" width="70"></img></a>
                        
                      ,
                    'prime' : 
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                        src="https://amazonuk.gcs-web.com/system/files-encrypted/nasdaq_kms/inline-images/Prime_Video_Logo.png" 
                        alt="prime video logo" width="80"></img></a>
                        
                        ,
                    'disney' : 
                      
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                          src="https://logodownload.org/wp-content/uploads/2020/11/disney-plus-logo-1.png" 
                          alt="disney logo" width="70"></img></a>
                          
                          ,
                    'hbo' : 
                      
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                          src="https://static.wikia.nocookie.net/lakewood-plaza-turbo/images/0/0a/HBO_Max_logo.png" 
                          alt="hbo logo" width="90"></img></a>
                          
                          ,
                    'hulu' : 
                      
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Hulu_Logo.svg/1024px-Hulu_Logo.svg.png" 
                        alt="hulu logo" width="70"></img></a>
                        
                        ,
                    'peacock' : 
                      
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                        src="https://www.firstcomicsnews.com/wp-content/uploads/2019/09/Peacock-logo.png" 
                        alt="peacock logo" width="100"></img></a>
                        
                       ,
                    'paramount' : 
                     
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Paramount%2B_logo.png" 
                        alt="paramount logo" width="80"></img></a>
                        
                        ,
                    'apple' : 
                      <a href={prop.link} target="_blank" rel="noopener noreferrer">
                        <img className="streamingLink" 
                        src="https://cdn.iconscout.com/icon/free/png-256/apple-tv-1859952-1575940.png" 
                        alt="apple logo" width="30"></img></a>
                       
                       
                  }[prop.service]
                }
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