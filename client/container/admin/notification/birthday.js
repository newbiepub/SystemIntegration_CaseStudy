import React from "react";
import DataTable from "../dataTable/dataTable";

class BirthDay extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        (function () {
            $.ajax({

            })
        })()
    }

    render() {
        return <DataTable ref='dataTable' title="Employee Birthday"/>
    }
}

export default BirthDay;