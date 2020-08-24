import React from 'react';
import './Content.css';
import Posts from './Posts';


const Content = (props) => {




    let Post = props.postsData
        .map(post => <Posts imgUrl = {post.imgUrl} message = {post.message} likesCount = {post.likesCount} UserPhoto = {post.UserPhoto} />)

    let newPostElement = React.createRef();

    let addPost = (props) => {

       let text = newPostElement.current.value;
       props.addPost2(text);
    }

    let addPost2 = (addPost) => {
        let newPost = {
            id: 5,
            message: addPost,
            likesCount: 0
        }
    };


    return (




<div className='content'>


<div className = "Content1">
<img src = "https://vn.com.ua/Media/images/complex/big/8e361cb8c642a6428897ac5087eae762.jpg"></img>
</div>

<div className = "AvaDescription">
<img src = "https://images-na.ssl-images-amazon.com/images/I/71kNvlpS9GL._AC_SX466_.jpg"></img>
</div>

<div className = "UserName">
Kenny
</div>

<div className='Posts'>
<textarea ref = { newPostElement } ></textarea>
<div className='PostButtons'>

{/*
<button size="Large" className='PostButton1' onClick={ addPost } >Add post</button>
<button size="Large" className='PostButton1' onClick={ () => {alert ('I am a new post')} } >Add post</button>

 */}
<button size="Large" className='PostButton1' onClick={ addPost } >Add post</button>
<button size="Large" className='PostButton2' onClick={ () => {alert ('I will remove a new post')} }>Remove</button>

</div>
</div>

{Post}

</div>
);

}

export default Content;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка