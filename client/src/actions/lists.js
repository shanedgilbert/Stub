import {FETCH_ALL, CREATE, UPDATE, DELETE, ADD, REMOVE, EDIT, ADDSHOW} from '../constants/actionTypes';

import * as api from '../api/index.js';
import list from '../components/ListsFolder/List/List';

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
// crreated editListName to function as the 'edit' in list pages
export const editListName = (list, newListName) => async(dispatch) =>{
    console.log("ladies and gentlemen we're in");
    console.log(newListName);
    try {
        console.log("list.js in ACTIONS: "+ list.id + " new name: " + newListName);
        const data = await api.editListName(list.id, newListName);
        dispatch({type: EDIT, payload: data});
    }
    catch(error) {
        console.log('ACTIONS/LIST EDITLIST(): ' + error.message);
    }
}

export const addListShow = (id, showsList) => async(dispatch) => {
    try {
        
        console.log("ACTIONS ADDLISTSHOW: " + id);
        const {data} = await api.addListShow(id, showsList);
        console.log(data);
        // console.log("ACTIONS ADDLISTSHOW DATA: " + data.name);
        dispatch({type: ADDSHOW, payload: data})
    }
    catch(error) {
        console.log("error encountered");
        console.log(error.message);
    }
}

export const removeListShow = () => async(dispatch) => {
    try {

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
