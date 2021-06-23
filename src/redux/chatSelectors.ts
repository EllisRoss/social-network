import {AppStateType} from "./reduxStore";
import {ChatMessageType} from "../api/chatAPI";

export const selectMessages = (state: AppStateType): ChatMessageType[] => {
    return state.chat.messages;
}

