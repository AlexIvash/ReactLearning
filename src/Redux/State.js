import {renderEntireTree} from '../render';
let state = {

    postsData: [
        {
            imgUrl: 'https://i.ytimg.com/vi/v_mBNCZ_jfA/maxresdefault.jpg',
            message: "post1",
            likesCount: '23',
            Comments: '2',
            UserPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDeRbFzPLvfhzTtLgDt3yTyFltdNPoXJ3k7uXd11wPb0SaYxAs'
        },
        {
            imgUrl: 'https://gdevkievezhithorosho.com/wp-content/uploads/2014/06/ZhK-Sofija-Kievskaja-na-foto-5.jpg',
            message: "post2",
            likesCount: '0',
            Comments: '2',
            UserPhoto: 'https://pmcwwd.files.wordpress.com/2019/07/cats-trailer-memes-social-media-reactions-taylor-swift.png?crop=775px%2C17px%2C1397px%2C932px&resize=640%2C415'
        },
        {
            imgUrl: 'https://img.lun.ua/panorama/1461-1.jpg',
            message: "post3",
            likesCount: '0',
            Comments: '1',
            UserPhoto: 'https://cdn.vox-cdn.com/thumbor/62WiG8UgRnHgDy-1puCZa13emro=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/assets/4012869/grumpy-cat-TF2014-stock2_2040.jpg'
        },
        {
            imgUrl: 'https://i.obozrevatel.com/nerukhomi/stroitelstvo/2020/1/28/12186.webp?size=768x432',
            message: "post4",
            likesCount: '14',
            Comments: '50',
            UserPhoto: 'https://cnet4.cbsistatic.com/img/kVMsD2ypIGomz19en7fdvvs1tpY=/940x0/2019/05/17/b520bc74-57be-4c72-99bf-4fa675a326cc/gettyimages-611696914.jpg'
        }
    ],

    messagesData: [
        {name: "Andrey", message: "Hi", img: "https://i.kym-cdn.com/entries/icons/original/000/003/617/OkayGuy.jpg"},
        {
            name: "Sveta",
            message: "How is your skills?",
            img: "https://img.wikinut.com/img/y2gqebp7zym26n9k/jpeg/0/The-face-of-hate.jpeg"
        },
        {
            name: "Sergey",
            message: "What've happened with the server?",
            img: "https://66.media.tumblr.com/5c49a17f6b8a0bf62d110f1b4ad0d129/tumblr_inline_ptjuxgORrj1wv2c9y_540.jpg"
        }
    ]
}

export let addPost = (postMessage) => {

let newPost = {
id: 5,
message: postMessage,
likesCount: 0
};
state.postsData.push(newPost);
renderEntireTree(state);
}



export default state;