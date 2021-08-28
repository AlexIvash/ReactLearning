import React from 'react';
import './Settings.css';
import {NavLink} from "react-router-dom";
import store from "./../Redux/State";

const fs = require('fs');
const path = require('path');

const Settings = (props) => {
    const userPhoto = React.createRef();
    const userPhotoUploadedByFileSystem = React.createRef();

    /**
     * В этой функции юзер добавляет свое фото. Оно хранится в переменной в state.js
     * Если юзер не добавил фото - вместо него будет хардкод картинка
     */
    function changePhotoUploadUrl() {
        const changedUserPhoto = userPhoto.current.value;
        store.setUserPhoto(changedUserPhoto);
    }

    function changePhotoUploadFromComputer() {

        /**
         * В этой функции файл должен быть взят из какого-то места с компьютера
         * и перемещен в папку src/profilePhoto. Когда он будет перемещен - в State.js мы будем брать этот файл
         * и использовать его как фотографию профиля
         */
        //function sendRes(url) {
        //let filePath = path.join(__dirname+'../profilePhoto/', 'profilePhoto.jpeg');

//директория + имя папки + название файла
        /*
        OR
         if(res.files){
             console.log(res.files);
             //let file = path.join(__dirname+'/uploads'+'/excelAutomations.js');
             let file = req.files.file;
             let filename = file.name;
             console.log(filename);

             file.mv('./uploads/'+filename, function (err) {
                 if (err) {
                     res.send(err);
                 } else {
                     res.send(file);
                 }
             });
         }

         OR

         fs.readFile(filePath, (err, content)=>{
                 if (err) {
                     throw err;
                 }

                     console.log("file has been written");
                 var mime = require('mime').lookup(filePath);
                 res.setHeader('Content-Type', mime + "; charset=utf-8");
                 res.end(content);

             })

         */

        let filePath = userPhotoUploadedByFileSystem.current.value;
        fs.readFile(filePath, (err, content) => {
            if (err) {
                throw err;
            }

            console.log("file has been written");
            let mime = require('mime').lookup(filePath);

            // const changedUserPhoto = userPhotoUploadedByFileSystem.current.value;
            store.setUserPhoto(changePhotoUploadUrl);
        })
        return (
            <div className="Settings">
                <NavLink to="/Settings">
                    Settings
                </NavLink>
                <div className="updatePhoto">
                    Please insert here url of photo you want to use as your profile photo
                    <input type="text" ref={userPhoto}/>
                    <input type="button" size="Large" onClick={changePhotoUploadUrl}
                           value="Update profile photo by image url"/>

                    OR upload your personal photo(BEING DEVELOPPED):
                    <input type="file" ref={userPhotoUploadedByFileSystem}/>
                    <input type="button" size="Large" onClick={changePhotoUploadFromComputer}
                           value="Upload profile photo from computer"/>
                </div>
            </div>
        );
    }
}

export default Settings;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка