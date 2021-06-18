import {InferActionTypes} from "./reduxStore";

const SET_PROFILE_ERRORS = 'social-network/settings/SET_PROFILE_ERRORS';


let initialState = {
    profileErrors: [] as Array<string>,
};

type  InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof settingsActions>;
const settingsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_PROFILE_ERRORS:
            return setProfileErrors(state, action.errors);
        default:
            return state;
    }
}


const setProfileErrors = (state: InitialStateType, errors: Array<string>): InitialStateType => {
    return {
        ...state,
        profileErrors: [...errors],
    }
}

export const settingsActions = {
    setProfileErrors: (errors: Array<string>) => ({type: SET_PROFILE_ERRORS, errors} as const),
}


export default settingsReducer;