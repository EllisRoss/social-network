import React from 'react';
import styles from './Dialog.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";
import {DialogType, MessageType} from "../../redux/dialogsReducer";

const maxLength100 = maxLengthCreator(100);

// type NewMessageFormValuesKeysType = Extract<keyof formDataType, string>;

type AddMessageFormOwnPropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValues, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageBody'}
                       component={TextArea}
                       placeholder={'Enter your message'}
                validate={[requiredField, maxLength100]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

const AddMessageReduxForm = reduxForm<NewMessageFormValues, AddMessageFormOwnPropsType>({form: 'dialogAddMessageForm'})(AddMessageForm)

type PropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>,
    }
    sendMessage: (messageText: string) => void
}
type NewMessageFormValues = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    // return array of dialogs
    let dialogsElements = props.dialogsPage.dialogs.map(
        dialog => <DialogItem avatar={dialog.avatar}
                              name={dialog.name}
                              id={dialog.id}
                              key={dialog.id}
        />
    );
    // return array of messages
    let messagesElements = props.dialogsPage.messages.map(
        message => <Message message={message.message}
                            key={message.id}
        />
    );
    let sendMessage = (formData: NewMessageFormValues) => {
        // console.log(formData);
        props.sendMessage(formData.newMessageBody);
    }
    return (
        <div className={styles.dialogs_wrapper}>
            <div className={styles.dialog_item}>
                {dialogsElements}
            </div>

            <div className={styles.message_history}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={sendMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;