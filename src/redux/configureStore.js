import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Campsites } from './campsites';
import { Comments  } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//createForms is a helper function from the react/redux library. It
//makes it easy to set up reducers to update the state whenever new 
//form values are submitted. It is designed to be used with this 
//redux function combineReducers
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
            //we'll pass createForms to combineReducers as one of the arguments
            //using the spread syntax and giving it an argument that contains a
            //model name for the entire form, we'll call feedbackForm. We will 
            //give it the InitialFeedback object for the inital form state.
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};