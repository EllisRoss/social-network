import React, {useEffect, useState} from "react";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: React.FC = () => {
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    );
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, []);

    const messagesList = messages.map((m: ChatMessageType) => {
        let id = m.message + String(Math.random() * m.userId);
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

    useEffect(() => {
        wsChannel.addEventListener('open', () => {
            setReadyStatus('ready');
        })
    }, []);

    const sendMessage = () => {
        if (newMessage) {
            wsChannel.send(newMessage);
            setNewMessage('');
        }
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setNewMessage(e.currentTarget.value)} value={newMessage}></textarea>
            </div>
            <div>
                <button disabled={readyStatus !== "ready"} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;
