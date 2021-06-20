import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {followAC, unfollowAC,setUsersAC} from '../Redux/users-reducer.js';

/**
 * Эта функция принимает весь глобальный state целиком и передает сюда в props для компоненты Users.
 * В Users это передается через export default connect ... . Потому значение props для users будут пользователи (users) из state
 * и все другие данные, указанные здесь.
 * Все эти параметры берутся из
 * users-reducer.js А туда они попадают из глобального store.js, I guess.
 *
 * Если totalUsersCount поделить на pageSize - мы получим количество span в users.jsx с номерами страниц, необходимых
 * для отображения. То есть мы берем количество пользователей прилетевших (этот параметр есть в АПИ-запросе который мы делаем),
 * делим его на размер количества пользователей по дефолту на одной странице - и получаем необходимое нам количество страниц.
 * @param state
 * @returns {{users: ([]|*)}}
 *
 */
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        //state.usersPage нам теперь доступен, потому что в redux-store мы указали что usersPage будет обслуживаться users-reducer
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

/**
 * Это вторая функция, которая служит для того чтобы передавать callback-функции компоненте Users
 * Здесь будут функции, которые компонента может вызывать.
 *
 * Эти функции в свою очередь вызывают функцию action creator в users-reducer. Мы вызываем не сам action Creator, а результат
 * работы action Creator (чтобы это не значило). А action creator возвращает нам определенный action, то есть мы диспатчим
 * всегда какой-либо action.
 * @param dispatch
 * @returns {{setUsers: setUsers, follow: G.IOptions.follow, unfollow: unfollow}}
 */
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch (unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }
    }
}


{/**
 здесь берется компонента users и оборачивается в props, чтобы сработали dispatch методы
 причем сюда передасться users: state.usersPage.users и с помощью метода mapStateToProps в Users будет сидеть свойство users
 */}
export default connect(mapStateToProps, mapDispatchToProps) (Users);

{/**
 Сюда в connect можно закидывать любую компоненту - как функциональную (обычную без класса), так и классовую компоненту.
 export default UsersContainer; думаю что здесь это лишнее. В видео нашел момент в 49 части где здесь нету этого экспорта*/}