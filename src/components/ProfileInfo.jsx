import React from 'react';
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import Preloader from "../common/preloader";

const ProfileInfo = (props) => {
    /**
     * Компонента вначале показывает Preloader, если данных нету. Если данные есть- тогда отображает профиль.
     * Ниже более сокращенный вариант    if(props.profile == null || props.profile == undefined)
     */
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                {/* <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' /> Это было раньше фото просто безымянного юзера
    <img src='https://rideexpeditions.com/wp-content/uploads/2017/09/Dirtbike-upgrade-8.jpg' /> Это была моя аватарка -я ее перенес теперь в profilePage.photos - то есть
    в ProfileContainer запрос и теперь она оттуда тянется*/}
            </div>
            <div className={styles.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <br></br>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;

//Поставил скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка