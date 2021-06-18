import React from 'react';
import ProfileSettingsForm from "./ProfileSettingsForm";
import {ProfileType} from "../../../types/types";
import {SaveProfileForm} from "../../../api/profileAPI";

type ProfileSettingsProps = {
    profile: ProfileType | null;
    profileErrors: Array<string>;
    saveProfile: (formData: SaveProfileForm) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = (props) => {

    return (
        <div>
            <h3>Profile Settings</h3>
            <ProfileSettingsForm profile={props.profile}
                                 saveProfile={props.saveProfile}
                                 profileErrors={props.profileErrors}/>
        </div>
    );
}


export default ProfileSettings;
