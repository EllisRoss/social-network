import {ApiResponseType, instance} from "./api";
import {UserType} from "../types/types";
import {ResultCodes} from "./api";

type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: null | string
}
type FollowResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>,
    data: {}
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100, term = "", friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
            + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data);
    },
    // getSpecificUser(userName: string, pageSize = 148) {
    //     return instance.get<GetUsersResponseType>(`users?term=${userName}&count=${pageSize}`)
    //         .then(response => response.data);
    // },
    getFriends(pageSize = 100) {
        return instance.get<GetUsersResponseType>(`users?friend=${true}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`).then(response => response.data);
    },

    unfollow(userId: number) {
        return instance.delete<ApiResponseType>(`follow/${userId}`).then(response => response.data);
    },
};