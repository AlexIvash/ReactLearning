import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./Redux/State";

/**
 не смотря на что мы можем вызывать объект store глобально - его все равно обязательно импортировать
 */


export let renderEntireTree = (state) => {
    ReactDOM.render(
        <App state={store.getState} addPost={store.dispatch.bind(store)}/>, document.getElementById('root'));

    /*
       bind addPost указывает именно на метод addPost в файле State.js
       <App state={store._state} addPost={store.addPost.bind(store)} />, document.getElementById('root'));
       addPost в данный момент - не callback - потому что мы его не вызываем из этой функции - а просто вызываем его там где он лежит
       я не знаю как это расшифровать. Вызыван он будет там, где у этого метода есть скобки.
       <App state={state} addPost={addPost} />, document.getElementById('root'));
       */
}
renderEntireTree(store.getState);
/*
<BrowserRouter>
 */


/*
</BrowserRouter>, document.getElementById('root'));
 */
//место где по умолчанию запускается функция component(её вставили как тег) - то есть финал где отрисовывается все приложение.

//store.subscribe(renderEntireTree); - этот метод нужно добавить в state.js и я пока не сделал этого


