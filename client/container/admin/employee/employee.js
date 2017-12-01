import React from "react";
import {renderRoutes} from "react-router-config";

class Employee extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return renderRoutes(this.props.route.routes);
    }
}

export default Employee;