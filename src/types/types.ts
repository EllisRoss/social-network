export type PostType = {
    id: number,
    message: string,
    likesCount: number,
}
export type ContactsType = {
    facebook: string,
    vk: string,
    github: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string,
}
export type PhotosType = {
    large: string | null,
    small: string | null,
}
export type ProfileType = {
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType;
    photos: PhotosType;
    aboutMe: string;
}
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean,
}