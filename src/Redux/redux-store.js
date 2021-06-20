import React from "react";
import {combineReducers, createStore} from "redux";
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from "./users-reducer";

/**
 * profileReducer и подобное - это названия функций в profile-reducer.js файле и тд
 * Все что будет добавляться сюда - это будут reducers для последующих компонент которые в виде json прилетают в users.
 * @type {Reducer<CombinedState<unknown>>}
 */
let reducers = combineReducers({
  //  profilePage: profileReducer,
   // dialogsPage: dialogsReducer, по какой-то причине эти пока не работают, потому я пока их закомментирую
    usersPage: usersReducer,
});

let store = createStore(reducers);
window.store = store;

export default store;