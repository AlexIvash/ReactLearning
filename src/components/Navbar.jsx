import React from 'react';
import Profile from './Profile'; //Нельзя импортировать с названием папки в которой находится файл
//если мы импортируем в ту же папку из этой же папки (нельзя import Profile from './components/Profile';)
import Messages from './Messages';
import Music from './Music';
import News from './News';
import Settings from './Settings';
import './Navbar.css';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import Dialogs from "./Dialogs";

const Navbar = () => {
return (
<nav className='sidebar'>
    <NavLink to ="/Content" className= "Profile">
        Profile
    </NavLink>

    <NavLink to ="/Dialogs" className= "Dialogs">
        Messages
    </NavLink>

    <NavLink to ="/Music" className= "Music">
        Music
    </NavLink>

    <NavLink to ="/News" className= "News">
        News
    </NavLink>

    <NavLink to ="/Settings" className= "Settings">
        Settings
    </NavLink>
    {/* <DialogsPage /> Я пока не знаю куда именно нужно поместить ссылку на эту страницу чтобы она действительно отображалась как контент на моём сайте, но видимо она должна быть связана с этой но не находиться в блоке навигации слева*/}
</nav>
);
}

export default Navbar;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка