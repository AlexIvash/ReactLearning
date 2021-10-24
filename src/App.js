import React from 'react';
import './App.css';//Это значит что это лежит в этой же папке
import Navbar from './components/Navbar';
import Dialogs from "./components/Dialogs";
import Music from "./components/Music";
import News from "./components/News";
import UsersContainer from "./components/UsersContainer";
import Settings from "./components/Settings";
import DialogsSergey from "./components/DialogsSergey";
import State from "./Redux/State";
import {BrowserRouter, Route} from "react-router-dom";
import store from './Redux/redux-store.js';
import ProfileContainer from "./components/ProfileContainer";
import HeaderContainer from "./components/HeaderContainer";
import Login from "./components/Login";
import DialogsContainer from "./components/DialogsContainer";

//Все комментарии могут быть только вне функций иначе будут вылазить рандомные ошибки

//мы больше не импортируем стили через специальную команду в html файле, а именно импортируем их как в обычном js

//Все обновления по стилям идут отсюда для только одной этой страницы

//Я забыл добавить <div> перед ним, поэтому не работало, непонятно почему но обязательно даже если этот div там нафиг не упал - код всё равно должен быть в него обёрнут

//Я не понимаю почему но все функции которые иду в APP функцию должны быть с большой буквы иначе почему-то React их даже и близко не видит

//function App(props) { так не правильно
const App = (props) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer store={store} />
                <Navbar/>
                {/**
                 Можно дописывать больше параметров, например /Profile/:userId/:otherParameter
                 :userId? - значит что это НЕ обязательный параметр

                 по хорошему данные из state не передавать аж здесь, а передавать через connect и store
                 */}
                <Route path='/Profile/:userId?' render={() => <ProfileContainer postsData={State.postsData} store={store} />}/>
                <Route exact path='/Dialogs' render={() => <DialogsContainer messagesData={State.messagesData} store={store} />}/>
                <Route path='/Users' render={() => <UsersContainer store={store}/>}/>
                <Route path='/Login' render={() => <Login store={store} />} />

                {/*
   И так,  я продвинулся наконец.
   store передается сюда из index.js и я понял что мне здесь просто следовало добавить store={store} после UsersContainer.


   Так же, messagesData, postsData - это устаревший вариант и лучше бюы использовать это только для демонстрации, но все
   данные должны быть переданы дальше через {...state, profile} - как-то так например
   */}
                {/*

<StoreContext.Provider value={store}> <Route path = '/Users' render = { () => <UsersContainer />} /> </StoreContext.Provider> - doesn't work at all
   Здесь нужны данные из store(state), именно по этому тут UsersContainer, которую мы снабдим нужными props.
   <Route path = '/Users' render = { () => <Users />} />\

   <Route path = '/Users' render = { () => <UsersContainer store={store} />} />

   https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
   */}
                <Route path='/Dialogs/Sergey' component={DialogsSergey}/>
                <Route path='/Music' component={Music}/>
                <Route path='/News' component={News}/>
                <Route path='/Settings' component={Settings}/>
            </div>
        </BrowserRouter>
    );
}
export default App;
