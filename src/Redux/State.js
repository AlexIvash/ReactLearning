import {renderEntireTree} from '../render';
import React from "react";
import Content from './../components/Content';

/**
 Вероятно на этой странице мы могли бы добавлять эти данные в базу данных. И с этой страницы происходило бы общение
 с Back-End часть вроде node js express app.
 */

let state = {
_state: {},
    getState(){
    return this._state;
    },
    postsData: [
        {
            imgUrl: 'https://i.ytimg.com/vi/v_mBNCZ_jfA/maxresdefault.jpg',
            message: "Here is my photo of newely started building",
            likesCount: '23',
            Comments: '2',
            UserPhoto: 'https://i.pinimg.com/originals/ba/a3/ee/baa3ee75ad72a1187b8449464fe70f5a.jpg'
        },
        {
            imgUrl: 'https://gdevkievezhithorosho.com/wp-content/uploads/2014/06/ZhK-Sofija-Kievskaja-na-foto-5.jpg',
            message: "Hey there! We have finished a new house!",
            likesCount: '0',
            Comments: '2',
            UserPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS2ci7r_2qY5iozmqr0yCBNE2OwO4z9LnlTIg&usqp=CAU'
        },
        {
            imgUrl: 'https://img.lun.ua/panorama/1461-1.jpg',
            message: "Such big living complex! Do you like it?",
            likesCount: '0',
            Comments: '1',
            UserPhoto: 'https://images.squarespace-cdn.com/content/v1/5b311c548f5130ce864668ad/1530117194751-BO19EZ1SDCFD5KSJRIA3/ke17ZwdGBToddI8pDm48kDFo1slIxJPvM5Urjvd1DloUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8GRo6ASst2s6pLvNAu_PZdJQr8gHdfuVEBZ6fGgEWibFLt9utBi6NVeqXAKikhaWpvHMFZDt2iry-WhuVPCUgQY/dream-realty-real-estate-agent-realtor-broker-owner-katie-o%27keefe-milwaukee-wisconsin'
        },
        {
            imgUrl: 'https://i.obozrevatel.com/nerukhomi/stroitelstvo/2020/1/28/12186.webp?size=768x432',
            message: "Winter outside. School is almost done!",
            likesCount: '14',
            Comments: '50',
            UserPhoto: 'https://img1.freepng.ru/20180804/ejc/kisspng-estate-agent-realty-world-elfi-gayrimenkul-real-es-5b6573badd2220.8651037515333754189058.jpg'
        }
    ],

    messagesData: [
        {
            name: "Friend of mine",
            message: "Just notify you about make an installment payment this month. I hope you're doing OK?",
            img: "data:image/jpeg;base64,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"
        },
        {
            name: "Auto-reminder app",
            message: "Hey, there is 3 month left to close your mortgage?",
            img: "https://www.webberinsurance.com.au/wp-content/uploads/2018/07/Real-Estate-Insurance-Australia.jpg"
        }
    ]
}

{/**export let addPost = (postMessage) => {
возможно сюда должен прилетать через props данные метода addPost? из content.jsx
 Они по идее прилетают через props
*/}

export let addPost = (props) => {
    {/**


     https://www.youtube.com/watch?v=Bq_tmt-hRn0&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8&index=38
     нужно связать эту кнопку с методом добавления данных
     данные будут добавляться в state.js
     message: this.Content.postMessage,
     message: this._state.Content.Post.postMessage,
     message: this._state.postMessage,
     message: this.postMessage,
     message: props.addPost(),

     This was almost correct but not(at least didn't trigger an error:
     message: postMessage,
     */}
let newPost = {
imgUrl: 'https://i.ytimg.com/vi/v_mBNCZ_jfA/maxresdefault.jpg',
id: 5,
message: props.addPost(),
likesCount: 0
};
    {/*
    state.postsData.push(newPost);
    Content.postsData.push(newPost);
    */}
    /**
     * Здесь сообщение которое мы получили - мы отправляем в наш список postsData. А postsData вероятно
     * передаем в render.js(где они и отрисовываются)
     */
    this._state.postsData.push(newPost);
renderEntireTree(state);
}



export default state;