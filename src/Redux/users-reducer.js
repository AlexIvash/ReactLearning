import {usersApi} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
//значит, включить если выключено и выключить если включено - то есть переключатель

/**
 * возможно названия переменных здесь мне будет необходимо поменять
 * @type {[{photoUrl: string, fullName: string, location: {country: string, city: string}, id: number, followed: boolean, status: string}, {photoUrl: string, fullName: string, location: {country: string, city: string}, id: number, followed: boolean, status: string}]}
 */
let initialState = {
    /**
     * users - это - пустой массив, но каждый раз когда выполняется API запрос в users.jsx на сервер за пользователями -
     * этот массив пользователей заполняется.
     * pageSize - сколько пользователей на определенной странице должно отображаться в конкретный момент при стандартном запросе.
     * totalUsersCount - 0 - инициализационное значение - ноль пользователей, до того момента пока это значение не будет перезаписано.
     * currentPage - 1 - со старта равна один - текущая страница, выбранная, если только пользователь не выберет другую страницу.
     *
     */
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,//отвечает за получения данных. По умолчанию данные не передаются, до момента пока не перезапишется на true.
    followingInProgress: []//это массив в который мы будем помещать id того пользователя, которого мы follow/unfollow.
    //если пользователь follow - прокидываем сюда id пользователя, если нет - забираем. Реализуется на странице users через .some - добавление u.id, а здесь через .filter - удаление u.id
};

/**
 * action - тип, который прилетает сюда из Users.jsx
 */
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //users: [...state.users], эта запись абсолютно идентична следующей
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                //users: [...state.users], эта запись абсолютно идентична следующей
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        /**
         * здесь мы возвращаем пользователей для users, которые к нам пришли из запроса на url и которых мы записали в ...state.
         * Важный момент - если бы мы оставили здесь     return {...state, users: [...state.users, ...action.users]} - получилось
         * что при открытии страницы мы бы сетали новых пользователей в конце имеющегося списка пользователей
         *
         * НО - нам нужно перезатирать юзеров на одной странице и рисовать других пользователей на другой странице. Потому мы перепишем вот так вот:
         * return {...state, users: action.users}
         */
        case SET_USERS: {
            // const setUsers = () => { оно пишет что setUsers - это не функция. Но такое вот мне не помогло
            //почему users переменные здесь везде unresolved?

            //Это значит взять старых юзеров которые уже были в ...state.users и дописать к ним users, который пришли из action.
            //Так, как юзеров много и это массив - то здесь straight оператор "...". Получается что здесь мы склеиваем два массива

            //в принципе тут мы создаем новый объект. Тут мы как бы берем имеющийся state, но говорим что users будет иметь
            //новые элементы. Но он возьмет старые ...state.users и добавит к ним новых users, которые прилетают к нему
            //из action.
            //state уже имеет этих users. Через оператор"..." эти users раскрываются и вот к ним добавляется action.users и тд.
            //оператор "..." называется "spread". Он как бы открывает данные какого-либо элемента или массива или возможно JSON'а.
            return {...state, users: action.users}
        }
        /**
         * Здесь нам не нужен spread оператор который скопирует currentPage, потому что это значение мы будем перезаписывать
         * когда пользователь выберет свою определенную страничку.
         */
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: [...state.users, action.currentPage]}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]//После знака вопроса в тернарном выражении всегда условие true!
                    : state.followingInProgress.filter(id => id != action.userId)//После двоеточия в тернарном выражении всегда условие false!
            }
            //копируем массив пользователей для которых делается follow/unfollow и потом удаляем запись после выполнения этого действия.
            //Это реализация функции блокирования кнопки, когда происходит follow/unfollow, чтобы не засырать сервер большим количеством запросов.
        }

        default:
            return state;
    }
}

/**
 * AC - Action Creator. Это все - функции Action Creator, которые и отвечают за логику переключения чего-либо под влиянием action
 * каждый из них принимает что-то, и что-то отдает. На примере первого - принимает userId и userId отдает
 * Задача этой функции - вернуть объект (Action) который будет задиспатчен и отправлен в reducer.
 *
 * export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage}); можно записать и так, но не обязательно, потому что currentPage
 * и так будет равен значению переменной фактически
 *
 * Данные прилетают сюда из функции dispatch в UsersContainer
 *
 * export const followAC = (userId) => ({type: FOLLOW, userId});
 export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
 export const setUsersAC = (users) => ({type: SET_USERS, users});
 export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
 export const setUsersTotalCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
 export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});//принимает true/false isFetching. Если reducer из action достает
 *
 * UPDATE: ^^^Эти функции переименованы в связи с рефакторингом функции mapDispatchToProps для Connect в файле UsersContainer.jsx
 */
export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});//принимает true/false isFetching. Если reducer из action достает
//свойство isFetching - тогда лоадер начинает работать, пока все данные не будут достаны и указатель isFetching
// не будет сменен на false.
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});//isFetching - параметр тогла для true/false. userId - чтобы было понятно
//кто есть в массиве пользователей которых делают follow/unfollow и кого там нет.

//export const getUsersThunkCreator = (currentPage, pageSize) => {
export const getUsers = (currentPage, pageSize) => {
// const axios = require('axios');//эта хрень не обязательна, но пусть будет.
    //this.props.toggleIsFetching(true);Во время инициализации компоненты мы говорим, что запрос пошел - данные начинают грузиться
    //и мы меняем это свойство на true, поэтому появляется loader ровно до момента, пока компонента не будет смонтирована до самого конца. Нужно будет подобную логику написать
    //и для постов на Content странице
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersApi.getUsers(currentPage, pageSize)
            .then(data => {
                // this.props.toggleIsFetching(false);После того как ответ на запрос с сервера пришел - мы устанавливаем значение false,
                dispatch(toggleIsFetching(false));
                //чтобы прекратить работу preloader'а
                // this.props.setUsers(data.items);
                dispatch(setUsers(data.items));
                //this.props.setUsersTotalCount(data.totalCount);//totalCount и остальное - свойства, берущиеся из get запроса.
                dispatch(setUsersTotalCount(data.totalCount));
            });
    }

    //response.data.items - это и есть массив пользователей который приходит в ответе
    //причем получается что здесь мы props задаем и здесь же в конструкторе эти props принимаем
    //setUsers - через него мы общаемся со State.

    //этот метод делает setUsers в файле users-reducer.js и там есть return ...state, через который мы и получаем пользователей назад. Вероятно,
    // эти пользователи через props прилетают в этот метод.
}

/**
 * Все данные, которые нужны этой функции внутри thunk - диспатчится в thunkCreator и с помощь замыкания мы эти данные получаем
 * вот как здесь:
 */
export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersApi.follow(userId)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(follow(userId));
                }
                //после окончания синхронного запроса диспатчим false, чтобы сделать кнопку снова активной.
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        /**
         * Все эти запросы пока что НЕ работают, так как API-KEY здесь неправильный и
         * поэтому отсюда уже как бы нельзя делать корректный запрос. Этот АПИ-запрос перенесен в API.js
         *
         * Поэтому запросы есть для галочки, пусть они и НЕ рабочие.
         *
         *
         * data сюда прилетает, а не response, потому что в api.js выполняет callback then который делает
         * return response.data. Потому здесь важно использовать data.resultCode, а не response.data.resultCode
         */
        dispatch(toggleFollowingProgress(true, userId));
        usersApi.unfollow(userId)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(unfollow(userId));
                }
                //после окончания синхронного запроса диспатчим false, чтобы сделать кнопку снова активной.
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export default usersReducer;