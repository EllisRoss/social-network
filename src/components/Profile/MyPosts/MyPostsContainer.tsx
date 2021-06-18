import React from "react";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {profileActions} from "../../../redux/profileReducer";
import {AppStateType} from "../../../redux/reduxStore";
import {PostType} from "../../../types/types";

type MapStatePropsType = {
    posts: Array<PostType>,
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts
    };
}; // Название менять нельзя

let mapDispatchToProps: MapDispatchPropsType = {
    addPost: profileActions.addPost,
}; // Название менять нельзя

const MyPostsContainer = connect(mapStateToProps,
    mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
