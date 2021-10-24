import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import store from "./Redux/State";
import store from './Redux/redux-store.js';
import {Provider} from 'react-redux';
import StoreContext from "./StoreContext";
import {BrowserRouter} from "react-router-dom";


/**
 не смотря на что мы можем вызывать объект store глобально - его все равно обязательно импортировать
 */
export let renderEntireTree = (state) => {
    // const MyContext = React.createContext(defaultValue); это уже есть в StoreContext.js, а StoreContext используется в index.js

    // <StoreContext.Provider value={store}> и <MyContext.Provider value={} /> в value должен быть store - не помогли, помог просто Provider и кстати просто Provider должен стоять в index.js


    ReactDOM.render(
        <Provider store={store}>
            <App state={store.getState} addPost={store.dispatch.bind(store)}/> </Provider>, document.getElementById('root')
    );


}
  renderEntireTree(store.getState);
