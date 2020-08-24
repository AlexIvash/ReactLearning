import React from 'react';
import './Header.css';

const Header = () => {
return (
<header className ='header'>
<img src = "https://novostroyki.realt.ua/store/company/58e0d1f5b036601e618fca11/logo/6919a784ca84fe010e06e323bdbc694f.jpg" className = "headerImg"></img>
</header>
);
}

export default Header;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка