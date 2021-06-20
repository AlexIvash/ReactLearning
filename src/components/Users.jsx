import React from 'react';
import profilePhoto from '../profilePhoto/profilePhoto.jpeg';
import axios from "axios";
import styles from "./Users.module.css";


/**
 * Если открыть в приложении страницу users, то там будет прилетать users с действительными данными про пользователей взятых из той ссылки. То есть axios, который в конструкторе
 * работает. Я не понимаю почему this.props при этом undefined
 *
 * В ситуации с этой компонентой - она нуждается в state, но state в нее не закидывается - она сама берет данные по api запросу и сама их же отрисовывает
 */

class Users extends React.Component {
 /*   constructor(props) {
        super(props);//здесь передается конструирование родительской компоненте React.component
            // кстати этот if здесь НЕ обязателен, потому что конструирование объекта происходит всего один
}
Конструктор больше не нужен, так как даже если мы отдаем управление родительскому конструктору - это происходит по умолчанию, даже если не писать super(props);
Конструктор был нужен для АПИ запроса, но теперь мы отдали апи запрос в componentDidMount метод
*/
componentDidMount() {
    const axios = require('axios');//эта хрень не обязательна, но пусть будет.
    axios.get("https://social-network.samuraijs.com/api/1.0/users")
        .then(response => {
            this.props.setUsers(response.data.items);

            /*Раньше кстати этот АПИ запрос был в конструкторе и данные летели прямо в конструктор и оттуда соответственно в props.
            Одна из причин почему перенесли этот запрос из конструктора - потому что React хочет отрисовать материал,
            даже если этот асинхронный АПИ-запрос не выполнен до конца. React не нужно ждать, пока в конструкторе будет этот запрос
            и пока он выполнится*/
        });

    //response.data.items - это и есть массив пользователей который приходит в ответе
    //причем получается что здесь мы props задаем и здесь же в конструкторе эти props принимаем
    //setUsers - через него мы общаемся со State.

    //этот метод делает setUsers в файле users-reducer.js и там есть return ...state, через который мы и получаем пользователей назад. Вероятно,
    // эти пользователи через props прилетают в этот метод.
}

    render() {
    let pagesCount = this.props.totalUsersCount / this.props.pageSize;
    let pages = [];
    for (let i =1; i <= pagesCount; i++) {
        pages.push(i);//заполним массив pages значениями i. i = pagesCount, которые мы получаем в результате деления
        // количества всех пользователей на максимально разрешенное количество пользователей на одну страницу.
        //получается что pages = количеству страниц в массиве (соответственно на странице).
        }
        return <div>
            <div>
                {/**
                 Это функция отображения страниц с пользователями на странице users. Читает количество данных в массиве pages
                 и выводит это число на страницу.
                 true && - определяет, что если страница выделена - тогда она будет иметь класс selectedPage. Если нет - тогда
                 без класса будет. Но - тут нужно добавить условие, что если выбрана страница - тогда она selected, а если нет - то нет.
                 Этого условия не хватает. Такие данные о выделенных страницах нужно хранить в state(состоянии) страницы.
                 */}
                {pages.map(p => {
                    <span className={true && styles.selectedPage}>{p}</span>
                })}
            </div>
            {
                this.props.users.map( u => <div key={u.id}>
            <span>
        <div>
             <img src={u.photos.small != null ? u.photos.small : profilePhoto}/>
        </div>
        <div>
            { u.followed
            ? <button onClick={() => {this.props.unfollow(u.id)}}>Unfollow</button>
            : <button onClick={() => {this.props.follow(u.id)}}>Follow</button>}
        </div> {/*? и : и } это похоже что механизм реализации разных значений и функций для кнопки, когда проверяют статус кнопки
        -followed false или true */}
        </span>
            <span>
        <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
        </span>
        <span>
 {/* <div>{u.location.city}</div>
        <div>{u.location.country}</div>  u.location.city и u.location.country - таких полей нет среди прилетевших юзеров - поэтому тут и undefined. По запросу в сам апи нет
        этих полей и я не понимаю для чего он поставил здесь эти пустые поля*/}
        </span>
        </span>
        </div>)
        }
        </div>
}
}
export default Users;