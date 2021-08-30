import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from '../Redux/profile-reducer.js';
import {withRouter} from "react-router-dom";
import {usersApi} from "../api/api.js";

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
        usersApi.profile(userId)
            .then(data => {
                this.props.setUserProfile(data);//response.data - data это то что приходит в ответе - одна из строк
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

/**
 * Это дает нам то, что в зависимости от страницы вызова - ProfileContainer видет откуда вызов был.
 * withRouter работает так же как и Connect. Connect - возвращает новую компоненту, предварительно закинув в нее данные из store.
 *
 * withRouter работает так же - возвращает новую компоненту, только закидывает в нее данные из URL (текущий путь).
 * @type {React.ComponentClass<Omit<RouteComponentProps<any>, keyof RouteComponentProps<any>> & WithRouterProps<ProfileContainer>> & WithRouterStatics<ProfileContainer>}
 */
let WithUrlDataContainerComponent = withRouter(ProfileContainer);

/**
 * Раньше было вот так вот:
 * export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);
 * Теперь работает по другому - сначала withRouter прокидывает данные из url ProfileContainer,
 * потом этот WithUrlDataContainerComponent отдается уже connect и туда прокидываются данные из props. Получается контейнер вокруг контейнера.
 * Так вот это работает.
 */

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);

//container создаст как бы еще одну контейнерную компоненту вокруг этой контейнерной компоненты.
//Мы отдаем эту функцию Connect, Connect эту фунцию вызовет