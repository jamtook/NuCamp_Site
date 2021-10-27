import {COMMENTS } from '../shared/comments';
//update its part of the state when the add comment is dispatched to the store
import * as ActionTypes from './ActionTypes';

//all reducers take 2 parameters. The 1st is the existing or current state.
export const Comments = (state = COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            //this line takes the existing state, which is an array of objects, 
            //and it concatinates the new comment object to the end of the 
            //array, and then it returns that new state to the redux store
            return state.concat(comment);
        default:
            return state;
    }
}

