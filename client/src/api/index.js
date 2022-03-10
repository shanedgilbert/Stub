import axios from 'axios';
import StreamingAPIKey from './StreamingAPIKey';

const DatabaseURL = 'http://localhost:5000/shows';
const DatabaseURLAccounts = 'http://localhost:5000/accounts';
const DatabaseURLLists = 'http://localhost:5000/listsdb';
const APIURL = 'https://streaming-availability.p.rapidapi.com/search/basic';
const key = StreamingAPIKey();
const streamingService = 'netflix';
const contentType = 'movie';

//Create a dropdown for service and type and send the data here


export const fetchShows = () => axios.get(DatabaseURL);
export const createShow = (newShow) => axios.post(DatabaseURL, newShow);
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
  
    console.log(results);
    // console.log(results);
    return results;
  } catch(error) {
    console.log(error);
  }
}

export const fetchAccounts = () => axios.get(DatabaseURLAccounts);
export const createAccount = (newPost) => axios.post(DatabaseURLAccounts, newPost);

//List functions
export const fetchLists = () => axios.get(DatabaseURLLists);
export const createList = (newList) => axios.post(DatabaseURLLists, newList);
export const deleteList = (id) => {axios.delete(`${DatabaseURLLists}/${id}`);}
export const updateList = (listID, newName) => axios.patch(`${DatabaseURLLists}/${listID}`,newName);

export const addListShow = (listID, newShows) => {
  console.log("INDEX.JS ADDLISTSHOW: " + newShows + ", " + listID);
  axios.patch(`${DatabaseURLLists}/${listID}`, {newShows});
} 
export const removeListShow = (listID, newShows) => axios.patch(`${DatabaseURLLists}/${listID}`, newShows);
