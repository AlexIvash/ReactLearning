import React from 'react';
import styles from './Dialogs.module.css';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import store from "./../Redux/State";

const Dialogs = (props) => {
    /**
     * store.getState() - ссылаемся на State.js файл в котором в _state лежит массив messagesData с данными для постов.
     * slice(0).reverse - прямо здесь создают копию существующего массива и отображают его задом наперед
     * .map - передаем все данные из этого массива для отображения на странице
     */
    let userData = store.getState().messagesData.slice(0).reverse()
        .map( dialog => <Dialogs1 name = {dialog.name} img = {dialog.img} /> );

    let dialogElements = store.getState().messagesData.slice(0).reverse()
        .map( dialog => <Messages message = {dialog.message} /> );
    return (
        <div className={styles.DialogPage}>

            <div className={styles.UserNames}>

                {userData}

            </div>
            <div className={styles.Messages}>

                {dialogElements}

            </div>


        </div>
    );
}

const Dialogs1 = (props) => {
    return (
        <NavLink to={"/Dialogs/" + props.name} className={styles.user}>
        {props.name}
    <img src ={props.img} className = {styles.UserAvatar}></img>
    </NavLink>
    );
}

const Messages = (props) => {
    return (
        <div>
            {props.message}
        </div>
    );
}


export default Dialogs;

