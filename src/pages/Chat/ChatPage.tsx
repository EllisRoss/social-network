import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../../api/chatAPI";
import {useDispatch, useSelector} from "react-redux";
import {
    sendMessageThunkCreator,
    startMessagesListeningThunkCreator,
    stopMessagesListeningThunkCreator
} from "../../redux/chatReducer";
import {selectMessages} from "../../redux/chatSelectors";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListeningThunkCreator())

        return () => {
            dispatch(stopMessagesListeningThunkCreator())
        }
    })

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    );
}

const Messages: React.FC = () => {

    const messages = useSelector(selectMessages);

    const messagesList = messages.map((m: ChatMessageType) => {
        let id = m.message + String(Math.random() * m.userId);
        console.log('message key', id)
        return <MessageItem key={id} message={m}/>;
    });

    return (
        <div style={{height: '600px', overflowY: 'auto'}}>
            {messagesList}
        </div>
    );
}

type MessageItemProps = {
    message: ChatMessageType
}

const MessageItem: React.FC<MessageItemProps> = (props) => {
    return (
        <div>
            <img src={props.message.photo} style={{width: '50px'}}/> <b>{props.message.userName}</b>
            <br/>
            {props.message.message}
            <hr/>
        </div>
    );
}

const AddMessageForm: React.FC = () => {

    const [newMessage, setNewMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    const dispatch = useDispatch();

    const sendMessage = () => {
        if (newMessage) {
            dispatch(sendMessageThunkCreator(newMessage))
            setNewMessage('');
        }
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setNewMessage(e.currentTarget.value)}
                          value={newMessage}></textarea>
            </div>
            <div>
                <button disabled={false} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;
