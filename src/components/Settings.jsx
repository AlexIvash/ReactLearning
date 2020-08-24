import React from 'react';
import './Settings.css';
import {NavLink} from "react-router-dom";

const Settings = () => {
return (
<div className = "Settings">
<NavLink to ="/Settings">
Settings
</NavLink>
</div>

);
}

export default Settings;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка