import React from 'react';
import styles from './Dialogs.module.css';
import {Redirect} from "react-router-dom";
import Login from "./Login";
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {
    const messageBody = React.createRef();
   // let newMessageBody = state.newMessageBody;

    /**
     * Если пользователь не авторизован - его будет редиректить на страницу Login. Чтобы убрать функцию -
     * поставить true в DialogsContainer.
     * Работает по принципу того что нужно вернуть React разметку и если user не залогинен - возвращает страницу логина
     * вместо текущей страницы. Так как isAuth:false/isAuth:state.auth.isAuth пока нет в mapStateToProps в dialogs Container - я это заблокировал временнj

    if(props.isAuth == false) return <Redirect to={Login} />*/
    return (
        <div>
             <AddMessageFormRedux onSubmit={addNewMessage} />{/*
             */}
        </div>
    );
}

let addNewMessage = (values) =>{
    alert(values.newMessageBody);
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}> {/*Выполняет отправку месседжей на сервер. Все баттоны которые были в предыдущей версии без формы(которую я сам писал)
        я убрал так как они либо не нужны уже либо нереализованы*/}
            <div className={styles.DialogPageNewMessage}>
                {/** какого-то хера необходимо обернуть все эти элементы в один div - иначе будет ошибка. То есть эти text-area и тд не могут быть не внутри div.*/}
                <p>Here are your messages?</p>
                <Field className={styles.textarea} component={"textarea"} name={"newMessageBody"} placeholder="Enter your message" />
            </div>
        </form>
    )
}
/**
 * Field нельзя использовать за пределами redux-form, поэтому для этого мы обернем компоненту AddMessageForm в redux-form
 */
const AddMessageFormRedux = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm);

export default Dialogs;

