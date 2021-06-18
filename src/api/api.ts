import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a3d6acb3-8449-4702-b788-2742107bd9c5",
    }
});

// https://social-network.samuraijs.com/api/1.0/users?term=Dan

// enums
export enum ResultCodes {
    Success = 0,
    Error = 1,
}
export enum ResultCodesWithCaptcha {
    CaptchaIsRequired = 10,
}

export type ApiResponseType<D = {}, RC = ResultCodes> = {
    data: D,
    messages: Array<string>,
    resultCode: RC,
}

