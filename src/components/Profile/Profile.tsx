import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import {ProfileType} from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfileProps = {
    profile: ProfileType;
    setUserAvatar: (photo: File) => void;
    userStatus: string;
    updateUserStatus: (newStatus: string) => void;
    isOwner: boolean;
}

const Profile: React.FC<ProfileProps> = (props) => {

    return (
        <>
            <ProfileInfo profile={props.profile}
                         userStatus={props.userStatus}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         setUserAvatar={props.setUserAvatar} />
            <MyPostsContainer />
        </>
    );
};

export default Profile;
