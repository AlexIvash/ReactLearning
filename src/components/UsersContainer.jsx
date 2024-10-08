import React from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    /* followAC,
     unfollowAC,
     setUsersAC,
     setCurrentPageAC,
     setUsersTotalCountAC,
     toggleIsFetchingAC
     ^^Это было переименовано в связи с рефакторингом функции mapDispatchToProps для Connect.
     */

    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setUsersTotalCount,
    toggleIsFetching,
    toggleFollowingProgress,
    //getUsersThunkCreator сократили название в users-reducer до getUsers
    getUsers
} from '../Redux/users-reducer.js';
import axios from "axios";
//import preloader from '../common/preloader.gif';
import Preloader from "../common/Preloader/preloader";
import {usersApi} from "../api/api.js";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";

//import * as axios from "axios"; если используем такой импорт, то get возле axios подчеркивается в методе componentDidMount и приходится использоваться const axios = required 'axios'

/**
 * Контейнерная компонента для АПИ-запросов. Это та часть, которая не связана с другими функциями этой контейнерной компоненты.
 */
class UsersContainer extends React.Component {
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
     *
     componentDidMount - при инициализации компоненты подтягивает первую страницу всех пользователей по умолчанию(this.props.currentPage в users-reducer до момента перезаписи этого значения - то есть когда мы просто
     открываем страницу users - всегда равен ПЕРВОЙ СТРАНИЦЕ,
     до момента пока значение pageNumber после клика не перезапишет то значение в users-reducer),
     а вот уже уже при определенном клике по конкретной странице - пользователь выбирает другую
     страницу (значение pageNumber)и еще раз делает запрос на сервер но уже с номером другой страницы. pageSize имеет смысл брать из props, потому что он не меняется. Так работает метод onPageChanged.

     Возможено, для componentDidMount следовало бы по умолчанию показа

     UPDATE! Запросы перенесены на страницу api/api.js и в thunk функцию в users-reducer и вызываются через импортированный getUsers
     Раньше сюда приходил response с датой, теперь просто data, потому что data возвращается в api.js и теперь мы обращаемся напрямую не response.data, а просто data.
     И получаем в then не response, а data.
     */
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    /**
     * Функция выполняет запрос на сервер с просьбой дать именно указанное количество пользователей и отобразить их на конкретной странице по счету - то есть именно эта
     * функция будет делать запрос. Так как это обработчик html - принимает параметры e(event), но так как мы в нее передадим параметр номера страницы - pageNumber, то его заменим
     * для удобства на pageNumber.
     * this.props.setCurrentPage(pageNumber) - вызывает dispatch метод из users-reducer и из usersContainer и использует его для установки текущей выбраной страницы пользователем,
     которую пользователь и выберет.

     pageNumber здесь так же используется в API запросе в отличии от того метода в componentDidMount, который использует значение из props. Значение в props для componentDidMount -
     старая, открытая уже страница а не та по которой кликнули, та по которой кликнули - pageNumber.

     ЗАПРОС БЫЛ ПЕРЕНЕСЕН в API.js файл и в thunk функцию в users-reducer
     */
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);

    }

    render() {
        return <>{/*Эта хрень нужна для чего-то, но я так и не понял для чего.
        Это вместо фрагмента react'a. На тайм коде 10:13 https://www.youtube.com/watch?v=qE8ThPt1EIM&t=385s*/}
            {/*{this.props.isFetching ? <div><img src={preloader} /></div>: null} так было до - использовали картинку
            потом картинку вынесли отденъльно в js файл и там ее уже можно модифицировать как угодно для удобства*/}
            {this.props.isFetching ? <Preloader/> : null}
            {/*Если данные в данный момент идут - тогда идет картинка загрузки, если загрузки данных не происходит, то есть
            isFetching ==false, тогда null - то есть ничего не отобразится */}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

/**
 * Контейнерная компонента для функция для users компоненты.
 */

/**
 * Эта функция принимает весь глобальный state целиком и передает данные из state в props для компоненты Users.
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
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,//isFetching - идет ли процесс получения данных. Если false - нет, если идут - тогда true
        followingInProgress: state.usersPage.followingInProgress
    }
}

/**
 * Это вторая функция, которая служит для того чтобы передавать callback-функции компоненте Users
 * Здесь будут функции, которые компонента может вызывать. Функции - ActionCreator'ы. Но мы как бы не их диспатчим, а функции
 * которые эти actioncreator'ы вызывают. Потому что actionCreator'ы возвращают нам объект и вот мы диспатчим именно сам объект(хотя лучше сильно в это не вдумываться).
 * Мы пока не умеем диспатчить ничего, кроме объектов. Если диспатчить что-то другое - будет ошибка, потому что react не может диспатчить ничего кроме объекта
 *
 * Эти функции в свою очередь вызывают функцию action creator в users-reducer. Мы вызываем не сам action Creator, а результат
 * работы action Creator (чтобы это не значило). А action creator возвращает нам определенный action, то есть мы диспатчим
 * всегда какой-либо action.
 *
 *
 *
 * UPDATE: Эта функция была сокращена до более просто записи в export const. Так же стоит сказать,
 *
 * что this.props.setTotalCount(response.data.totalCount); была переименована в this.props.setUsersTotalCount(response.data.totalCount);. Ее тоже стоит вернуть
 * для работы старой версии этой функции
 * @param dispatch
 * @returns {{setUsers: setUsers, follow: G.IOptions.follow, unfollow: unfollow}}

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
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}
 */
{/**
 здесь берется компонента UsersContainer(до этого была просто Users компонента) и оборачивается в props, чтобы сработали dispatch методы
 причем сюда передасться users: state.usersPage.users и с помощью метода mapStateToProps в UsersContainer(до этого была просто Users компонента) будет сидеть свойство users.

 Так как раньше мы оборачивали Users container передавая этой компоненте данные, ее не нужно было вызывать в коде. Теперь нам необходимо ЗДЕСЬ вызвать Users компоненту. Поэтому будет добавлен
 код render для отрисовки Users компоненты

 * UPDATE: Эта функция была сокращена до более просто записи в export const

 export default connect(mapStateToProps, mapDispatchToProps) (UsersContainer);
 */
}

/**
 * Здесь теперь более сокращенный вариант mapDispatchToProps(выше в коментариях полный вариант этой функции). Здесь уже прямые ссылки на объект Action Creators.
 * Connect здесь проверяет, что ему пришла не функция а объект и делает обертывание этих пришедших ему значений CallBack'ами (для вызова Action Creator'ов ?)
 *
 *export default connect(mapStateToProps, {
    follow: followAC(),
    unfollow: unfollowAC,
    setCurrentPage: setCurrentPageAC,
    setTotalCount: setUsersTotalCountAC,
    toggleIsFetching: toggleIsFetchingAC
}) (UsersContainer);

 * Зачем такие сокращения кода? Для того, чтобы поменьше писать кода которые не связан с бизнес-логикой, но связан с обеспечением нормального функционирования наших компонент и связи со State.

 * Вот еще более интересное сокращение кода - теперь он будет НЕ через две запятых, а просто без них. Он полностью равен записанному выше коду. Эти ссылки видут на функции в users-reducer.js
 * файле. То есть здесь как бы не key:pair, а key и pair - одно и то же значение и это упрощенная версия получается.

 * Connect здесь сам создаст callback, который задиспатчит ActionCreator.

export default withAuthRedirect(connect(mapStateToProps, {
    follow,
    unfollow,
    //setUsers, перенесено в  getUsersThunkCreator и больше не нужно
    setCurrentPage,
    //setUsersTotalCount, перенесено в  getUsersThunkCreator и больше не нужно
    //toggleIsFetching, перенесено в  getUsersThunkCreator и больше не нужно
   // toggleFollowingProgress, это происходит как часть бизнес-процесса внутри thunk
    //getUsers: getUsersThunkCreator сократили потому что в users-reducer тоже сократили название функции
    getUsers
})(UsersContainer)); */

export default compose (withAuthRedirect, connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers}
)) (UsersContainer);
{/**
 Compose - это функция, которая позволяет получить результат одной функции(самой правой) и затем обработать его
 с помощью функции расположенной слева от правой функции.
 Compose служит здесь так:
 сначала выполняется функция connect, которая подсоединяет api запросы и затем при выполнении этих запросов
 выполняется функция withAuthRedirect. Выполнение идет справа налево. Но стоит отметить так - всегда вызывается самая правая функция,
 потом функция слева. Если функция больше чем две, то порядок такой:
 Самая права, самая левая, функция справа от левой (и так до бесконечности, зависит от количества функций).

      Функция слева должна иметь только один параметр,
 самая правая которая выполняется первой может иметь неограниченное количество параметров.
 Количество функций которые можно использовать в compose - не имеет ограничения.
 И в качестве параметров она имеет запросы follow/unfollow/setCurrentPage/getUsers в фигурных скобках.

 The connect() function connects a React component to a Redux store.
 provides its connected component with the pieces of the data it needs from the store,
 and the functions it can use to dispatch actions to the store.

 It does not modify the component class passed to it;
 instead, it returns a new, connected component class that wraps the component you passed in. - это значит что мы еще
 "как бы создаем" контейнерную компоненту вокруг нашей контейнерной компоненты UsersContainer
 и у этой компоненты есть доступ к данным state из redux - то есть она "connected to redux".

 В connect можно передавать любую компоненту - как функциональную (обычную без класса), так и классовую компоненту.
 Переданные в Connect функции будут вызваны(как я понимаю, при вызове этих функций).


 Исходя из всего вышеописанного сначала connect подключает usersContainer, выполняя функции follow, unfollow
 (а в них находятся api вызовы которые срабатывают если эти вызовы выполнять) и после этого выполняется функция withAuthRedirect.

 все апи вызовы импортируются сюда из api.js файла и передаются в фигурных скобках как mapDispatchToProps. Это по идее должно хорошо работать.
 */
}