import React from 'react';
import './Profile.css';
import ProfileInfo from "./ProfileInfo";
import Content from "./Content";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <Content/>
        </div>
    );
}

export default Profile;

//Поставил скобки после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка