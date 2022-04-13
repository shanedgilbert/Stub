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
export const fetchNineShows = async (type,service,page,sortType) => 
{
  try {
    const { data } = await axios.get(`${DatabaseURL}/${type}/${service}/${page}/${sortType}`);

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
    const { data } = await axios.get(APIURL, options);
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
    }
  });
} 

export const removeListShow = async (listID, showRemove) => {
  const listGet = await axios.get(DatabaseURLLists)
  listGet.data.forEach(async list => {
    if (list._id === listID) {
      var tempArray = [];
      list.shows.map(currShow => {
        if(currShow.showInfo._id !== showRemove)
        {
          tempArray.push(currShow);
        }
        list.shows = tempArray;
      })
      const res = await axios.patch(`${DatabaseURLLists}/${listID}`, list);
    }
  });
}

export const editListName = async(listID, newListName) =>{
  const listGet = await axios.get(DatabaseURLLists)
  listGet.data.forEach(async list =>{
    if (list._id == listID){
      list.name = newListName;//maybeee
      const res = await axios.patch(`${DatabaseURLLists}/${listID}`, list);
    }
  });
}