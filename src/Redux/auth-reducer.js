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
export default authReducer;