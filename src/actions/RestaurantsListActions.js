import firebase from 'firebase';
import { RESTAURANTS_LIST_FETCH_SUCCESS } from './types';

export const restaurantsFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        console.log(currentUser);
        firebase.database().ref(`/restaurants/${currentUser.uid}/details`)
            .on('value', snapshot => {
                dispatch({ type: RESTAURANTS_LIST_FETCH_SUCCESS, payload: snapshot.val() 
            });
        });
    };
};
