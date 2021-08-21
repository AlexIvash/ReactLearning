const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

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
    currentPage: 1
};
   // users: [Нам это не нужно, так как дальше презентационная компонента сама будет добавлять пользователей сюда
        // { id:1, photoUrl: "https://lh3.googleusercontent.com/proxy/B6W7bNkG7Hv6tkhBz96FXVfC5R94bRP7J0w9PHWzg0VwOQtQKibyBUbsU_FlLw_gaK5RuPGZxtqaI154LVoWQbb7L6NGIXmgimXfPZPhvjAhShQ3znl_ODBPc88xd_FO9nwsXE9obEQniw", followed: false, fullName: "Oleksiy", status: "TestMessage", location: {city: "Kiev", country: "Ukraine"}},
    //{ id:1, photoUrl: "https://lh3.googleusercontent.com/proxy/B6W7bNkG7Hv6tkhBz96FXVfC5R94bRP7J0w9PHWzg0VwOQtQKibyBUbsU_FlLw_gaK5RuPGZxtqaI154LVoWQbb7L6NGIXmgimXfPZPhvjAhShQ3znl_ODBPc88xd_FO9nwsXE9obEQniw", followed: false, fullName: "Bogdan", status: "TestMessage2", location: {city: "Kiev", country: "Ukraine"}}
//]};

/**
 * action - тип, который прилетает сюда из Users.jsx
*/
const usersReducer = ( state = initialState, action) => {
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

        default:
            return state;
    }
}

/**
 * AC - Action Creator
 * каждый из них принимает что-то, и что-то отдает. На примере первого - принимает userId и userId отдает
 *
 * export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage}); можно записать и так, но не обязательно, потому что currentPage
 * и так будет равен значению переменной фактически
 */
export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});

export default usersReducer;