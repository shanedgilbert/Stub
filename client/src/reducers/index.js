import { combineReducers } from 'redux';

import shows from './shows';
import lists from './lists';

export const reducers = combineReducers({ shows, lists });
