import React from 'react';
import './Profile.css';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from '../Redux/profile-reducer.js';

class ProfileContainer extends React.Component {

    componentDidMount() {
        //axios.get(`https://rideexpeditions.com/wp-content/uploads/2017/09/Dirtbike-upgrade-8.jpg`) - это мое фото, но оно идет по неправильному запросу
        //то есть без photos.large потому я решил оставить все как на видео пока что
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);//response.data - data это то что приходит в ответе - одна из строк
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

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);

//container создаст как бы еще одну контейнерную компоненту вокруг этой контейнерной компоненты.
//Мы отдаем эту функцию Connect, Connect эту фунцию вызовет