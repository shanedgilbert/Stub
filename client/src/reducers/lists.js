import {FETCH_ALL, CREATE, UPDATE, DELETE, ADD, REMOVE, EDIT} from  '../constants/actionTypes';

export default (lists = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...lists, action.payload];
        //Not yet changed functions edit: updated following MERN tutorial
        // case UPDATE:
        //     return lists.map((list) => (list.name === action.payload.name ? action.payload : list));
        case EDIT:
            return lists.map((list) => (list.name === action.payload.name ? action.payload : list));
        case REMOVE:
            return lists.filter((list) => list._id !== action.payload);
        default:
            return lists;
    }
};