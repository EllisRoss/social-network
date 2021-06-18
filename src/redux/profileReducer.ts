import {profileAPI, SaveProfileForm} from "../api/profileAPI";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ResultCodes} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {settingsActions} from "./settingsReducer";

const ADD_POST = 'social-network/profile/ADD_POST';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS';
const DELETE_POST = 'social-network/profile/DELETE_POST';
const SET_USER_AVATAR = 'social-network/profile/SET_USER_AVATAR';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'Lazanya', likesCount: 34},
        {id: 3, message: 'It\'s my first post', likesCount: 5},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof profileActions | typeof settingsActions>

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return addPost(state, action.newPostText);
        case SET_USER_PROFILE:
            return setUserProfile(state, action.profile);
        case SET_USER_STATUS:
            return setUserStatus(state, action.status);
        case DELETE_POST:
            return deletePost(state, action.postId);
        case SET_USER_AVATAR:
            return setUserAvatar(state, action.photos);
        default:
            return state;
    }
}

const setUserAvatar = (state: InitialStateType, photos: PhotosType): InitialStateType => {
    return {
        ...state,
        // posts: [...state.posts],
        // status: state.status,
        profile: {...state.profile, photos: photos} as ProfileType
    }
}

const deletePost = (state: InitialStateType, postId: number) => {
    return {
        ...state,
        posts: state.posts.filter(post => post.id !== postId)
    }
}

const setUserStatus = (state: InitialStateType, status: string) => {
    return {
        ...state,
        status: status,
    }
}

const setUserProfile = (state: InitialStateType, profile: ProfileType) => {
    return {
        ...state,
        profile: profile,
    }
};

const addPost = (state: InitialStateType, newPostText: string) => {
    let newPost = {
        id: 4,
        message: newPostText,
        likesCount: 0,
    };
    return {
        ...state,
        posts: [...state.posts, newPost],
    };
};


export const profileActions = {
    addPost: (newPostText: string) => ({type: ADD_POST, newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setUserStatus: (status: string) => ({type: SET_USER_STATUS, status} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    setUserAvatarSuccess: (photos: PhotosType) => ({type: SET_USER_AVATAR, photos} as const),
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUserProfileThunkCreator = (userId: number | null): ThunkType =>
    async (dispatch) => {
        let payload = await profileAPI.getUserProfile(userId)
        dispatch(profileActions.setUserProfile(payload));
    }

export const getUserStatusThunkCreator = (userId: number): ThunkType =>
    async (dispatch) => {
        let payload = await profileAPI.getUserStatus(userId);
        dispatch(profileActions.setUserStatus(payload));
    }

export const updateUserStatusThunkCreator = (status: string): ThunkType =>
    async (dispatch) => {
        let payload = await profileAPI.updateUserStatus(status);
        if (payload.resultCode === 0) {
            dispatch(profileActions.setUserStatus(status));
        }
    }

export const setUserAvatarThunkCreator = (photo: File): ThunkType =>
    async (dispatch) => {
        let payload = await profileAPI.setUserAvatar(photo);

        if (payload.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setUserAvatarSuccess(payload.data.photos));
        }
    }

export const saveProfileThunkCreator = (formData: SaveProfileForm): ThunkType =>
    async (dispatch,
           getState) => {
    debugger
        let payload = await profileAPI.saveProfile(formData);
        if (payload.resultCode === ResultCodes.Success) {
            let userId = getState().auth.userId;
            if (userId !== null) {
                await dispatch(getUserProfileThunkCreator(userId));
            } else {
                throw new Error("userId can't be null");
            }

            dispatch(settingsActions.setProfileErrors(['Saved']));
        } else {
            dispatch(settingsActions.setProfileErrors(payload.messages));
        }
    }

export default profileReducer;