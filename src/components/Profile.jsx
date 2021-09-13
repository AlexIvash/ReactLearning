import React from 'react';
import './Profile.css';
import ProfileInfo from "./ProfileInfo";
import Content from "./Content";

/**
 * Профайл не отобразится, пока профиль не придет. Это из-за того что не обязательно сразу отрабатывает
 * get status в profileContainer - он может отработать после того как выполнится запрос на profilePhoto, по этому
 * может тупить profile.
 *
 * Если приходит первый profile, а не статус - тогда props не успевает сетаться и потому везде идет загрузка вместо нормального отображения страницы.
 */
const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <Content />
        </div>
    );
}

export default Profile;

//Поставил скобки после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка