import {
    ADD_PLATE,
    UPDATE_ORDER,
    ADD_ORDER_TO_LIST,
    ADD_COMMENTS
} from '../actions/types';

const INITIAL_STATE = {
    order: [],
    ordersList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PLATE:
            return { ...state, order: [...state.order, action.payload] };
        case UPDATE_ORDER:
            return { ...state, order: action.payload };
        case ADD_COMMENTS:
            return { ...state, order: [...state.order, action.payload] };
        case ADD_ORDER_TO_LIST:
            return { ...state, ordersList: [...state.ordersList, action.payload] };
        default:
            return state;
    }
};
