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
    /**
     * Это GET API запрос с параметрами после знака вопроса (page, count) которые вытягивают номер текущей страницы и количество пользователей на одной странице. Данные для этого запроса
     * берутся из this.props.currentPage, this.props.pageSize которые тянутся изначально из users-reducer. То есть какие значения пользователь выберет - такими они и будут вставлены в этот запрос и
     * такие пользователи подтянутся на страницу.
     * Для проверки работоспособности url можно вручную выполнить get запрос в браузере:
     * https://social-network.samuraijs.com/api/1.0/users?page=3&count=10
     *
     *
     * ВНИМАНИЕ! ЗДЕСЬ ЛЕГКО ОШИБИТЬСЯ И СОЗДАТЬ БАГ из-за одинарных кавычек! Есть кавычки одинарные, есть двойные, а есть кавычки которые стоят возле ~. Так вот именно эти кавычки
     * возле знака ~ - `и нужно выбрать, иначе не будет работать - НЕ будет тянуться this.props.currentPage.
     */
    componentDidMount() {
   // const axios = require('axios');//эта хрень не обязательна, но пусть будет.
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalCount(response.data.totalCount);
        });
            /*Раньше кстати этот АПИ запрос был в конструкторе и данные летели прямо в конструктор и оттуда соответственно в props.
            Одна из причин почему перенесли этот запрос из конструктора - потому что React хочет отрисовать материал,
            даже если этот асинхронный АПИ-запрос не выполнен до конца. React не нужно ждать, пока в конструкторе будет этот запрос
            и пока он выполнится*/

    //response.data.items - это и есть массив пользователей который приходит в ответе
    //причем получается что здесь мы props задаем и здесь же в конструкторе эти props принимаем
    //setUsers - через него мы общаемся со State.

    //этот метод делает setUsers в файле users-reducer.js и там есть return ...state, через который мы и получаем пользователей назад. Вероятно,
    // эти пользователи через props прилетают в этот метод.
}

    /**
     * Функция выполняет запрос на сервер с просьбой дать именно указанное количество пользователей и отобразить их на конкретной странице по счету - то есть именно эта
     * функция будет делать запрос. Так как это обработчик html - принимает параметры e(event), но так как мы в нее передадим параметр номера страницы - pageNumber, то его заменим
     * для удобства на pageNumber.
     * this.props.setCurrentPage(pageNumber) - вызывает dispatch метод из users-reducer и из usersContainer и использует его для установки текущей выбраной страницы пользователем,
     которую пользователь и выберет.

     pageNumber здесь так же используется в API запросе в отличии от того метода в componentDidMount, который использует значение из props. Значение в props для componentDidMount -
     старая, открытая уже страница а не та по которой кликнули, та по которой кликнули - pageNumber.

     componentDidMount - при инициализации компоненты подтягивает первую страницу всех пользователей по умолчанию(this.props.currentPage в users-reducer до момента перезаписи этого значения - то есть когда мы просто
     открываем страницу users - всегда равен ПЕРВОЙ СТРАНИЦЕ,
     до момента пока значение pageNumber после клика не перезапишет то значение в users-reducer),
     а вот уже уже при определенном клике по конкретной странице - пользователь выбирает другую
     страницу (значение pageNumver)и еще раз делает запрос на сервер но уже с номером другой страницы. pageSize имеет смысл брать из props, потому что он не меняется. Так работает метод onPageChanged.

     Возможено, для componentDidMount следовало бы по умолчанию показа
     */
    onPageChanged= (pageNumber)=>{
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
}
    render() {
        /**
         * Math.ceil - этол округления дробного числа до большего целого числа. Например, у нас 19 пользователей, а максимально число пользователей на странице - 5 пользователей
         * и тогда общее число страницу будет отображаться - 4.6 страниц,
         * но показано будет только целое число страниц - то есть четыре страниц, а пятая страница с пользователями не будет показана. Чтобы такого не было - необходимо  округлять число до большего
         * и тогда на последней странице будут показаны еще существующие юзеры.
         * @type {number}
         */
    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
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
                 this.props.currentPage === p && styles.selectedPage - определяет, что если страница выделена - тогда она будет иметь класс selectedPage. Если нет - тогда
                 без класса будет. То есть - если страница выбрана пользователем - тогда она selected, а если нет - то нет.
                 Такие данные о выделенной странице тянутся из в state(состоянии) страницы (из users-reducer в users-container и оттуда уже сюда в users.jsx.

                 onClick={(e) => {this.onPageChanged}} - вызывает функцию onPageChanged c аргументом p - pageNumber, которая вызывает dispatch метод из users-reducer и из usersContainer и
                 использует его для установки текущей выбраной страницы пользователем,которую пользователь и выберет.
                 Пока не произойдет event(MouseEvent - click on page number(Span) - не произойдет вызов функции onClick - onPageChanged. То есть функция вызовется при клике на span.
                 */}
                {pages.map(p => {
                   return <span className={this.props.currentPage === p && styles.selectedPage} onClick={(e) => {this.onPageChanged(p);}}>{p}</span>
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