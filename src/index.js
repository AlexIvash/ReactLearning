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
import {Provider} from 'react-redux';

let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            {/*<StoreContext.Provider value={store}> - так было сделано в видео, но работать стало если вместо StoreContext.Provider стал просто Provider. В чем между ними разница?
            Важно отметить что в render.js тоже есть Provider и вот так вот он работает*/}
            <Provider store={store}>
                <App />
                {/*После того как мы обернули в StoreContext.provider - нам больше ничего не нужно передавать в app
                <App state={state} dispatch={store.dispatch.bind(store)} store={store} />
                */}
                </Provider>
            {/*</StoreContext.Provider>*/}
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
