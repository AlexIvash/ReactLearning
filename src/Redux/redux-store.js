import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
//import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

/**
 * profileReducer и подобное - это названия функций в profile-reducer.js файле и тд
 * Все что будет добавляться сюда - это будут reducers для последующих компонент которые в виде json прилетают в users.
 * @type {Reducer<CombinedState<unknown>>}
 */
let reducers = combineReducers({
    profilePage: profileReducer,
    // dialogsPage: dialogsReducer, по какой-то причине эти пока не работают, потому я пока их закомментирую
    usersPage: usersReducer,
    auth: authReducer,
});

let store = createStore(reducers);//Здесь мы создали store уже не сами, а с помощью redux и потому
//все данные которые находятся store мы уже не увидим у себя в коде.
window.store = store; //здесь мы передали store объекту window, чтобы в браузере можно было
//в любой момент проверить что в store сидит. Написать в консоли браузера например store.getState().profilePage.profile
// или что-то подобное.

export default store;