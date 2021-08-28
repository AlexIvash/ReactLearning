/**
 * textFromNewPost - это сообщение которое берется из поля ввода на странице content.jsx
 * и мы передаем его сюда из страницы Content (под роутом profile)
 */
addPost(textFromNewPost, imageFromNewPost)
{
    console.log("I am addPost");

    /**
     * This variable stores photo added from user in settings. Temporary is only link of photo from
     * the internet, but it might be - it will also store the userPhoto uploaded to this site.
     *
     * It works that way - it added once, then it will be used every time user post something
     */
    let userPhoto = this.getUserPhoto();
    switch (textFromNewPost, imageFromNewPost, userPhoto) {
        case textFromNewPost === undefined || textFromNewPost === null || !textFromNewPost.length || !textFromNewPost:
            let textFromNewPost = "Due to technical issue we can't read your data from text-area now. Please try it after fixing code";
            break;
        case userPhoto === undefined || userPhoto === null || !userPhoto.length || !userPhoto:
            let userPhoto = "https://camo.githubusercontent.com/a94717d64129c017b934e8d300f735d3a2f2a34b31e52ac748e0d132127a72b3/68747470733a2f2f6a656e737365676572732e636f6d2f7374617469632f6d656469612f6167656e742e706e67";
            break;
        case imageFromNewPost === undefined || imageFromNewPost === null || !imageFromNewPost.length || !imageFromNewPost:
            let imageFromNewPost = "https://image.freepik.com/free-vector/real-state-agent-cartoon_24640-36160.jpg";
            let newPost = {
                imgUrl: imageFromNewPost,
                message: textFromNewPost,
                likesCount: '0',
                Comments: '1',
                UserPhoto: userPhoto
            };
            this._state.postsData.push(newPost);
            console.log(textFromNewPost);
            break;
        default:
            let NewPost = {
                imgUrl: imageFromNewPost,
                message: textFromNewPost,
                likesCount: '0',
                Comments: '1',
                UserPhoto: userPhoto
            };
            this._state.postsData.push(NewPost);
            console.log(textFromNewPost);
            break;
    }
}