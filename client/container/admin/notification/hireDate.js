import React from "react";
import DataTable from "../dataTable/dataTable";

class HireDate extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        try {
            let {dataTable} = this.refs;
            (function () {
                $.ajax({
                    url: "http://localhost:3000/api/hiredate",
                    method: "GET",
                    dataType: "json",
                    success(data) {
                        dataTable.setState({data, loading: false})
                    },
                    error(xhr, statusCode, error) {
                        alert(error);
                    }
                })
            })();
        } catch (e) {
            console.log(e);
            alert("Get Employee Hired Date Failed");
        }
    }

    render() {
        return <DataTable ref="dataTable" title="Hired Date"
                          field={["first_name", "last_name", "phone_number", "hire_date", "rehire_date"]}/>
    }
}

export default HireDate;