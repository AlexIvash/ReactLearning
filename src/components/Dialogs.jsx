import React from 'react';
import {Redirect} from "react-router-dom";
import {reduxForm} from "redux-form";
//import AddMessageForm from "./AddMessageForm/AddMessageForm"; возможно это неправильно написанный импорт
import AddMessageForm from "./AddMessageForm";


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
            {/*
             Это уже не нужно так как мы поменяли на AddMessageForm, а AddMessageForm вынесли в отдельный файл
             <AddMessageFormRedux onSubmit={addNewMessage} />
             */}
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    );
}

let addNewMessage = (values) =>{
    alert(values.newMessageBody);
}

let onSendMessageClick = () => {
    props.sendMessage();
}

//const AddMessageFormRedux = reduxForm({form:"dialogAddMessageForm"})(AddMessageForm); Думаю, это не нужно
//так как мы встраиваем сюда .jsx разметку  <AddMessageForm из AddMessageForm.jsx файла


export default Dialogs;

