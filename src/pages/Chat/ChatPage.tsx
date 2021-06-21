import React, {useEffect, useState} from "react";
import {cleanup} from "@testing-library/react";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log('WS CHANNEL CLOSED');
            setTimeout(createChannel, 5000);
        }

        function createChannel() {
            if (ws) {
                ws.removeEventListener('close', closeHandler);
                ws.close();
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws);
        }
        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }
    },[])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    );
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent<string>) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler);
        }
    }, [wsChannel]);

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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    const [newMessage, setNewMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready');
        };
        wsChannel?.addEventListener('open', openHandler);

        return () => {
            wsChannel?.removeEventListener('open', openHandler);
        }
    }, [wsChannel]);

    const sendMessage = () => {
        if (newMessage) {
            wsChannel?.send(newMessage);
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
                <button disabled={wsChannel === null || readyStatus !== "ready"} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;
