import React from 'react';
import './App.css';//Это значит что это лежит в этой же папке
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Dialogs from "./components/Dialogs";
import Music from "./components/Music";
import News from "./components/News";
import UsersContainer from "./components/UsersContainer";
import Settings from "./components/Settings";
import DialogsSergey from "./components/DialogsSergey";
import State from "./Redux/State";
import {BrowserRouter, Route} from "react-router-dom";
import store from './Redux/redux-store.js';

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
<Header />
<Navbar />
<Route path = '/Content' render = { () => <Content postsData={State.postsData} /> } />
<Route exact path = '/Dialogs' render = { () => <Dialogs messagesData={State.messagesData} />} />
   <Route path = '/Users' render = { () => <UsersContainer store={store} />} />

   {/*
   И так,  я продвинулся наконец. store передается сюда из index.js и я понял что мне здесь просто следовало добавить store={store} после UsersContainer.
   */}
   {/*

<StoreContext.Provider value={store}> <Route path = '/Users' render = { () => <UsersContainer />} /> </StoreContext.Provider> - doesn't work at all
   Здесь нужны данные из store(state), именно по этому тут UsersContainer, которую мы снабдим нужными props.
   <Route path = '/Users' render = { () => <Users />} />\

   <Route path = '/Users' render = { () => <UsersContainer store={store} />} />

   https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
   */}
<Route path = '/Dialogs/Sergey' component = {DialogsSergey} />
<Route path = '/Music' component = {Music} />
<Route path = '/News' component = {News} />
<Route path = '/Settings' component = {Settings} />
 </div>
 </BrowserRouter>
  );
}
export default App;
