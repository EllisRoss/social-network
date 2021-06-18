import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    userStatus: string
    isOwner: boolean
    updateUserStatus: (newStatus: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [userStatus, setUserStatus] = useState(props.userStatus);

    useEffect(() => {
        setUserStatus(props.userStatus);
    }, [props.userStatus]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        if (props.userStatus !== userStatus) {
            console.log('update status');
            props.updateUserStatus(userStatus)
        } else {
            console.log('not update status');
        }
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        let text = event.currentTarget.value;
        setUserStatus(text);
    }
    return (
        <>
            {
                !props.isOwner && <div>{props.userStatus}</div>
            }
            {
                props.isOwner &&
                <>
                    {
                        !editMode
                            ? <div>
                                <span
                                    onDoubleClick={activateEditMode}>{props.userStatus || 'Click to update your status'}</span>
                            </div>
                            : <div>
                                <input value={userStatus}
                                       onChange={onStatusChange}
                                       onBlur={deactivateEditMode}
                                       autoFocus={true}/>
                            </div>
                    }
                </>
            }
        </>
    );
}
;

export default ProfileStatus;