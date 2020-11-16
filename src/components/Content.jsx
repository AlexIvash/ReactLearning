import React, {useRef} from 'react';
import './Content.css';
import Posts from './Posts';
import store from "./../Redux/State";


const Content = (props) => {
   //const newPostElement = useRef(null); Этот вариант возможно был валиден, но оказался не нужен
    const newPostElement = React.createRef();

    /**
     * Это было костыльное решение, но в итоге onChange не нужен
     * потому что onChange всегда считывает значение из того что юзер вводит в поле. Я оставлю как пример,
     * но на самом деле эта функция совсем не нужна.
     *
     * Метод рабочий, но закомментирован чтобы не забивать лишний раз память
     */
    function readTextWhenChanged() {
      /*  if (newPostElement.current) {
            const changedData = newPostElement.current.value;
        }*/
    }
    function handleAddPostClick(){
        /**
         * newPostElement.current проверит наличие определенного элемента на странице.
         * Если элемент есть - только тогда код будет выполнен
         * const inputData = newPostElement.current.value; - берет именно значение с textArea в момент onChange
         *Я очень долго искал решение проблемы. И не видел value в списке доступных вариантов среди подсказок IDEA.
         * А оказалось что достаточно поставить current.value, хотя я перед этим ставил current.focus и это было неправильно:

         * console.log("I am in handleAddPostClick, inputData is: " + newPostElement.current.focus()); - это некорректный вариант
          */
        const inputData = newPostElement.current.value;
        store.addPost(inputData);
        }

    /**
     * store.getState() - ссылаемся на State.js файл в котором в _state лежит массив postsData с данными для постов.
     * slice(0).reverse - прямо здесь создают копию существующего массива и отображают его задом наперед
     * .map - передаем все данные из этого массива для отображения на странице
     */
    let Post = store.getState().postsData.slice(0).reverse()
        .map(post => <Posts imgUrl = {post.imgUrl} message = {post.message} likesCount = {post.likesCount} UserPhoto = {post.UserPhoto} />)
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
<div className='PostButtons'>
<textarea type="text" ref={newPostElement} onChange={readTextWhenChanged} />

    {/**
     Здесь мы вызываем метод handleAddPostClick который берет данные из textarea, пишет их в переменную inputData и передает
     в State.js
     */}
<input type="button" size="Large" className='PostButton1' onClick={handleAddPostClick} value="add post" />
<button size="Large" className='PostButton2' onClick={ () => {alert('I will remove a post')} }>Remove</button>
</div>
</div>
    { /**Здесь мы отрисовываем переменную Post, которая идет в State.js. - туда попадут данные которые мы считываем из текстового поля
     {Posts} -  а таким образом мы бы просто отрисовали компонент Posts - но нам это не нужно
     */}
{Post}
</div>
);
}
export default Content;

//Поставил скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка