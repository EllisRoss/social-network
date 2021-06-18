import profileReducer from "../profileReducer";
import {profileActions} from "../profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12, dislikesCount: 2},
        {id: 2, message: 'Lazanya', likesCount: 34, dislikesCount: 0},
        {id: 3, message: 'It\'s my first post', likesCount: 5, dislikesCount: 0},
    ],
    profile: null,
    status: "",
};

it('length of posts should be incremented', () => {
    let action = profileActions.addPost('my new post');
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
});

it('message of new post should be correct', () => {
    let action = profileActions.addPost('my new post');
    let newState = profileReducer(state, action);

    expect(newState.posts[3].message).toBe('my new post');
});

it('after deleting length of messages should be decrement', () => {
    let action = profileActions.deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2);
});

it('after deleting length of messages should be decrement if ID is incorrect', () => {
    let action = profileActions.deletePost(100);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
});
