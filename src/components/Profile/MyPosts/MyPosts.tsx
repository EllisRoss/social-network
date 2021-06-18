import React from "react";
import style from './MyPosts.module.css';
import Post from "./Post/Post";
import {AddNewPostFormValues, MyPostsReduxForm} from "./AddPostForm/AddNewPostForm";
import {PostType} from "../../../types/types";



type PropsType = {
    posts: Array<PostType>,
    addPost: (text: string) => void,
}

const MyPosts: React.FC<PropsType> = React.memo(props => {
    let postElements = props.posts.map(
        post => <Post key={post.id}
                      message={post.message}
                      likeCount={post.likesCount}/>
    );

    let addPost = (formData: AddNewPostFormValues) => {
        props.addPost(formData.newPostBody);
    };

    return (
        <div className={style.postsBlock}>
            <h3>My Posts</h3>
            <MyPostsReduxForm onSubmit={addPost}/>

            <div className={style.posts}>
                {[...postElements].reverse()}
            </div>
        </div>
    );
});

export default MyPosts;
