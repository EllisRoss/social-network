import React, {useEffect, useState} from 'react';
import FriendList from "./FriendList";
import {connect} from "react-redux";
import {getFriendsThunkCreator} from "../../../redux/usersReducer";
import {getFriends} from "../../../redux/usersSelectors";
import {AppStateType} from "../../../redux/reduxStore";
import {UserType} from "../../../types/types";

type MapStatePropsType = {
    friends: Array<UserType>
}
type MapDispatchPropsType = {
    getFriends: (pageSize?: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const FriendListContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getFriends();
    }, [])

    return (
        <FriendList friends={props.friends}/>
    );

}




let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        friends: getFriends(state),
    }
}

let mapDispatchToProps: MapDispatchPropsType = {
    getFriends: getFriendsThunkCreator,
};


export default connect(mapStateToProps, mapDispatchToProps)(FriendListContainer);
