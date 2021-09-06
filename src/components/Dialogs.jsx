import React from 'react';
import styles from './Dialogs.module.css';
import {Redirect} from "react-router-dom";
import Login from "./Login";

const Dialogs = (props) => {
    const messageBody = React.createRef();

    /**
     * Если пользователь не авторизован - его будет редиректить на страницу Login. Чтобы убрать функцию -
     * поставить true в DialogsContainer.
     * Работает по принципу того что нужно вернуть React разметку и если user не залогинен - возвращает страницу логина
     * вместо текущей страницы. Так как isAuth:false/isAuth:state.auth.isAuth пока нет в mapStateToProps в dialogs Container - я это заблокировал временнj

    if(props.isAuth == false) return <Redirect to={Login} />*/
    return (
        <div>
            <div className={styles.DialogPageNewMessage}>
                {/** какого-то хера необходимо обернуть все эти элементы в один div - иначе будет ошибка. То есть эти text-area и тд не могут быть не внутри div.*/}
                <p>What do you want to do with the last post?</p>
                <textarea className={styles.textarea} type="text" ref={messageBody}/>
                <input type="button" size="Large" className={styles.PostButton1} onClick={props.handleSendMessageClick}
                       value="Send Message"/>
                <input type="button" size="Large" className={styles.PostButton1} onClick={props.handleEditMessageClick}
                       value="Edit Message"/>
                <input type="button" size="Large" className={styles.PostButton2}
                       onClick={props.handleDeleteMessageClick} value="Delete Message"/>
            </div>
            <div className={styles.DialogPage}>

                <div className={styles.UserNames}>
                    {/*Эти данные прилетают из DialogsContainers в Props. А там они передаются в return Dialogs userData={userData}*/}
                    {props.userData}

                </div>
                <div className={styles.Messages}>

                    {/*Эти данные прилетают из DialogsContainers в Props. А там они передаются в return Dialogs dialogElements={dialogElements}*/}
                    {props.dialogElements}

                </div>
            </div>
        </div>
    );
}
export default Dialogs;

