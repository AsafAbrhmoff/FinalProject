import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './forms/loginForm/LoginForm';
import RestaurantsList from './forms/RestaurantsForm/RestaurantsList';
import RestaurantForm from './forms/restaurantForm/RestaurantForm';
import Menu from './forms/restaurantForm/Menu';
import ReservasionForm from './forms/restaurantForm/ReservasionForm';
import Payment from './forms/restaurantForm/Payment';
import HorizontalList from './components/HorizontalList';
//import MainForm from './forms/mainForm/MainForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} hideNavBar />
                </Scene>

                <Scene key="main">
                    <Scene 
                        key="restaurantsList" 
                        component={RestaurantsList} 
                        title="Main" 
                        initial 
                        hideNavBar 
                    />
                    <Scene 
                        key="restaurantDetails" 
                        component={RestaurantForm} 
                        title="restaurant" 
                        hideNavBar
                    />
                    <Scene 
                        key="menu" 
                        component={Menu} 
                        title="menu" 
                        hideNavBar
                    />
                    <Scene
                        key="reservasion"
                        component={ReservasionForm}
                        title="reservasion"
                        hideNavBar
                    />
                    <Scene
                        key="payment"
                        component={Payment}
                        title="Payment"
                        hideNavBar
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
