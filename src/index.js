import './index.css';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import {renderEntireTree} from './render';//Это нельзя удалять, потому что иначе по какой-то причине localhost:3000 не будет работать.
//import store from "./Redux/State";
import store from './Redux/redux-store.js';
import StoreContext from "./StoreContext";
import {BrowserRouter} from "react-router-dom";
import App from './App';
import ReactDOM from 'react-dom';

let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <StoreContext.Provider value={store}>
                <App state={state} dispatch={store.dispatch.bind(store)} store={store}/>
            </StoreContext.Provider>
        </BrowserRouter>, document.getElementById('root'));
}
rerenderEntireTree(store.getState);

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
})

//renderEntireTree();
//renderEntireTree(store.getState);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
