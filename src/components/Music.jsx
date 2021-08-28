import React from 'react';
import './Music.css';
import {NavLink} from "react-router-dom";

const Music = () => {
    return (
        <div className="Music">
            <NavLink to="/Music">
                Music (Being Developped)
            </NavLink>
        </div>

    );
}

export default Music;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка