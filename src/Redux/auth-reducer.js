import {usersApi} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

/**
 * action - тип, который прилетает сюда
 */
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        /**
         * usedId, email, login которые сидят в action.data в этом кейсе перезатрут данные, которые сидят в ...state
         * Если пришли пользовательские данные - тогда isAuth меняется на true.
         */
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

/**
 * Можно здесь собирать не все данные вместе в data, а и по отдельности.
 * Задача этой функции - вернуть объект (Action) который будет задиспатчен и отправлен в reducer.
 * Сюда прилетает id который становится userId и летит дальше как userId
 */
export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}});
/**
 * thunk creator функция, которая возвращает другую функцию
 */
export const getAuthUserData = () => (dispatch) =>{
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
                dispatch(setAuthUserData(id, email, login));
            }
        });
}
export default authReducer;