import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addPost} from './Redux/State';
import index from './index';

export let renderEntireTree = (state) => {
ReactDOM.render(
<App state={state} addPost={addPost} />, document.getElementById('root'));

{/*
<BrowserRouter>
 */}


{/*
</BrowserRouter>, document.getElementById('root'));
 */}
//место где по умолчанию запускается функция component(её вставили как тег) - то есть финал где отрисовывается все приложение.
}

