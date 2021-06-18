import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type MapPropsType = {
    isAuth: boolean,
}

export function WithAuthRedirect <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    function RedirectComponent(props: MapPropsType) {
        let { isAuth, ...restProps} = props;
        if (!props.isAuth) return (<Redirect to={'/login'}/>);
        return <WrappedComponent {...restProps as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, {}, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}
