import {AppStateType, InferActionTypes} from "./reduxStore";
import {chatAPI, ChatMessageType} from "../api/chatAPI";
import { ThunkAction } from "redux-thunk";
import {Dispatch} from "redux";

const MESSAGES_RECEIVED = 'social-network/chat/MESSAGES_RECEIVED';

let initialState = {
    messages: [] as ChatMessageType[],
};

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return messagesReceived(state, action.newMessages);
        default:
            return state;
    }
}

const messagesReceived = (state: InitialStateType, newMessages: ChatMessageType[]): InitialStateType => {
    return {
        ...state,
        messages: [...state.messages, ...newMessages],
    };
};

export const chatActions = {
    messagesReceived: (newMessages: ChatMessageType[]) => ({type: MESSAGES_RECEIVED, newMessages} as const),
}

let _newMessageHandler: ( (messages: ChatMessageType[]) => void ) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(chatActions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
}

export const startMessagesListeningThunkCreator = (): ThunkType =>
    async (dispatch) => {
        chatAPI.start();
        chatAPI.subscribe(newMessageHandlerCreator(dispatch));
    }

export const stopMessagesListeningThunkCreator = (): ThunkType =>
    async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
        chatAPI.stop();
    }

export const sendMessageThunkCreator = (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message);
    }

export default chatReducer;

type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof chatActions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
