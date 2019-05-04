import { ADD_PLATE, UPDATE_ORDER, ADD_ORDER_TO_LIST, ADD_COMMENTS } from './types';

export const addPlate = (plate) => {
    return (dispatch) => {
        dispatch({
            type: ADD_PLATE,
            payload: plate
        });
    };
};

export const addComments = (comments) => {
    return (dispatch) => {
        dispatch({
            type: ADD_COMMENTS,
            payload: comments
        });
    };
};

export const updateOrder = (order) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_ORDER,
            payload: order
        });
    };
};

export const addToOrdersList = (order) => {
    return (dispatch) => {
        dispatch({
            type: ADD_ORDER_TO_LIST,
            payload: order
        });
    };
};
