import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RestaurantsReducer from './RestaurantsReducer';
import ReservasionReducer from './ReservationReducer';

export default combineReducers({
    auth: AuthReducer,
    restaurants: RestaurantsReducer,
    reservasion: ReservasionReducer
});
