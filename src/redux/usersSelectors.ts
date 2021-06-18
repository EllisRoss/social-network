import {AppStateType} from "./reduxStore";
import {UserType} from "../types/types";
import {FilterType} from "./usersReducer";

export const getUsers = (state: AppStateType): Array<UserType> => {
    return state.usersPage.users;
}
export const getFilter = (state: AppStateType): FilterType => {
    return state.usersPage.filter;
}

export const getFriends = (state: AppStateType): Array<UserType> => {
    return state.usersPage.friends;
}

export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType): Array<number> => {
    return state.usersPage.followingInProgress;
}