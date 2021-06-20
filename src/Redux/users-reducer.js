const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

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
            return {...state, users: [...state.users, ...action.users]}
            }
        //}

        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersReducer;