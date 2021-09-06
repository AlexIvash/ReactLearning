import React from 'react';
import styles from './Dialogs.module.css';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import store from "./../Redux/State";

const DialogsContainer = (props) => {
    /**
     * store.getState() - ссылаемся на State.js файл в котором в _state лежит массив messagesData с данными для постов.
     * slice(0).reverse - прямо здесь создают копию существующего массива и отображают его задом наперед
     * .map - передаем все данные из этого массива для отображения на странице
     */
    let userData = store.getState().messagesData.slice(0).reverse()
        .map(dialog => <Dialogs1 name={dialog.name} img={dialog.img}/>);

    let dialogElements = store.getState().messagesData.slice(0).reverse()
        .map(dialog => <Messages message={dialog.message}/>);

    /**
     * Этот метод был перенесен из Dialogs компоненты, чтобы
     избавить презентационную компоненту от ненужно логики.
     Теперь store должен приходить в Dialogs в props из этой DialogsContainer
     */
    function handleSendMessageClick() {
        let sendMessageActionCreator = () => ({
            type: 'SEND-MESSAGE', body: messageBody.current.value
        })
        store.dispatch(sendMessageActionCreator());
    }

    /**
     * Этот метод был перенесен из Dialogs компоненты, чтобы
     избавить презентационную компоненту от ненужно логики.
     Теперь store должен приходить в Dialogs в props из этой DialogsContainer
     */
    function handleEditMessageClick() {
        let updateMessageActionCreator = () => ({
            type: 'UPDATE-LAST-MESSAGE-BODY', body: messageBody.current.value
        })
        store.dispatch(updateMessageActionCreator());
    }

    /**
     * Этот метод был перенесен из Dialogs компоненты, чтобы
     избавить презентационную компоненту от ненужно логики.
     Теперь store должен приходить в Dialogs в props из этой DialogsContainer
     */
    function handleDeleteMessageClick() {
        let deleteMessageActionCreator = () => ({
            type: 'DELETE-LAST-MESSAGE', body: messageBody.current.value
        })
        store.dispatch(deleteMessageActionCreator());
    }

    return <Dialogs handleSendMessageClick={handleSendMessageClick} handleEditMessageClick={handleEditMessageClick}
                    handleDeleteMessageClick={handleDeleteMessageClick}
                    userData={userData} dialogElements={dialogElements}/>
    //return () скобки не обязательны, так как мы возвращаем только одну строку
}

const Dialogs1 = (props) => {
    return (
        <NavLink to={"/Dialogs/" + props.name} className={styles.user}>
            {props.name}
            <img src={props.img} className={styles.UserAvatar}></img>
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

/*
let mapStateToProps = (state) => {
    return{
    dialogsPage: state.dialogsPage
    }

    let mapDispatchToProps = (dispatch) => {
    return {
sendMessage: () => {
dispatch(sendMessageCreator());
},
updateNewMessageBody: (body) => {
dispatch(updateNewMessageBodyCreator(body));
}
    }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps) (Dialogs);- я тут начал рефакторить, но так и не закончил
*/
export default DialogsContainer;

