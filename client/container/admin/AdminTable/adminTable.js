import React from "react";
import {renderRoutes} from "react-router-config";

class AdminTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return renderRoutes(this.props.route.routes)
    }
}

export default AdminTable;