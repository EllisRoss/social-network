import {authAPI} from "../api/authAPI";
import {stopSubmit} from "redux-form";
import {ResultCodes, ResultCodesWithCaptcha} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {securityAPI} from "../api/securityAPI";
import {getUserProfileThunkCreator} from "./profileReducer";

const SET_AUTH_USER_DATA = 'social-network/auth/SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'social-network/auth/SET_CAPTCHA_URL';

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};
type ActionTypes = InferActionTypes<typeof AuthActions>;

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return setAuthUserData(state, action.payload);
        case SET_CAPTCHA_URL:
            return setCaptchaUrl(state, action.url);
        default:
            return state;
    }
}

//////////////////////////////////////////////////
type SetAuthUserDataActionPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

const setAuthUserData = (state: InitialStateType, payload: SetAuthUserDataActionPayloadType): InitialStateType => {
    return {
        ...state,
        ...payload,
    };
};
const setCaptchaUrl = (state: InitialStateType, url: string): InitialStateType => {
    return {
        ...state,
        captchaUrl: url,
    };
};
//////////////////////////////////////////////////


export const AuthActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_AUTH_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const),
    setCaptchaUrl: (url: string) => ({type: SET_CAPTCHA_URL, url} as const),
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | ReturnType<typeof stopSubmit>>;

export const getAuthUserDataThunkCreator = (): ThunkType => async (dispatch) => {
    const payload = await authAPI.authMe();
    if (payload.resultCode === ResultCodes.Success) {
        let {id, email, login} = payload.data;
        dispatch(AuthActions.setAuthUserData(id, email, login, true));
        await dispatch(getUserProfileThunkCreator(id));
    }
}

export const loginThunkCreator = (email: string, password: string,
                                  rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === ResultCodes.Success) {
            await dispatch(getAuthUserDataThunkCreator());
        } else {
            if (response.data.resultCode === ResultCodesWithCaptcha.CaptchaIsRequired) {
                await dispatch(getCaptchaURLThunkCreator())
            }
            let message = response.data.messages.length > 0
                ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }

export const getCaptchaURLThunkCreator = (): ThunkType =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaURL();
        const captchaUrl = response.data.url;
        dispatch(AuthActions.setCaptchaUrl(captchaUrl));
    }

export const logoutThunkCreator = (): ThunkType =>
    async (dispatch) => {
        const response = await authAPI.logout();
        if (response.data.resultCode === ResultCodes.Success) {
            dispatch(AuthActions.setAuthUserData(null, null, null, false));
        }
    }

export default authReducer;
