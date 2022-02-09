import axios from 'axios';
import StreamingAPIKey from './StreamingAPIKey';

const DatabaseURL = 'http://localhost:5000/shows';
const APIURL = 'https://streaming-availability.p.rapidapi.com/search/basic';
const key = StreamingAPIKey();
const pageNumber = 2;
const streamingService = 'netflix';
const contentType = 'movie';

//Create a dropdown for service and type and send the data here
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

export const fetchShows = () => axios.get(DatabaseURL);
export const createShow = (newPost) => axios.post(DatabaseURL, newPost);
export const rateShow = (id) => axios.patch(`${DatabaseURL}/${id}/rateShow`);
export const updateShow = (id, updatedShow) => axios.patch(`${DatabaseURL}/${id}`, updatedShow);
export const deleteShow = (id) => axios.delete(`${DatabaseURL}/${id}`);

export const getShowsData = async () => {
  try {
    // const { data : { results } } = await axios.get(APIURL, options);
    const { data } = await axios.get(APIURL, options);
    // console.log(data.total_pages);
    const { results } = data;
    // console.log(results);
    return results;
  } catch(error) {
    console.log(error);
  }
}