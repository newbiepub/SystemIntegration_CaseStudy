import React from "react";
import DataTable from "../dataTable/dataTable";

class BirthDay extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            let {dataTable} = this.refs;
            (function () {
                $.ajax({
                    url: "http://localhost:3000/api/employee/birthday",
                    method: "GET",
                    dataType: "json",
                    success(data) {
                        console.log(data);
                        dataTable.setState({data, loading: false});
                    },
                    error(xhr, statusCode, error) {
                        alert(error);
                    }
                })
            })()
        } catch (e) {
            console.log(e);
            alert("Cannot get employee");
        }
    }

    render() {
        return <DataTable ref='dataTable' title="Employee Birthday"
                          field={["first_name", "last_name", "SSN", "gender", "birthday"]}
        />
    }
}

export default BirthDay;