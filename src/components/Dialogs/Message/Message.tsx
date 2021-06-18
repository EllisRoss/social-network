import React from 'react';
import styles from './Message.module.css';

type MessageProps = {
    message: string
}

const Message: React.FC<MessageProps> = (props) => {
    return (
        <div>
            <div className={styles.message}>
                {props.message}
            </div>
        </div>
    );
}

export default Message;