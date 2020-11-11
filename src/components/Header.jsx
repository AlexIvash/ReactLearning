import React from 'react';
import './Header.css';

const Header = () => {
return (
<header className ='header'>
<p className = "headerLogo">Message Exchanger V1.0</p>

</header>
);
}

export default Header;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка