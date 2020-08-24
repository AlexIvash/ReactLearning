import React from 'react';
import './App.css';//Это значит что это лежит в этой же папке
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Dialogs from "./components/Dialogs";
import Music from "./components/Music";
import News from "./components/News";
import Settings from "./components/Settings";
import DialogsSergey from "./components/DialogsSergey";
import {BrowserRouter, Route} from "react-router-dom";



//Все комментарии могут быть только вне функций иначе будут вылазить рандомные ошибки

//мы больше не импортируем стили через специальную команду в html файле, а именно импортируем их как в обычном js

//Все обновления по стилям идут отсюда для только одной этой страницы

//Я забыл добавить <div> перед ним, поэтому не работало, непонятно почему но обязательно даже если этот div там нафиг не упал - код всё равно должен быть в него обёрнут

//Я не понимаю почему но все функции которые иду в APP функцию должны быть с большой буквы иначе почему-то React их даже и близко не видит


function App(props) {
 return (
     <BrowserRouter>
  <div className="app-wrapper">
<Header />
<Navbar />
   <Route path = '/Content' render = { () => <Content postsData={props.Appstate.postsData} /> } />
   <Route exact path = '/Dialogs' render = { () => <Dialogs messagesData={props.Appstate.messagesData} />} />
      {/* <Route path = '/Dialogs/Sergey' component = {DialogsSergey} /> Здесь можно напихать хардкодэд страниц такого плана но тогда это ведь не будет именно то, что нам нужно, правда?*/}
   <Route path = '/Dialogs/Sergey' component = {DialogsSergey} />
   <Route path = '/Music' component = {Music} />
   <Route path = '/News' component = {News} />
   <Route path = '/Settings' component = {Settings} />



 </div>
 </BrowserRouter>
  );
}
export default App;
