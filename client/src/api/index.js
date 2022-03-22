import axios from 'axios';
import StreamingAPIKey from './StreamingAPIKey';

const DatabaseURL = 'http://localhost:5000/shows';
const DatabaseURLAccounts = '/accounts';
const DatabaseURLLists = 'http://localhost:5000/listsdb';
const APIURL = 'https://streaming-availability.p.rapidapi.com/search/basic';
const key = StreamingAPIKey(); 
const streamingService = 'netflix';
const contentType = 'series';

//Create a dropdown for service and type and send the data here


export const fetchShows = () => axios.get(DatabaseURL);
export const fetchNineShows = async (type,service,page) => 
{
  try {
    console.log(service)
    // const { data : { results } } = await axios.get(APIURL, options);
    const { data } = await axios.get(`${DatabaseURL}/${type}/${service}/${page}`);
    console.log(data);
    return data;
  } catch(error) {
    console.log(error);
  }
}
export const createShow = async (newShow) =>  axios.post(DatabaseURL, newShow);
export const rateShow = (id) => axios.patch(`${DatabaseURL}/${id}/rateShow`);
export const updateShow = (id, updatedShow) => axios.patch(`${DatabaseURL}/${id}`, updatedShow);
export const deleteShow = (id) => axios.delete(`${DatabaseURL}/${id}`);

export const getShowsData = async (pageNumber) => {
  const options = {
    params: {
      country: 'us',
      service: streamingService,
      type: contentType,
      page: pageNumber
    },
    headers: {
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
      'x-rapidapi-key': key,
    }
  };

  try {
 
    // const { data : { results } } = await axios.get(APIURL, options);
    const { data } = await axios.get(APIURL, options);
    // console.log(data.total_pages);
    const { results } = data;
    return results;
  } catch(error) {
    console.log(error);
  }
}

export const fetchAccounts = () => axios.get(DatabaseURLAccounts);
export const createAccount = (newPost) => {
  axios.post(DatabaseURLAccounts, newPost)
  .then(function (response) {
    console.log(response);
  });
}

//List functions
export const fetchLists = () => axios.get(DatabaseURLLists);
export const createList = (newList) => axios.post(DatabaseURLLists, newList);
export const deleteList = (id) => {axios.delete(`${DatabaseURLLists}/${id}`);}

//Adds shows to a list with matching listID in database
export const addListShow = async (listID, newShows) => {
  const listGet = await axios.get(DatabaseURLLists)
  listGet.data.forEach(async list => {
    if (list._id === listID) {
      list.shows.push(newShows);
      const res = await axios.patch(`${DatabaseURLLists}/${listID}`, list);
      console.log("Show added!");
    }
  });
  
} 

export const removeListShow = async (listID, showRemove) => {
  const listGet = await axios.get(DatabaseURLLists)
  listGet.data.forEach(async list => {
    if (list._id === listID) {
      //console.log("List" + list._id + " removes" + showRemove.showInfo._id);
      list.shows.map(currShow => {
        var tempArray = [];
        if(currShow.showInfo._id != showRemove)
        {
          tempArray.push(currShow);
        }
        list.shows = tempArray;
      })
      const res = await axios.patch(`${DatabaseURLLists}/${listID}`, list);
      console.log("Show removed!");
    }
  });
}

export const editListName = async(listID, newListName) =>{
  const listGet = await axios.get(DatabaseURLLists)
  listGet.data.forEach(async list =>{
    if (list._id == listID){
      list.name = newListName;//maybeee
      const res = await axios.patch(`${DatabaseURLLists}/${listID}`, list);
      console.log("SRC/API/INDEX : New Name updated");
    }
  });

}

//export const updateList = (listID, newName) => axios.patch(`${DatabaseURLLists}/${listID}`,newName);// old code here outdated code rip updates
//export const editListName = (listID, newName) => axios.get(`${DatabaseURLLists}/${listID}`, newName);// need to find correct api call here this here is def wrong right?
