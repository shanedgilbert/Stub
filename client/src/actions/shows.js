import { FETCH_ALL, CREATE, UPDATE, DELETE, RATE, ADDSHOW } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getShows = () => async (dispatch) => {
  try {
    const { data } = await api.fetchShows();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createShow = (show) => async (dispatch) => {
  try {
    const { data } = await api.createShow(show);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateShow = (id, show) => async (dispatch) => {
  try {
    const { data } = await api.updateShow(id, show);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const rateShow = (id) => async (dispatch) => {
  try {
    const { data } = await api.rateShow(id);

    dispatch({ type: RATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteShow = (id) => async (dispatch) => {
  try {
    await api.deleteShow(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const addToList = (show, listID) => async(dispatch) => {
  try {
      
      const data = await api.addListShow(listID, show);
      //dispatch({type: ADDSHOW, payload: data})
  }
  catch(error) {
      console.log(error.message);
  }
}
