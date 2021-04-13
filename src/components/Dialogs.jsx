import React from 'react';
import styles from './Dialogs.module.css';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import store from "./../Redux/State";

const Dialogs = (props) => {
    const messageBody = React.createRef();
    /**
     * store.getState() - ссылаемся на State.js файл в котором в _state лежит массив messagesData с данными для постов.
     * slice(0).reverse - прямо здесь создают копию существующего массива и отображают его задом наперед
     * .map - передаем все данные из этого массива для отображения на странице
     */
    let userData = store.getState().messagesData.slice(0).reverse()
        .map( dialog => <Dialogs1 name = {dialog.name} img = {dialog.img} /> );

    let dialogElements = store.getState().messagesData.slice(0).reverse()
        .map( dialog => <Messages message = {dialog.message} /> );

    function handleSendMessageClick(){
        let sendMessageActionCreator = () => ({
            type: 'SEND-MESSAGE', body: messageBody.current.value
        })
        store.dispatch(sendMessageActionCreator());
    }

    function handleEditMessageClick(){
        let updateMessageActionCreator = () => ({
            type: 'UPDATE-LAST-MESSAGE-BODY', body: messageBody.current.value
        })
        store.dispatch(updateMessageActionCreator());
    }
    function handleDeleteMessageClick(){
        let deleteMessageActionCreator = () => ({
            type: 'DELETE-LAST-MESSAGE', body: messageBody.current.value
        })
        store.dispatch(deleteMessageActionCreator());
    }
    return (
        <div>
        <div className={styles.DialogPageNewMessage}>
        {/** какого-то хера необходимо обернуть все эти элементы в один div - иначе будет ошибка. То есть эти text-area и тд не могут быть не внутри div.*/}
            <p>What do you want to do with the last post?</p>
            <textarea className={styles.textarea} type="text" ref={messageBody} />
            <input type="button" size="Large" className={styles.PostButton1} onClick={handleSendMessageClick} value="Send Message" />
            <input type="button" size="Large" className={styles.PostButton1} onClick={handleEditMessageClick} value="Edit Message" />
            <input type="button" size="Large" className={styles.PostButton2} onClick={handleDeleteMessageClick} value="Delete Message" />
        </div>
        <div className={styles.DialogPage}>

            <div className={styles.UserNames}>

                {userData}

            </div>
            <div className={styles.Messages}>

                {dialogElements}

            </div>
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

