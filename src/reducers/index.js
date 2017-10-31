import authentication from './authentication';
import memo from './memo';
import search from './search';
//commentadd
import comment from './comment';


import { combineReducers } from 'redux';

export default combineReducers({
    authentication, memo, search, comment
});
