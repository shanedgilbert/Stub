import {FETCH_ALL, CREATE, UPDATE, DELETE, ADD, REMOVE, EDIT, ADDSHOW, REMOVESHOW} from  '../constants/actionTypes';

export default (lists = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...lists, action.payload];
        case EDIT:
            return lists.map((list) => (list.name === action.payload.name ? action.payload : list));
        case REMOVE:
            return lists.filter((list) => list._id !== action.payload);
        case ADDSHOW:
            return lists.map((list) => list._id === action.payload._id ? action.payload : list);
        case REMOVESHOW:
        default:
            return lists;
    }
};