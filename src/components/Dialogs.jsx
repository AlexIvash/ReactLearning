import React from 'react';
import styles from './Dialogs.module.css';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import store from "./../Redux/State";

const Dialogs = (props) => {


    let userData = store.getState().messagesData
        .map( dialog => <Dialogs1 name = {dialog.name} img = {dialog.img} /> );

    let dialogElements = store.getState().messagesData
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

