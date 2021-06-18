import React, {ChangeEvent, useEffect, useState} from "react";

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
            console.log('CLOSE WS');
            setTimeout(createChannel, 3000);
        };
        function createChannel() {
            if (ws !== null) {
                ws.removeEventListener('close', closeHandler)
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws?.addEventListener('close', closeHandler);
            setWsChannel(ws);
        }
        createChannel();

        return () => {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();
        }
    }, []);

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    );
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = (props) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        props.wsChannel?.addEventListener('message', (e) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        })
    }, [props.wsChannel]);

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = (props) => {

    const [newMessage, setNewMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        props.wsChannel?.addEventListener('open', () => {
            setReadyStatus('ready');
        })
    }, [props.wsChannel]);

    const sendMessage = () => {
        if (!newMessage) return
        props.wsChannel?.send(newMessage);
        setNewMessage('');
    }

    const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(event.target.value)
    }

    return (
        <div>
            <div>
                <textarea onChange={textAreaOnChange} value={newMessage}></textarea>
            </div>
            <div>
                <button disabled={props.wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatPage;
