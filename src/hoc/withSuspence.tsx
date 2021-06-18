import React from "react";
import Preloader from "../components/common/Preloader/Preloader";
import preloader300px from "../assets/images/preloader300px.svg";

export function withSuspense <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return (
            <React.Suspense fallback={<Preloader src={preloader300px}/>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        );
    }
}
