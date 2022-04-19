import {FETCH_ALL, CREATE, REMOVE, EDIT, ADDSHOW} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getLists = () => async(dispatch) => {
    try {
        const{data} = await api.fetchLists();
        dispatch({type: FETCH_ALL, payload: data})
    }
    catch(error){
        console.log('ACTIONS/LIST GETLISTS(): ' + error.message);
    }
}

export const createList = (list) => async(dispatch) => {
    try {
        const {data} = await api.createList(list);
        dispatch({type: CREATE, payload: data});
    }
    catch(error){
        console.log('ACTIONS/LIST CREATELIST(): ' + error.message);
    }
}
//Created updatelist information within for the try edit: legacy code
export const updateList = (id, listName) => async(dispatch) => {
    try {
       
    }
    catch(error) {
        console.log('ACTIONS/LIST UPDATELIST(): ' + error.message);
    }
}
// created editListName to function as the 'edit' in list pages
export const editListName = (listID, newListName) => async(dispatch) =>{
    try {
        const data = await api.editListName(listID, newListName);
        dispatch({type: EDIT, payload: data});
    }
    catch(error) {
        console.log('ACTIONS/LIST EDITLIST(): ' + error.message);
    }
}

export const addListShow = (id, showsList) => async(dispatch) => {
    try {
        
        console.log("ACTIONS ADDLISTSHOW: " + id);
        console.log(showsList);
        await api.addListShow(id, showsList);
        //dispatch({type: ADDSHOW, payload: data})
    }
    catch(error) {
        console.log("error encountered");
        console.log(error.message);
    }
}

export const removeListShow = (id, showRemove) => async(dispatch) => {
    try {
        await api.removeListShow(id, showRemove);
        console.log("Show removed");
    }
    catch(error) {
        console.log(error.message);
    }
}

export const deleteList = (id) => async(dispatch) => {
    try {
        await api.deleteList(id);
        dispatch({type: REMOVE, payload: id});
    }
    catch(error) {
        console.log(error.message);
    }
}
