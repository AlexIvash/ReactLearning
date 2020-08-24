import React from 'react';
import './Messages.css';
import {NavLink} from "react-router-dom";
const Messages = () => {
return (
<div className = "Messages">
<NavLink to ="/Messages">
Messages
</NavLink>
</div>
);
}

export default Messages;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка