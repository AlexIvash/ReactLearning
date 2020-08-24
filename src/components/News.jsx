import React from 'react';
import './News.css';
import {NavLink} from "react-router-dom";

const News = () => {
return (
<div className = "News" activeClassName = "Active">
<NavLink to ="/News">
News
</NavLink>
</div>

);
}

export default News;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка