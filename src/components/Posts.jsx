import React from 'react';
import './Posts.css';

const Posts = (props) => {
console.log("Hey, it's a new post over there")
return (
<div className = "Posts1">
<div className = "Photochki">
<img src = {props.UserPhoto} className = "UserPhoto"></img>
<img src = {props.imgUrl} className = "ContentPhoto"></img>
</div>
<div>
{props.message}
</div>
<div>
<div>edit</div>
<span> {props.likesCount} like {props.Comments} comments</span>
</div>
</div>
);
}
export default Posts;

//Постав скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка