import React, {ChangeEvent} from 'react';
import styles from "../ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import defaultAvatar from "../../../../assets/images/defaultAva.png";
import {ContactsType, ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType,
    userStatus: string;
    updateUserStatus: (newStatus: string) => void;
    isOwner: boolean;
    onSelectMainPhoto: (event: ChangeEvent<HTMLInputElement>) => void
}

const ProfileData: React.FC<PropsType> = (props) => {
    let printContacts = Object.keys(props.profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]}/>
    });
    return (
        <>
            <b className={styles.userName}>{props.profile.fullName}</b>
            <ProfileStatus userStatus={props.userStatus}
                           updateUserStatus={props.updateUserStatus}
                           isOwner={props.isOwner}/>
            <br/>
            <div className={styles.descriptionBlock}>
                <div className={styles.userAvatar}>
                    {
                        props.profile.photos.large ? <img src={props.profile.photos.large} alt="user\'s avatar"/> :
                            <img src={defaultAvatar} alt="user\'s avatar"/>
                    }
                    <div>
                        {props.isOwner && <input type='file' onChange={props.onSelectMainPhoto}/>}
                    </div>
                    {/*{!props.isOwner && <ToggleFollow />}*/}
                </div>
                <div className={styles.userDescription}>

                    <div>
                        <b>About me</b>: {props.profile.aboutMe}
                    </div>
                    <br/>
                    <div>
                        <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'Yes' : 'No'}
                    </div>
                    {
                        props.profile.lookingForAJob && <div>
                            <b>My professional skills</b>: {props.profile.lookingForAJobDescription}
                        </div>
                    }
                    <br/>

                    <div>
                        <b>Contacts:</b> {printContacts}
                    </div>

                    <br/>
                </div>
            </div>
        </>
    );
}

type ContactProps = {
    contactTitle: string;
    contactValue: string;
}

const Contact: React.FC<ContactProps> = ({contactTitle, contactValue}) => {
    if (contactValue && contactValue !== "") {
        return (
            <div>
                <b className={styles.contacts}>{contactTitle}</b>: {contactValue}
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}

export default ProfileData;
