import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from '../Redux/auth-reducer.js';
import {usersApi} from "../api/api.js";

class HeaderContainer extends React.Component{
    /**
     * withCredentials - дополнительные данные для запроса - в данном случае credentials.
     */
    componentDidMount() {
        usersApi.login()
            .then(data => {
                /**
                 * resultCode === 0 - значит, что пользователь залогинен.
                 *
                 * https://social-network.samuraijs.com/docs?type=todolist#auth_me_get
                 *
                 * Если так - тогда даем ему авторизационные данные
                 * Почему data.data - потому что стандартно все данные axios библиотека пакует в "data",
                 * хотя в нашем запросе тоже есть data. Приходится писать data.data для доступа к нужным данным
                 * this.props.setAuthUserData(response.data.data.login);
                 * ^^ Это можно записать следующим путем снизу.
                 *
                 *
                 * Так же, к нам прилетает не userId, а просто id - потому здесь id.
                 *
                 * data сюда прилетает, а не response, потому что в api.js выполняет callback then который делает
                 * return response.data. Потому здесь важно использовать data.resultCode, а не response.data.resultCode
                 */
                if(data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }

    render() {
        /**
         * В Header пробрасываем все props, которые придут в эту компоненту
         */
        return <Header {...this.props} />
    }
}

/**
 * Чтобы не показывать "login" залогиненному пользователю - будем показывать имя пользователя
 * которое возьмем из users-reducer. Это будет login. Это свойство отправим дальше в Header.
 */
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});
export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка