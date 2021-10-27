import {PROMOTIONS } from '../shared/promotions';

//all reducers take 2 parameters. The 1st is the existing or current state.
export const Promotions = (state = PROMOTIONS, action) => {
    switch(action.type) {
        default:
            return state;
    }
}