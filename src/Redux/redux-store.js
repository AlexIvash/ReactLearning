import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
//import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

/**
 * profileReducer и подобные reducers - это названия функций в profile-reducer.js файле и таких же функций в таких же файлах
 * Все что будет добавляться сюда - это reducers для последующих компонент которые в виде json прилетают в эту компоненту.
 * Например - компонента users.
 */
let reducers = combineReducers({
    profilePage: profileReducer,
    // dialogsPage: dialogsReducer, по какой-то причине эти пока не работают, потому я пока их закомментирую
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer//здесь должно быть написано именно form, потому что наш reducer будет искать в state именно form.
    //Его можно настроить на другое значение, но я бы такое делал только если понадобится.
});

/**
 let store = createStore(reducers, applyMiddleware(thunkMiddleware)); - это реализация store с помощью redux-thunk middleware.
 Что redux-thunk такое и основные отличия от обычного store:
 * store создается не вручную, а с помощью redux-thunk технологии и его не видно в коде,
 * кроме этой строки и ссылок на использования этого store.

 applyMiddleware - передает thunkCreator в store, чтобы thunk функции могли нормально работать
 Для чего нужен redux thunk middleware:
 Redux Thunk middleware allows you to write action creators that return a function instead of an action.
 The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 The inner function receives the store methods dispatch and getState as parameters.

 With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action.
 Middleware extends the store's abilities, and lets you write async logic that interacts with the store.

 Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic
 that needs access to the store, and simple async logic like AJAX requests.
 https://github.com/reduxjs/redux-thunk - смотреть "Why Do I Need This?"
 */
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

/**
 здесь мы передали store объекту window, чтобы в браузере можно было
 в любой момент посмотреть данные которые находятся в store.
 Написать в консоли браузера например store.getState().profilePage.profile
 или store.
 */
window.store = store;

export default store;