import React from "react";
import {UserType} from "../../../types/types";

type PropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    user: UserType
}

const ToggleFollow: React.FC<PropsType> = (props) => {
    return (
        <>
            {
                props.user.followed
                    ? <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                        props.unfollow(props.user.id)
                    }}>Unfollow</button>
                    : <button disabled={props.followingInProgress.some(id => id === props.user.id)} onClick={() => {
                        props.follow(props.user.id)
                    }}>Follow</button>
            }
        </>
    );
}

export default ToggleFollow;
