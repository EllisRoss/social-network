import React from "react";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

const News = () => {
    return (
        <div>
            News
        </div>
    );
}

export default compose(
    WithAuthRedirect,
)(News);
