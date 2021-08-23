import React from 'react';
import profilePhoto from '../profilePhoto/profilePhoto.jpeg';
import styles from "./Users.module.css";


/**
 * Если открыть в приложении страницу users, то там будет прилетать users с действительными данными про пользователей взятых из той ссылки. То есть axios, который в конструкторе
 * работает. Я не понимаю почему this.props при этом undefined
 *
 * В ситуации с этой компонентой - она нуждается в state, но state в нее не закидывается - она сама берет данные по api запросу и сама их же отрисовывает
 */

let Users = (props) => {
 /*   constructor(props) {
        super(props);//здесь передается конструирование родительской компоненте React.component
            // кстати этот if здесь НЕ обязателен, потому что конструирование объекта происходит всего один
}
Конструктор больше не нужен, так как даже если мы отдаем управление родительскому конструктору - это происходит по умолчанию, даже если не писать super(props);
Конструктор был нужен для АПИ запроса, но теперь мы отдали апи запрос в componentDidMount метод. Этот метод ушел в UsersContainer ->UsersApiComponent, для удобства
            Раньше кстати этот АПИ запрос был в конструкторе и данные летели прямо в конструктор и оттуда соответственно в props.
            Одна из причин почему перенесли этот запрос из конструктора - потому что React хочет отрисовать материал,
            даже если этот асинхронный АПИ-запрос не выполнен до конца. React не нужно ждать, пока в конструкторе будет этот запрос
            и пока он выполнится
*/

    /**
     * Math.ceil - этол округления дробного числа до большего целого числа. Например, у нас 19 пользователей, а максимально число пользователей на странице - 5 пользователей
     * и тогда общее число страницу будет отображаться - 4.6 страниц,
     * но показано будет только целое число страниц - то есть четыре страниц, а пятая страница с пользователями не будет показана. Чтобы такого не было - необходимо  округлять число до большего
     * и тогда на последней странице будут показаны еще существующие юзеры.
     * props приходят из UsersContainer
     * @type {number}
     * Если let Users = (props) = {} - тогда здесь снизу можно использовать props.
     * Но если это Class Users extends React.component {} - тогда тут нету props в параметрах и соответственно необходимо писать this.props.pageSize и тд.
     *
     * Так же, если let Users = (props) = {} - тогда необходимо делать return
     *
     * Если Class Users extends React.component {} - тогда необходимо делать render() {}
     */
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
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

                 UPDATE- снизу уже без this. нужно писать. Просто везде должно быть props. Вообще все данные они теперь беруться не из this.props как это было когда данные создавались в этом же
                 файле и кидались в props, и их доставали через this.props

                 Теперь все данные просто приходят из UsersContainer и оттуда мы берем их через props.


                 this.props.currentPage === p && styles.selectedPage - определяет, что если страница выделена - тогда она будет иметь класс selectedPage. Если нет - тогда
                 без класса будет. То есть - если страница выбрана пользователем - тогда она selected, а если нет - то нет.
                 Такие данные о выделенной странице тянутся из в state(состоянии) страницы (из users-reducer в users-container и оттуда уже сюда в users.jsx.

                 onClick={(e) => {this.onPageChanged}} - вызывает функцию onPageChanged c аргументом p - pageNumber, которая вызывает dispatch метод из users-reducer и из usersContainer и
                 использует его для установки текущей выбраной страницы пользователем,которую пользователь и выберет.
                 Пока не произойдет event(MouseEvent - click on page number(Span) - не произойдет вызов функции onClick - onPageChanged. То есть функция вызовется при клике на span.
                 */}
                {pages.map(p => {
                   return <span className={props.currentPage === p && styles.selectedPage} onClick={(e) => {props.onPageChanged(p);}}>{p}</span>
                })}
            </div>
            {
                props.users.map( u => <div key={u.id}>
            <span>
        <div>
             <img src={u.photos.small != null ? u.photos.small : profilePhoto}/>
        </div>
        <div>
            { u.followed
            ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
            : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
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
export default Users;