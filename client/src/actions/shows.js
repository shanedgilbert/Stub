import { FETCH_ALL, CREATE, UPDATE, DELETE, RATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Retrieves the shows from the DB
export const getShows = () => async (dispatch) => {
  try {
    const { data } = await api.fetchShows();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// Fetches shows from the DB
export const getShow = (type, service, page) => async (dispatch) => {
  try {
    const { data } = await api.fetchNineShows(type, service, page);

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// Creates and sends a show to the DB
export const createShow = (show) => async (dispatch) => {
  try {
    const { data } = await api.createShow(show);
    console.log('cccc')
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// Updates the show's information
export const updateShow = (id, show) => async (dispatch) => {
  try {
    const { data } = await api.updateShow(id, show);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// User ratings. Not used
export const rateShow = (id) => async (dispatch) => {
  try {
    const { data } = await api.rateShow(id);

    dispatch({ type: RATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// Deletes a show from the DB
export const deleteShow = (id) => async (dispatch) => {
  try {
    await api.deleteShow(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

// Adds a show to the DB
export const addToList = (show, listID) => async() => {
  try {
  }
  catch(error) {
      console.log(error.message);
  }
}
