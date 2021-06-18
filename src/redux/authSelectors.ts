import {AppStateType} from "./reduxStore";

export const selectIsAuth = (state: AppStateType): boolean => {
    return state.auth.isAuth;
}

export const selectLogin = (state: AppStateType): string | null => {
    return state.auth.login;
}

