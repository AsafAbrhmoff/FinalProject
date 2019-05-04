import { Actions } from 'react-native-router-flux';
import {
    FACEBOOK_USER,
    GMAIL_USER
} from './types';

export const facebookLoginSuccess = (user) => {
    return (dispatch) => {
        dispatch({
            type: FACEBOOK_USER,
            payload: user
        });
        Actions.main();
    };
};

export const gmailLoginSuccess = (user) => {
    return (dispatch) => {
        dispatch({
            type: GMAIL_USER,
            payload: user
        });
        Actions.main();
    };
};

export const facebookLogoutSuccess = (user) => {
    return (dispatch) => {
        dispatch({
            type: FACEBOOK_USER,
            payload: user
        });
        Actions.auth();
    };
};

export const gmailLogoutSuccess = (user) => {
    return (dispatch) => {
        dispatch({
            type: GMAIL_USER,
            payload: user
        });
        Actions.auth();
    };
};
