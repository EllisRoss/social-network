import defaultAva from './../assets/images/defaultAva.png'
import {InferActionTypes} from "./reduxStore";

const SEND_MESSAGE = 'social-network/dialogs/SEND_MESSAGE'

export type DialogType = {
    id: number,
    name: string,
    avatar: string,
}

export type MessageType = {
    id: number,
    message: string,
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima', avatar: defaultAva},
        {id: 2, name: 'Andrey', avatar: defaultAva},
        {id: 3, name: 'Ilya', avatar: defaultAva},
        {id: 4, name: 'Pavel', avatar: defaultAva},
        {id: 5, name: 'Viktor', avatar: defaultAva},
        {id: 6, name: 'Timur', avatar: defaultAva},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Ky'},
        {id: 4, message: 'Ky'},
        {id: 5, message: 'Ky'},
        {id: 6, message: 'Ky'},
    ] as Array<MessageType>,
};

type InitialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof DialogsActions>;

const dialogsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return sendMessage(state, action.newMessageBody);
        default:
            return state;
    }
};
const sendMessage = (state: InitialStateType, newMessageBody: string): InitialStateType => {
    let newMessage: MessageType = {
        id: 7,
        message: newMessageBody,

    };
    return {
        ...state,
        messages: [...state.messages, newMessage],
    };
};

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const DialogsActions = {
    sendMessage: (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const),
}

export default dialogsReducer;