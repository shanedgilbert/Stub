import {FETCH_ALL, CREATE, UPDATE, DELETE, ADD, REMOVE, EDIT} from  '../constants/actionTypes';

export default (lists = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...lists, action.payload];
        //Not yet changed functions
        /*
        case UPDATE:
            return shows.map((list) => (list.name === action.payload.name ? action.payload : list));
        case DELETE:
            return shows.filter((list) => list.name !== action.payload);
        */
        default:
            return lists;
    }
};