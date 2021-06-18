import React from 'react';
import {DialogsActions, DialogType, MessageType} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";


type MapStatePropsType = {
    dialogsPage: {
        dialogs: Array<DialogType>,
        messages: Array<MessageType>
    }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
};

type MapDispatchPropsType = {
    sendMessage: (newMessage: string) => void
}
let mapDispatchToProps: MapDispatchPropsType = {
    sendMessage: DialogsActions.sendMessage,
};

const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Dialogs);

export default DialogsContainer;