import {AppStateType} from "./reduxStore";
import {ProfileType} from "../types/types";


export const selectProfile = (state: AppStateType): ProfileType | null => {
    return state.profilePage.profile;
}
