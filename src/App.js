import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    constructor(props) {
        super(props);
    
        firebase.initializeApp({
            apiKey: 'AIzaSyB_WYCY2h3kRkwyCaW4PwuXfAvmVz0y5WM',
            authDomain: 'restabar-dc6df.firebaseapp.com',
            databaseURL: 'https://restabar-dc6df.firebaseio.com',
            projectId: 'restabar-dc6df',
            storageBucket: 'restabar-dc6df.appspot.com',
            messagingSenderId: '903851098197'
        });
      }
         
      render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
