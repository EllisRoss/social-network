import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    setUserAvatarThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";
import {ProfileType} from "../../types/types";

type MapState = {
    profile: ProfileType;
    userStatus: string;
    authorizedUserId: number;
    isAuth: boolean;
}
type MapDispatch = {
    getUserProfile: (userId: number) => void;
    getUserStatus: (userId: number) => void;
    updateUserStatus: (status: string) => void;
    setUserAvatar: (photo: File) => void;
};
type PathParamsType = {
    userId: string;
};

type PropsType = MapState & MapDispatch & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }

        if (!userId) {
            throw new Error("Id should be exist")
        } else {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <>
                <Profile profile={this.props.profile}
                         userStatus={this.props.userStatus}
                         updateUserStatus={this.props.updateUserStatus}
                         isOwner={!this.props.match.params.userId}
                         setUserAvatar={this.props.setUserAvatar}/>
            </>
        );
    };
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        userStatus: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
};

let mapDispatchToProps: MapDispatch = {
    getUserProfile: getUserProfileThunkCreator,
    getUserStatus: getUserStatusThunkCreator,
    updateUserStatus: updateUserStatusThunkCreator,
    setUserAvatar: setUserAvatarThunkCreator,
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer);