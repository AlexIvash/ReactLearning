import store from "./State";
import {profileApi, usersApi} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT"
const DELETE_LAST_POST = "DELETE-LAST-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

let initialState = {
    profile: null,
    status: ''
}

const profileReducer = (postsData, action, textFromNewPost, imageFromNewPost, state = initialState) => {
    switch (action.type) {

        /**
         * textFromNewPost - это сообщение которое берется из поля ввода на странице content.jsx
         * и мы передаем его сюда из страницы Content (под роутом profile)
         */
        case ADD_POST:
            var userPhoto = store.getUserPhoto();
            console.log("I am addPost");

            /**
             * This variable stores photo added from user in settings. Temporary is only link of photo from
             * the internet, but it might be - it will also store the userPhoto uploaded to this site.
             *
             * It works that way - it added once, then it will be used every time user post something
             */


            /**
             * TODO: if block does not work because it will be started only if textFromNesPost does not exist. in other case it won't work. Therefore it needs to be
             * TODO: changed to another operator like switch or else switch with two arguments may help me https://stackoverflow.com/questions/5872480/multiple-argument-switch-statement
             * TODO: UPD - switch didn't help me
             */

            /**
             * Вместо пустого message будет добавляться техническое сообщение
             */
            if (textFromNewPost === undefined || textFromNewPost === null || !textFromNewPost.length || !textFromNewPost) {
                let textFromNewPost = "Due to technical issue we can't read your data from text-area now. Please try it after fixing code";

                /**
                 * Вместо пустого userPhoto будет добавляться hard-code картинка
                 */
                if (userPhoto === undefined || userPhoto === null || !userPhoto.length || !userPhoto) {
                    let userPhoto = "https://camo.githubusercontent.com/a94717d64129c017b934e8d300f735d3a2f2a34b31e52ac748e0d132127a72b3/68747470733a2f2f6a656e737365676572732e636f6d2f7374617469632f6d656469612f6167656e742e706e67";

                    /**
                     * Вместо пустого фото из новго поста будет добавляться hard-code картинка
                     */
                    if (imageFromNewPost === undefined || imageFromNewPost === null || !imageFromNewPost.length || !imageFromNewPost) {
                        let imageFromNewPost = "https://image.freepik.com/free-vector/real-state-agent-cartoon_24640-36160.jpg";

                        /**
                         * Так как сейчас здесь массив вместо базы данных то для того чтобы проверить что сообщение было добавлено
                         * необходимо перейти на другую вкладку приложения и вернуть назад. Но нельзя перезагружать страницу
                         * потому что массив при перезагрузке страницы обнуляется.
                         */
                        let newPost = {
                            imgUrl: imageFromNewPost,
                            message: textFromNewPost,
                            likesCount: '0',
                            Comments: '1',
                            UserPhoto: userPhoto
                        };

                        /** Везде, где было вот такое выражение:
                         * this._state.postsData.push(newPost);
                         * нужно заменить на это:
                         * state.postsData.push(newPost);
                         * //statePostData
                         * Потому что теперь state находится не на этой странице
                         * state - это this._state, который передается к нам со страницы State.js
                         */
                        postsData.push(newPost);
                        console.log(textFromNewPost);

                        /**
                         * Если открыть консоль браузера - потому что все данные из консоли будут выводиться именно туда
                         * станет ясно что на самом деле метод addPost вызванный из Content.jsx выполняется в двух случаях:
                         *
                         * <button size="Large" className='PostButton1' onClick={ store.addPost.bind(store)} >Add post</button>
                         * И
                         * <button size="Large" className='PostButton1' onClick={ store.addPost(newPostElement)} >Add post</button>
                         * ну или такая вариация тоже есть:
                         *     <button size="Large" className='PostButton1' onClick={ store.addPost("message from me")} >Add post</button>
                         *
                         * И данные добавляются из поста. Проблема только в том что нужно перейти на другую вкладку чтобы появилось сообщение
                         * и перезагружать нельзя (потому как тогда приложение перезапустится).
                         * Это проблема отсутствия соединения с базой данных - будет решена позже.
                         *
                         */
                        console.log(store.getState().postsData);
                    }
                }
            } else {
                let newPost = {
                    imgUrl: imageFromNewPost,
                    message: textFromNewPost,
                    likesCount: '0',
                    Comments: '1',
                    UserPhoto: userPhoto
                };
                postsData.push(newPost);
            }
            return postsData;
        case UPDATE_NEW_POST_TEXT:
            var userPhoto = store.getUserPhoto();
            console.log("I am editPost");

            /**
             * This variable stores photo added from user in settings. Temporary is only link of photo from
             * the internet, but it might be - it will also store the userPhoto uploaded to this site.
             *
             * It works that way - it added once, then it will be used every time user post something
             */

            /**
             * TODO: if block does not work because it will be started only if textFromNesPost does not exist. in other case it won't work. Therefore it needs to be
             * TODO: changed to another operator like switch or else switch with two arguments may help me https://stackoverflow.com/questions/5872480/multiple-argument-switch-statement
             * TODO: UPD - switch didn't help me
             */

            /**
             * Вместо пустого message будет добавляться техническое сообщение
             */
            if (textFromNewPost === undefined || textFromNewPost === null || !textFromNewPost.length || !textFromNewPost) {
                let textFromNewPost = "Due to technical issue we can't read your data from text-area now. Please try it after fixing code";

                /**
                 * Вместо пустого userPhoto будет добавляться hard-code картинка
                 */
                if (userPhoto === undefined || userPhoto === null || !userPhoto.length || !userPhoto) {
                    let userPhoto = "https://camo.githubusercontent.com/a94717d64129c017b934e8d300f735d3a2f2a34b31e52ac748e0d132127a72b3/68747470733a2f2f6a656e737365676572732e636f6d2f7374617469632f6d656469612f6167656e742e706e67";

                    /**
                     * Вместо пустого фото из нового поста будет добавляться hard-code картинка
                     */
                    if (imageFromNewPost === undefined || imageFromNewPost === null || !imageFromNewPost.length || !imageFromNewPost) {
                        let imageFromNewPost = "https://image.freepik.com/free-vector/real-state-agent-cartoon_24640-36160.jpg";

                        /**
                         * Так как сейчас здесь массив вместо базы данных то для того чтобы проверить что сообщение было добавлено
                         * необходимо перейти на другую вкладку приложения и вернуть назад. Но нельзя перезагружать страницу
                         * потому что массив при перезагрузке страницы обнуляется.
                         */
                        let newPost = {
                            imgUrl: imageFromNewPost,
                            message: textFromNewPost,
                            likesCount: '0',
                            Comments: '1',
                            UserPhoto: userPhoto
                        };
                        postsData.push(newPost);
                        console.log(textFromNewPost);

                        /**
                         * Если открыть консоль браузера - потому что все данные из консоли будут выводиться именно туда
                         * станет ясно что на самом деле метод addPost вызванный из Content.jsx выполняется в двух случаях:
                         *
                         * <button size="Large" className='PostButton1' onClick={ store.addPost.bind(store)} >Add post</button>
                         * И
                         * <button size="Large" className='PostButton1' onClick={ store.addPost(newPostElement)} >Add post</button>
                         * ну или такая вариация тоже есть:
                         *     <button size="Large" className='PostButton1' onClick={ store.addPost("message from me")} >Add post</button>
                         *
                         * И данные добавляются из поста. Проблема только в том что нужно перейти на другую вкладку чтобы появилось сообщение
                         * и перезагружать нельзя (потому как тогда приложение перезапустится).
                         * Это проблема отсутствия соединения с базой данных - будет решена позже.
                         *
                         */
                        console.log(postsData);
                    }
                }
            } else {
                let newPost = {
                    imgUrl: imageFromNewPost,
                    message: textFromNewPost,
                    likesCount: '0',
                    Comments: '1',
                    UserPhoto: userPhoto
                };
                //remove last element
                postsData.pop();
                //add new element to the post
                postsData.push(newPost);
            }
            return postsData;
        case DELETE_LAST_POST:
            /** Везде, где было вот такое выражение:
             * this._state.postsData.pop();
             * нужно заменить на это:
             * state.postsData.pop();
             * //statePostData
             * Потому что теперь state находится не на этой странице
             * state - это this._state, который передается к нам со страницы State.js
             */
            //remove last element
            postsData.pop();
            return postsData;
        case SET_USER_PROFILE: {
            /**
             * Возьмем копию state и вернем ее с тем профилем который приходит из action.
             * Этот store сидит в redux. Такой store из redux мы создали в redux-store.js файле
             */
            return {...state, profile: action.profile} //это правильный вариант доступа к state,
            // нужно переделать остальные action выше под него
            //state мы взяли из redux-store - там мы нашему reducer'у дали доступ к state.
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        // return postsData; Так раньше было, но это неправильно - это не вернет, так как это unreacheable code
        default:
            return state;

    }
}
/**
 * Задача этих функций - вернуть объект (Action) который будет задиспатчен и отправлен в reducer.
 */
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type: SET_STATUS, status})
/**
 * thunk функции, которая принимает метод dispatch и может dispatch'ить функции,
 * которые при повторном запуске(замыкании) превратятся в объекты. До, перед, или после синхронной операции может выполняться thunk
 * (как запрограммируем - так и будет выполняться).

 *.then(data => а не .then(response => - правильный вариант, потому что так возвращается в usersApi
 */
export const getUserProfile = (userId) => (dispatch) => {
    usersApi.profile(userId)
        .then(data => {
            dispatch(setUserProfile(data));//response.data - data это то что приходит в ответе - одна из строк
            //В данный момент нам сюда возвращается просто data, из-за того что response.data уже есть в api.js файле в instanse.get
            //полный путь доступа к данным изначально response.data.data(да, там две data)
        });
}

export const getStatus = (userId) => (dispatch) => {
    profileApi.getStatus(userId)
        .then(data => {
            dispatch(setStatus(data));//response.data - data это то что приходит в ответе - одна из строк.
            //В данный момент нам сюда возвращается просто data, из-за того что response.data уже есть в api.js файле в instanse.get
            //полный путь доступа к данным изначально response.data.data(да, там две data)
        });
}

export const updateStatus = (status) => (dispatch) => {
    profileApi.updateStatus(status)
        .then(data => {
            //в сервере на back end есть ответ с ошибкой(resultCode === 1), но мы пока не обрабатываем этот код.
            //Пока мы только даем действия, если ошибки нету.
            if (data.resultCode === 0) {
                dispatch(setStatus(status));//response.data - data это то что приходит в ответе - одна из строк.
                //В данный момент нам сюда возвращается просто data, из-за того что response.data уже есть в api.js файле в instanse.get
                //полный путь доступа к данным изначально response.data.data(да, там две data)
                //Возможно здесь нужно data.status?
            }
        });
}


export default profileReducer;