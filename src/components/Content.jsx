import React from 'react';
import './Content.css';
import Posts from './Posts';
import state from "../Redux/State";
{/*import State from "./../Redux/State";*/}


const Content = (props) => {
    let Post = props.postsData
        .map(post => <Posts imgUrl = {post.imgUrl} message = {post.message} likesCount = {post.likesCount} UserPhoto = {post.UserPhoto} />)
    let newPostElement = React.createRef();
    /**
    Сюда приходит значение из текстового поля. И видимо идет дальше в props через props.addPost();
     */
    let addPost = (newPostElement) => {
       let text = newPostElement;

        {/*
        let text = newPostElement.current.value;


        Какого черта этот метод нигде не вызывается если стоит так вот:
        props.addPost2(text); ?
        Или вот так вот:
        return text;
        Или вот так вот:
        props.postsData.addPost(text);
        ?
        Решение было:
         addPost2(text);
        Я думаю что тут была задумка передавать эти данные через входящие параметры
        Временно закомментировал addPost2
        */}
        let newPost = {
            imgUrl: 'https://i.ytimg.com/vi/v_mBNCZ_jfA/maxresdefault.jpg',
            id: 5,
            message: addPost,
            likesCount: 0
        }
        {/*
        props.addPost.bind(state);
*/}



        {/**
         У меня такое впечатление что данные отсюда для месседжа нужно передавать куда-нибудь в Posts компонент и там уже
         читать всю ту дичь - и потом это все равно как- то вернуть в state - ну в общем я даже хз
         */}


    }
    {/*Какого черта этот метод нигде не вызывается? Может он и не должен быть вызыванным? Я закомментируюд временно
    По идее сюда должна прилетать newPost из State.js . Зачем здесь такая же переменная? Или наоборот отсюда
        летит в State.js?
        или наоборот в addPost2 прилетают данные из addPost и отсюда мы эти данные каким-то путем вставляем куда-нибудь,
        например в props:
        props.postsData.newPost(text); или вот так вот props.postsData.addPost(newPost); или return newPost;

    let addPost2 = (addPost) => {
        let newPost = {
            imgUrl: 'https://i.ytimg.com/vi/v_mBNCZ_jfA/maxresdefault.jpg',
            id: 5,
            message: addPost,
            likesCount: 0
        }
        return newPost;
    };*/}
    return (
<div className='content'>
<div className = "Content1">
</div>
<div className = "AvaDescription">
<img src = "https://rideexpeditions.com/wp-content/uploads/2017/09/Dirtbike-upgrade-8.jpg"></img>
</div>
<div className = "UserName">
Oleksandr(you)
</div>
<div className='Posts'>
    {/**
     https://www.youtube.com/watch?v=Bq_tmt-hRn0&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&index=38
    нужно связать эту кнопку с методом добавления данных
     данные будут добавляться в state.js
     Здесь начинается работа метода addPost
     */}
<textarea ref = { newPostElement } ></textarea>
<div className='PostButtons'>
{/*
<button size="Large" className='PostButton1' onClick={ addPost } >Add post</button>
<button size="Large" className='PostButton1' onClick={ () => {alert ('I am a new post')} } >Add post</button>
 */}
    {/**
     Здесь мы вызываем метод addPost который берет данные из textarea, пишет их в переменную text. А text мы должны каким-то образом передать в state
     и из state в render.js
    */}
<button size="Large" className='PostButton1' onClick={ addPost(newPostElement) } >Add post</button>
<button size="Large" className='PostButton2' onClick={ () => {alert ('I will remove a new post')} }>Remove</button>
</div>
</div>
    {/*Здесь мы отрисовываем переменную Post, которая идет в State.js. - туда попадут данные которые мы считываем из текстового поля*/}
    {/*{Posts} а таким образом мы бы просто отрисовали компонент Posts - но нам это не нужно*/}
{Post}
</div>
);

}

export default Content;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка