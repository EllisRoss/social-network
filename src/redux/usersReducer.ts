import {usersAPI} from "../api/usersAPI";
import {updateObjectInArray} from "../utils/objectHelpers";
import {UserType} from "./../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {ApiResponseType} from "../api/api";

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET_USERS';
const SET_FRIENDS = 'social-network/users/SET_FRIENDS';
const SET_FILTER = 'social-network/users/SET_FILTER';
const SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    friends: [] as Array<UserType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of users id
    filter: {
        term: '',
        friend: null as null | boolean,
    }
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const usersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return follow(state, action.userId);
        case UNFOLLOW:
            return unfollow(state, action.userId);
        case SET_USERS:
            return setUsers(state, action.users)
        case SET_FRIENDS:
            return setFriends(state, action.friends)
        case SET_FILTER:
            return setFilter(state, action.payload)
        case SET_CURRENT_PAGE:
            return setCurrentPage(state, action.pageNumber);
        case SET_TOTAL_USERS_COUNT:
            return setTotalUsersCount(state, action.usersCount);
        case TOGGLE_IS_FETCHING:
            return toggleIsFetching(state, action.fetchingVal);
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return toggleIsFollowingProgress(state, action.progressVal,
                action.userId);
        default:
            return state;
    }
}
const toggleIsFollowingProgress = (state: InitialStateType, progressVal: boolean, userId: number) => {
    return {
        ...state,
        followingInProgress: progressVal
            ? [...state.followingInProgress, userId]
            : state.followingInProgress.filter(id => id !== userId),
    }
};
const toggleIsFetching = (state: InitialStateType, fetchingVal: boolean) => {
    return {
        ...state,
        isFetching: fetchingVal,
    }
};
const setTotalUsersCount = (state: InitialStateType, usersCount: number) => {
    return {
        ...state,
        totalUsersCount: usersCount,
    }
}
const setCurrentPage = (state: InitialStateType, pageNumber: number) => {
    return {
        ...state,
        currentPage: pageNumber,
    };
};
const setFilter = (state: InitialStateType, payload: FilterType) => {
    return {
        ...state,
        filter: payload,
    };
};
const follow = (state: InitialStateType, userId: number) => {
    return {
        ...state,
        users: updateObjectInArray(state.users, userId, "id", {followed: true})
    };
};
const unfollow = (state: InitialStateType, userId: number) => {
    return {
        ...state,
        users: updateObjectInArray(state.users, userId, "id", {followed: false})
    };
};
const setUsers = (state: InitialStateType, users: Array<UserType>) => {
    return {
        ...state,
        users: [...users],
    };
};
const setFriends = (state: InitialStateType, friends: Array<UserType>) => {
    console.log('setFriends action')
    return {
        ...state,
        friends: [...friends],
    };
};

export const usersActions = {
    // Follow action creator
    follow: (userId: number) => ({type: FOLLOW, userId} as const),
    // Unfollow action creator
    unfollow: (userId: number) => ({type: UNFOLLOW, userId} as const),
    // SetUsers action creator
    setUsers: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    // SetFriends action creator
    setFriends: (friends: Array<UserType>) => ({type: SET_FRIENDS, friends} as const),
    // SetCurrentPage action creator
    setCurrentPage: (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const),
    // SetTotalUsersCount action creator
    setTotalUsersCount: (usersCount: number) => ({type: SET_TOTAL_USERS_COUNT, usersCount} as const),
    // Set search filter action creator
    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),
    // toggleIsFetching action creator
    toggleIsFetching: (fetchingVal: boolean) => ({type: TOGGLE_IS_FETCHING, fetchingVal} as const),
    // ToggleIsFollowingProgress action creator
    toggleIsFollowingProgress: (progressVal: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        progressVal,
        userId
    } as const),
}

type ActionTypes = InferActionTypes<typeof usersActions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(usersActions.toggleIsFetching(true));
        dispatch(usersActions.setCurrentPage(currentPage));
        dispatch(usersActions.setFilter(filter));

        let payload = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(usersActions.setUsers(payload.items));
        dispatch(usersActions.setTotalUsersCount(payload.totalCount));
        dispatch(usersActions.toggleIsFetching(false));
    };

export const getFriendsThunkCreator = (pageSize?: number): ThunkType =>
    async (dispatch) => {
        //dispatch(usersActions.toggleIsFetching(true));
        let payload = await usersAPI.getFriends(pageSize);
        dispatch(usersActions.setFriends(payload.items));
        //dispatch(usersActions.toggleIsFetching(false));
    };

type followUnfollowFlowACType = (userId: number) => ActionTypes;
const _followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>,
                                   apiMethod: (userId: number) => Promise<ApiResponseType>, actionCreator: followUnfollowFlowACType,
                                   userID: number) => {
    dispatch(usersActions.toggleIsFollowingProgress(true, userID));
    let response = await apiMethod(userID);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(usersActions.toggleIsFollowingProgress(false, userID));
}

export const unfollowThunkCreator = (userID: number): ThunkType =>
    async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = usersActions.unfollow;
        await _followUnfollowFlow(dispatch, apiMethod, actionCreator, userID);
        await dispatch(getFriendsThunkCreator());
    }

export const followThunkCreator = (userID: number): ThunkType =>
    async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = usersActions.follow;
        await _followUnfollowFlow(dispatch, apiMethod, actionCreator, userID);
        await dispatch(getFriendsThunkCreator());
    }

export default usersReducer;
