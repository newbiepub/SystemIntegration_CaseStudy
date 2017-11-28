import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

class Redirector extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <Redirect to={"/404"}/>
    }
}

Redirector.propTypes = {
    to: PropTypes.string
};

Redirector.defaultProps = {
    to: "/404"
};

export default Redirector;