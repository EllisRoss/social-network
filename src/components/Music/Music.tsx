import React from "react";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

const Music = () => {
    return (
        <div>
            Music
        </div>
    );
}

export default compose(
    WithAuthRedirect,
)(Music);