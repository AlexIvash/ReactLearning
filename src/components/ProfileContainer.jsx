import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
//import {setUserProfile} from '../Redux/profile-reducer.js';
//больше не нужно, так как мы не set'аем отсюда userProfile, а сетаем его отдельно через thunk функцию в profile-reducer
import {getUserProfile} from '../Redux/profile-reducer.js';
import {Redirect, withRouter} from "react-router-dom";
import {usersApi} from "../api/api.js";
import Login from "./Login";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        //axios.get(`https://rideexpeditions.com/wp-content/uploads/2017/09/Dirtbike-upgrade-8.jpg`) - это мое фото, но оно идет по неправильному запросу
        //то есть без photos.large потому я решил оставить все как на видео пока что

        let userId = this.props.match.params.userId;

        /**
         *Если пользователь открывает Profile без id - тогда он по дефолту будет равен iD=2,
         * что соответствует номеру пользователя под которым он был создан.

         * data сюда прилетает, а не response, потому что в api.js выполняет callback then который делает
         * return response.data. Потому здесь важно использовать data.resultCode, а не response.data.resultCode
         */
        if (!userId) {
            userId = 2;
        }
        /** usersApi.profile(userId)
         .then(data => {
                this.props.setUserProfile(data);//response.data - data это то что приходит в ответе - одна из строк
            });
         перенесено в thunk функцию в profile-reducer
         */
        this.props.getUserProfile(userId);
    }

    render() {
        /**
         * Функция логина. Не работает, так как нет платной подписки на апи. Потому пользователь всегда будет "залогинен"
         */
        /*if (this.props.isAuth === false) { снизу более короткая и более правильная форма
        if (!this.props.isAuth) {
            return <Redirect to='/login' />
        } Нам больше это не нужно, так как тепреь это HOC функция*/

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

/**
 *
 Если бы эта переменная не повторяла название имеющегося выше AuthRedirectComponent -  она бы выдавала ошибку что нету key-word let/const.

 AuthRedirectComponent = connect (mapStateToPropsForRedirect) (AuthRedirectComponent);
 И это нам больше не нужно
 */

/**
 * Это дает нам то, что в зависимости от страницы вызова - ProfileContainer видет откуда вызов был.
 * withRouter работает так же как и Connect. Connect - возвращает новую компоненту, предварительно закинув в нее данные из store.
 *
 * withRouter работает так же - возвращает новую компоненту, только закидывает в нее данные из URL (текущий путь).
 * @type {React.ComponentClass<Omit<RouteComponentProps<any>, keyof RouteComponentProps<any>> & WithRouterProps<ProfileContainer>> & WithRouterStatics<ProfileContainer>}
 *
 * let WithUrlDataContainerComponent = withRouter(ProfileContainer);
 */

//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
/**
 * Раньше было вот так вот:
 * export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);
 * Теперь работает по другому - сначала withRouter прокидывает данные из url ProfileContainer,
 * потом этот WithUrlDataContainerComponent отдается уже connect и туда прокидываются данные из props. Получается контейнер вокруг контейнера.
 * Так вот это работает.


 export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);
 {setUserProfile} больше не нужен, так как мы больше не сетаем это из UI
 теперь компонента сама получает эти данные через thunk функцию. Ее вызов выше
 "this.props.getUserProfile(userId);"
 */
//export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
//container создаст как бы еще одну контейнерную компоненту вокруг этой контейнерной компоненты.
//Мы отдаем эту функцию Connect, Connect эту фунцию вызовет

export default compose(
    connect
    (mapStateToProps,
    {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);