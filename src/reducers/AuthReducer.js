import {
    FACEBOOK_USER,
    GMAIL_USER
} from '../actions/types';

const INITIAL_STATE = {
    facebookUser: null,
    gmailUser: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACEBOOK_USER:
            return { ...state, facebookUser: action.payload };
        case GMAIL_USER: 
            return { ...state, gmailUser: action.payload };
        default:
            return state;
    }
};
