import './Content.css';
import Posts from './Posts';
import store from "./../Redux/State";
import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../utils/validators/validators";

const Content = (props) => {
    //Мы заменили это Field, потому больше не понадобится наверное.
    //const newPostElement = React.createRef();
  //  const newPostElementAddPhoto = React.createRef();

    /**
     * Это было костыльное решение, но в итоге onChange не нужен
     Этот onChange:
     <textarea type="text" ref={newPostElement} onChange={readTextWhenChanged} />

     * потому что onChange всегда считывает значение из того что юзер вводит в поле. Я оставлю как пример,
     * но на самом деле эта функция совсем не нужна.

     * Метод рабочий, но закомментирован чтобы не забивать лишний раз память
     */
    function readTextWhenChanged() {
        /*  if (newPostElement.current) {
              const changedData = newPostElement.current.value;
          }*/
    }

    function handleAddPostClick() {
        /**
         * newPostElement.current проверит наличие определенного элемента на странице.
         * Если элемент есть - только тогда код будет выполнен
         * const inputData = newPostElement.current.value; - берет именно значение с textArea в момент onChange
         *Я очень долго искал решение проблемы. И не видел value в списке доступных вариантов среди подсказок IDEA.
         * А оказалось что достаточно поставить current.value, хотя я перед этим ставил current.focus и это было неправильно:

         * console.log("I am in handleAddPostClick, inputData is: " + newPostElement.current.focus()); - это некорректный вариант
         */


        /* Может это пока заблочить? Это наверное уже не нужно, мы меняем на форму Field-Form
        const inputData = newPostElement.current.value;
        const newPostImage = newPostElementAddPhoto.current.value;
*/
        /**
         * This method used in dispatch method - in order to add new Post (ADD-POST action type)
         * @returns {{type: ADD-POST}}
         */
        let addPostActionCreator = () => {
            return {
                //type: 'ADD-POST', text: inputData, image: newPostImage
                type: 'ADD-POST'
            }
        }

        /**
         * So before it was an addPost method and now instead of it - there is a dispatch method, which
         * receive action type. And if action is "ADD-POST" - dispatch will do that functionality which ADD-POST did.
         It was:
         store.addPost(inputData, newPostImage);
         And now it is:
         store.dispatch('ADD-POST', inputData, newPostImage);
         */
        store.dispatch(addPostActionCreator()/*, inputData, newPostImage наверное не нужно потому что меняем на Field Redux form*/);
    }

    /**
     * This function is responsible for update post on the Content page
     *
     * This method used in dispatch method - in order to update new Post (UPDATE-NEW-POST-TEXT action type)
     * @returns {{type: UPDATE-NEW-POST-TEXT}}
     *          Кстати если функция только что-то возвращает - тогда не обязательно слово return. Было:
     *          let updatePostActionCreator = () => {
     *             return {
     *                 type: 'UPDATE-NEW-POST-TEXT', newText: inputData
     *             }
     *         }
     *          Стало:
     *          let updatePostActionCreator = () => ({
     *                 type: 'UPDATE-NEW-POST-TEXT', newText: inputData
     *         })
     */
    /**
     * Закомментировано так как будет реализована другая логика
    function handleEditPostClick() {
        const inputData = newPostElement.current.value;
        const newPostImage = newPostElementAddPhoto.current.value;



        let updatePostActionCreator = () => ({
            type: 'UPDATE-NEW-POST-TEXT', newText: inputData
        })
        store.dispatch(updatePostActionCreator(), inputData, newPostImage);
    } */

    /**
     * This function is responsible for delete post on the Content page
     */
    function handleDeletePostClick() {
        let deletePostActionCreator = () => ({
            type: 'DELETE-LAST-POST'
        })
        store.dispatch(deletePostActionCreator());
    }

    /**
     * store.getState() - ссылаемся на State.js файл в котором в _state лежит массив postsData с данными для постов.
     * slice(0).reverse - прямо здесь создают копию существующего массива и отображают его задом наперед
     * .map - передаем все данные из этого массива для отображения на странице
     */
    let Post = store.getState().postsData.slice(0).reverse()
        .map(post => <Posts imgUrl={post.imgUrl} message={post.message} likesCount={post.likesCount}
                            UserPhoto={post.UserPhoto}/>)
    return (
        <div className='content'>
            <div className="Content1">
            </div>
            <div className="AvaDescription">
                {/*
<img src = "https://rideexpeditions.com/wp-content/uploads/2017/09/Dirtbike-upgrade-8.jpg"></img>
Это уже не нужно, так как это перенесено в profileInfo компоненту
*/}
            </div>
            <div className="UserName">
                Oleksandr(you)
            </div>
            <div className='Posts'>
                <div className='PostButtons'>
                    <AddNewPostForm />
                    {/*  <input type="button" size="Large" className='PostButton1' onClick={handleEditPostClick} меняем на Field-Redux form потому это наверное не нужно*/}
                           value="Edit post"/>
                    <button size="Large" className='PostButton2' onClick={handleDeletePostClick}>Delete</button>
                    {/* I've leave it there just as example of some alert action
    <button size="Large" className='PostButton2' onClick={ () => {alert('I will remove a post')} }>Remove</button>*/}
                </div>
            </div>
            { /**Здесь мы отрисовываем переменную Post, которая идет в State.js. - туда попадут данные которые мы считываем из текстового поля
             {Posts} -  а таким образом мы бы просто отрисовали компонент Posts - но нам это не нужно
             */}
            {Post}
        </div>
    );
}

//const AddNewPostForm = (props) => { props здесь уже нужен
function AddNewPostForm (props) {
    const maxLength10 = maxLengthCreator(10);
    return <form onSubmit={props.handleSubmit}>
        <p>Add your message and url of image here: </p>
        {/* <textarea type="text" ref={newPostElement} onChange={readTextWhenChanged}/> */}
        <Field name="newPostText" component={Textarea} placeholder={"Post message"} validate={[required, maxLength10]} />
        <br></br>
        <p>:</p>
        {/* <input type="text" ref={newPostElementAddPhoto}/>*/}
        <Field name="newPhotoForText" component={Input} placeholder={"Add your image link here"} />
        <br></br>
        {/**
         Здесь мы вызываем метод handleAddPostClick который берет данные из textarea, пишет их в переменную inputData и передает
         в State.js
         */}
        <p>What do you want to do with the last post?</p>
        {/*  <input type="button" size="Large" className='PostButton1' onClick={handleAddPostClick}
        value="Add post"/>*/}
        <button>Add post</button>

    </form>
}
AddNewPostForm = reduxForm({form:"ProfileAddNewPostForm"}) (AddNewPostForm);

export default Content;

//Поставил скобку после return и всё же каким-то чудом начало работать
// сюда нельзя добавлять import './App.css'; иначе будет ошибка