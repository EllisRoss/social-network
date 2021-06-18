import {getAuthUserDataThunkCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./reduxStore";
import {getUserProfileThunkCreator} from "./profileReducer";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

type ActionTypes = InferActionTypes<typeof AppActions>;

let initialState = {
    initialized: false
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return setInitialized(state);
        default:
            return state;
    }
}

const setInitialized = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        initialized: true,
    }
}

export const AppActions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const),
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const setInitializedThunkCreator = (): ThunkType =>
    async (dispatch) => {
        await dispatch(getAuthUserDataThunkCreator());
        dispatch(AppActions.initializedSuccess());
    }
export default appReducer;
