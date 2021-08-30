import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.loginBlock}>
                {/**
                 * Чтобы не показывать "login" залогиненному пользователю - будем показывать имя пользователя
                 * которое возьмем из props (от HeaderContainer). А в HeaderContainer оно прилетело из auth-reducer.
                 * А в auth-reducer оно прилетело из апи запроса в HeaderContainer :).
                 *
                 * Тернарный оператор здесь значит, что если пользователь авторизован (в authReducer поменялся с false на true) - у него будет free(прилетает из props.login
                 * если он залогинен. Если не залогинен - тогда ссылку на логин. После двоеточия идет условие - что,
                 * если пользователь не залогинен.
                 *
                 * TODO: Допилить чтобы тут еще и аватар пользователя показывался, если он залогинен.
                 */}
                {props.isAuth ? props.login : <NavLink to={'/login'}>
                    Login
                </NavLink>}
            </div>
            <p className={styles.headerLogo}>Message Exchanger V1.0</p>
        </header>
    );
}

export default Header;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка