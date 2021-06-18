import {ApiResponseType, ResultCodes, ResultCodesWithCaptcha} from "./api";
import {instance} from "./api";

type AuthMeResponseDataType = {
    id: number,
    email: string,
    login: string,
}
type LoginResponseDataType = {
    userId: number,
}

export const authAPI = {
    authMe() {
        return instance.get<ApiResponseType<AuthMeResponseDataType>>(`auth/me`)
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null) {
        return instance.post<ApiResponseType<LoginResponseDataType,
            ResultCodes | ResultCodesWithCaptcha>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        });
    },
    logout() {
        return instance.delete<ApiResponseType>(`auth/login`);
    },
}