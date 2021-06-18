import React, {useState, useEffect} from "react";
import {getUserProfileThunkCreator, saveProfileThunkCreator} from "../../redux/profileReducer";
import {connect} from "react-redux";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "../../types/types";
import { SaveProfileForm } from "../../api/profileAPI";
import {AppStateType} from "../../redux/reduxStore";
import preloader300px from "../../assets/images/preloader300px.svg"

const GENERAL_SETTINGS = 'GENERAL_SETTINGS';
const PROFILE_SETTINGS = 'PROFILE_SETTINGS';

type MapStateProps = {
    profile: ProfileType | null;
    authorizedUserId: number | null;
    profileErrors: Array<string>;
}

type MapDispatchProps = {
    saveProfile: (formData: SaveProfileForm) => void;
    getUserProfile: (userId: number) => void;
}

type Props = {
    settingMode: 'GENERAL_SETTINGS' | 'PROFILE_SETTINGS';
}

const Settings: React.FC<MapStateProps & MapDispatchProps & Props> = (props) => {

    // useEffect(() => {
    //     if (props.profile.userId !== props.authorizedUserId) {
    //         props.getUserProfile(props.authorizedUserId);
    //     }
    // }, []);
    //
    // let userId = props.profile.userId;
    // if (userId !== props.authorizedUserId) {
    //     userId = null;
    // }

    // useEffect(() => {
    //     if (props.authorizedUserId) {
    //         if (props.profile?.userId !== props.authorizedUserId) {
    //             props.getUserProfile(props.authorizedUserId);
    //         }
    //     }
    // }, [props.profile]);

    let [settingsMode, setSettingsMode] = useState(props.settingMode);

    let toggleSettings = (mode: string) => {
        switch (mode) {
            case GENERAL_SETTINGS:
                setSettingsMode(GENERAL_SETTINGS)
                break;
            case PROFILE_SETTINGS:
                setSettingsMode(PROFILE_SETTINGS)
                break;
            default:
                setSettingsMode(GENERAL_SETTINGS)
                break;
        }
    }

    let showSettings = () => {
        switch (settingsMode) {
            case GENERAL_SETTINGS:
                return <h3>General Settings</h3>
            case PROFILE_SETTINGS:
                return <ProfileSettings profile={props.profile}
                                        profileErrors={props.profileErrors}
                                        saveProfile={props.saveProfile}/>
            default:
                return <h3>General Settings</h3>
        }
    }


    return (
        <div>
            <h2>Settings</h2>
            <button onClick={() => toggleSettings(GENERAL_SETTINGS)}>General</button>
            <label> </label>
            <button onClick={() => toggleSettings(PROFILE_SETTINGS)}>Profile</button>

            { props.profile ? showSettings() : <Preloader src={'preloader300px'}/> }
        </div>
    );
}

let mapStateToProps = (state: AppStateType): MapStateProps => {
    return {
        profile: state.profilePage.profile,
        authorizedUserId: state.auth.userId,
        profileErrors: state.settings.profileErrors,
    }
}
let mapDispatchToProps: MapDispatchProps = {
    saveProfile: saveProfileThunkCreator,
    getUserProfile: getUserProfileThunkCreator,
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect,
)(Settings);
