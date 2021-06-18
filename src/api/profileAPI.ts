import {ApiResponseType} from "./api";
import {ContactsType, PhotosType, ProfileType} from "../types/types";
import {instance} from "./api";

type SetUserAvatarData = {
    photos: PhotosType
}

export type SaveProfileForm = {
    aboutMe: string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const profileAPI = {
    getUserProfile(userId: number | null) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(response => response.data);
    },
    updateUserStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`, {status: status})
            .then(response => response.data);
    },
    setUserAvatar(photo: File) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<ApiResponseType<SetUserAvatarData>>(`profile/photo`, formData)
            .then(response => response.data)
    },
    saveProfile(formData: SaveProfileForm) {
        return instance.put<ApiResponseType>(`profile`, formData)
            .then(response => response.data);
    },
}