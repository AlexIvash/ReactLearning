import React from 'react';
import styles from './Dialogs.module.css';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import store from "./../Redux/State";
import {connect} from "react-redux";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../StoreContext";
import {compose} from "redux";

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
        //  let sendMessageActionCreator = () => ({
        //      type: 'SEND-MESSAGE', body: messageBody.current.value
        //    })
        // store.dispatch(sendMessageActionCreator());
    }

    /**
     * Этот метод был перенесен из Dialogs компоненты, чтобы
     избавить презентационную компоненту от ненужно логики.
     Теперь store должен приходить в Dialogs в props из этой DialogsContainer
     */
    function handleEditMessageClick() {
        //  let updateMessageActionCreator = () => ({
        //      type: 'UPDATE-LAST-MESSAGE-BODY', body: messageBody.current.value
        //   })
        //    store.dispatch(updateMessageActionCreator());
    }

    /**
     * Этот метод был перенесен из Dialogs компоненты, чтобы
     избавить презентационную компоненту от ненужно логики.
     Теперь store должен приходить в Dialogs в props из этой DialogsContainer
     */
    function handleDeleteMessageClick() {
        //    let deleteMessageActionCreator = () => ({
        //     type: 'DELETE-LAST-MESSAGE', body: messageBody.current.value
        //  })
        // store.dispatch(deleteMessageActionCreator());
    }

    //return (

            { /**
             value = store. value - это значение из StoreContext
             */}

                let state = props.store.getState();

    { /**
     StoreContext.Consumer - фигурная скобка всегда должна быть на новой строке. Это баг реакта.
     */}
                return <StoreContext.Consumer>
                    { store => {
                        //возможно здесь store должен быть без скобок но я пока не уверен. Так было до: (store) => {
                      return <Dialogs handleSendMessageClick={handleSendMessageClick}
                                 handleEditMessageClick={handleEditMessageClick}
                                 handleDeleteMessageClick={handleDeleteMessageClick}
                                 userData={state.userData} dialogElements={state.dialogElements} />

                    }
            }
        </StoreContext.Consumer>
  //  );
    {/*return () скобки не обязательны, так как мы возвращаем только одну строку*/
    }
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


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
}

//let AuthRedirectComponent = withAuthRedirect(Dialogs);
//export default connect(mapStateToProps, mapDispatchToProps)(Dialogs); - так было до рефакторинга

export default compose(connect(mapStateToProps, mapDispatchToProps)(DialogsContainer));
//здесь не хватает еще одной функции в compose, но пусть пока будет так, как есть.
//export default DialogsContainer;

