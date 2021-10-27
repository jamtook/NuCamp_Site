import {PARTNERS } from '../shared/partners';

//all reducers take 2 parameters. The 1st is the existing or current state.
export const Partners = (state = PARTNERS, action) => {
    switch(action.type) {
        default:
            return state;
    }
}