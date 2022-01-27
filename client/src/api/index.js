import axios from 'axios';

const url = 'http://localhost:5000/shows';

export const fetchShows = () => axios.get(url);
export const createShow = (newPost) => axios.post(url, newPost);
export const rateShow = (id) => axios.patch(`${url}/${id}/rateShow`);
export const updateShow = (id, updatedShow) => axios.patch(`${url}/${id}`, updatedShow);
export const deleteShow = (id) => axios.delete(`${url}/${id}`);
